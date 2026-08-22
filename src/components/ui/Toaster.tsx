"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { AlertTriangle, Check, Info, X } from "lucide-react";
import { assinar, lista, toast, type TipoToast } from "@/lib/toast";
import styles from "./toaster.module.css";

const ICONE: Record<TipoToast, typeof Check> = {
  sucesso: Check,
  erro: X,
  aviso: AlertTriangle,
  info: Info,
};

const VAZIA: never[] = [];

/**
 * Estado fixo enquanto o navegador estiver sem rede — senão o autor só vê
 * "fetch failed" ao tentar publicar, sem saber que a culpa é da conexão.
 */
function useOffline() {
  const id = useRef<number | null>(null);
  useEffect(() => {
    const caiu = () => {
      id.current ??= toast.estado("Você está sem conexão", {
        rotulo: "rede",
        desc: "O que você escreveu continua aqui; salve quando a rede voltar.",
      });
    };
    const voltou = () => {
      if (id.current === null) return;
      toast.fechar(id.current);
      id.current = null;
    };
    if (!navigator.onLine) caiu();
    addEventListener("offline", caiu);
    addEventListener("online", voltou);
    return () => {
      removeEventListener("offline", caiu);
      removeEventListener("online", voltou);
    };
  }, []);
}

/** Pilha de toasts, montada uma vez no layout raiz. Ver ui-reference/Toasts.dc.html. */
export function Toaster() {
  // ponytail: no servidor a fila é sempre vazia — snapshot estável evita loop de hidratação
  const itens = useSyncExternalStore(assinar, lista, () => VAZIA);
  useOffline();

  return (
    <div className={styles.pilha} aria-live="polite">
      {itens.map((t) => {
        const Icone = ICONE[t.tipo];
        return (
          <div
            key={t.id}
            className={`${styles.item} ${t.saindo ? styles.saindo : ""}`}
            data-tipo={t.tipo}
            // o relógio para enquanto o mouse (ou o foco do teclado) está no toast
            onMouseEnter={() => toast.pausar(t.id)}
            onMouseLeave={() => toast.retomar(t.id)}
            onFocus={() => toast.pausar(t.id)}
            onBlur={() => toast.retomar(t.id)}
          >
            <Icone size={15} className={styles.marcador} aria-hidden />
            <div className={styles.corpo}>
              <p className={styles.rotulo}>
                {t.rotulo ?? toast.rotuloPadrao(t.tipo)}
              </p>
              <p className={styles.titulo}>{t.titulo}</p>
              {t.desc.map((linha, i) => (
                <p key={i} className={styles.desc}>
                  {linha}
                </p>
              ))}
              {t.acao && (
                <button
                  type="button"
                  className={styles.acao}
                  onClick={() => {
                    t.aoAgir?.();
                    toast.fechar(t.id);
                  }}
                >
                  {t.acao}
                </button>
              )}
            </div>
            <button
              type="button"
              aria-label="fechar"
              className={styles.fechar}
              onClick={() => toast.fechar(t.id)}
            >
              <X size={13} aria-hidden />
            </button>
            <div
              className={t.ms ? styles.barra : styles.pulso}
              style={t.ms ? { animationDuration: `${t.ms}ms` } : undefined}
            />
          </div>
        );
      })}
    </div>
  );
}

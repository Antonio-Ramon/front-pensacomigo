"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./layout.module.css";

/**
 * Gaveta do celular: o botão fica no header (só abaixo de 760px, via CSS) e o painel
 * ocupa a tela inteira. O conteúdo vem de quem monta o header — links do blog no
 * público, ações do autor na escrivaninha — porque só essa camada sabe o que cabe ali.
 *
 * O painel vai para o body num portal: o `backdrop-filter` do header cria bloco de
 * contenção, e dentro dele um `position: fixed; inset: 0` ficaria do tamanho da barra.
 */
export function MenuMobile({ children }: { children: React.ReactNode }) {
  const [aberto, setAberto] = useState(false);
  const rota = usePathname();

  // navegou: a gaveta fecha sozinha (o clique no link não desmonta o componente)
  useEffect(() => setAberto(false), [rota]);

  useEffect(() => {
    if (!aberto) return;
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // o fundo não rola atrás do painel
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAberto(false);
    };
    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.body.style.overflow = antes;
      document.removeEventListener("keydown", aoTeclar);
    };
  }, [aberto]);

  return (
    <>
      <button
        type="button"
        className={styles.botaoMenu}
        aria-label="Abrir menu"
        aria-expanded={aberto}
        onClick={() => setAberto(true)}
      >
        <Menu size={20} strokeWidth={1.75} aria-hidden />
      </button>

      {aberto &&
        createPortal(
          <div className={styles.gaveta} role="dialog" aria-modal="true" aria-label="Menu">
            <div className={styles.gavetaTopo}>
              <span className={styles.wordmark}>
                Pensa<span>·</span>Comigo
              </span>
              <button
                type="button"
                className={styles.botaoMenu}
                aria-label="Fechar menu"
                onClick={() => setAberto(false)}
                autoFocus
              >
                <X size={20} strokeWidth={1.75} aria-hidden />
              </button>
            </div>
            {/* qualquer clique dentro fecha: vale para link, botão de sair e o que vier depois */}
            <nav className={styles.gavetaNav} onClick={() => setAberto(false)}>
              {children}
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}

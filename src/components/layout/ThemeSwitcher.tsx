"use client";

import { useEffect, useState } from "react";
import { Leaf, Moon, Sun } from "lucide-react";
import { TEMAS, type Tema, aplicarTema, temaAtual } from "@/lib/tema";
import styles from "./layout.module.css";

/**
 * papel / tinta / terra. Ícone no lugar do rótulo: três palavras em mono não cabem
 * ao lado da navegação no celular (quebravam a linha do header) — o nome fica no
 * title/aria-label, que é o que o leitor de tela e o toque longo mostram.
 */
const ICONE = { papel: Sun, tinta: Moon, terra: Leaf } as const;

export function ThemeSwitcher() {
  // começa null no servidor e no cliente; após montar lê o tema já aplicado pelo script inline
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema(temaAtual());
  }, []);

  function trocar(t: Tema) {
    setTema(t);
    aplicarTema(t);
  }

  return (
    <div role="group" aria-label="Tema visual" className={styles.temaGrupo}>
      {TEMAS.map((t) => {
        const Icone = ICONE[t];
        return (
          <button
            key={t}
            type="button"
            title={`tema ${t}`}
            aria-label={`tema ${t}`}
            aria-pressed={t === tema}
            onClick={() => trocar(t)}
          >
            <Icone size={15} strokeWidth={1.75} aria-hidden />
          </button>
        );
      })}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { TEMAS, type Tema, aplicarTema, temaAtual } from "@/lib/tema";
import styles from "./layout.module.css";

/** papel / tinta / terra. */
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
      {TEMAS.map((t) => (
        <button key={t} type="button" aria-pressed={t === tema} onClick={() => trocar(t)}>
          {t}
        </button>
      ))}
    </div>
  );
}

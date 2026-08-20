"use client";

import { useEffect, useState } from "react";
import styles from "./layout.module.css";

const TEMAS = ["papel", "tinta", "terra"] as const;
type Tema = (typeof TEMAS)[number];

/** papel / tinta / terra, conforme o ThemeSwitcher do design-system. */
export function ThemeSwitcher() {
  // começa null no servidor e no cliente; após montar lê o tema já aplicado pelo script inline
  const [tema, setTema] = useState<Tema | null>(null);

  useEffect(() => {
    setTema((document.documentElement.dataset.theme as Tema) ?? "papel");
  }, []);

  function trocar(t: Tema) {
    setTema(t);
    document.documentElement.dataset.theme = t;
    try {
      localStorage.setItem("pc-theme", t);
    } catch {}
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

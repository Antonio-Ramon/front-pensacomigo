"use client";

import styles from "./layout.module.css";

const TEMAS = ["papel", "tinta", "terra"] as const;

export function ThemeSwitcher() {
  function trocar() {
    const el = document.documentElement;
    const atual = (el.dataset.theme ?? "papel") as (typeof TEMAS)[number];
    const proximo = TEMAS[(TEMAS.indexOf(atual) + 1) % TEMAS.length];
    el.dataset.theme = proximo;
    localStorage.setItem("tema", proximo);
  }

  return (
    <button type="button" className={styles.temaBtn} onClick={trocar} aria-label="Trocar tema">
      tema
    </button>
  );
}

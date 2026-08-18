"use client";

import { useEffect, useRef } from "react";
import styles from "./progresso.module.css";

/** Fio de progresso colado embaixo do header. */
export function ProgressoLeitura() {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aoRolar = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      if (barra.current) {
        barra.current.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
      }
    };
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return <div ref={barra} className={styles.barra} aria-hidden />;
}

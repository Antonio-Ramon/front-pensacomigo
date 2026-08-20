"use client";

import { useEffect, useState } from "react";
import { API_PUBLICA } from "@/lib/navegador";
import styles from "./interacoes.module.css";

/**
 * Curtida é anônima e deduplicada no servidor pelo viewer_hash; o localStorage só
 * serve para o botão lembrar o estado entre visitas — a verdade continua na API.
 */
export function Curtidas({ postId, inicial }: { postId: string; inicial: number }) {
  const chave = `curtida:${postId}`;
  const [curtido, setCurtido] = useState(false);
  const [total, setTotal] = useState(inicial);

  useEffect(() => {
    setCurtido(localStorage.getItem(chave) === "1");
  }, [chave]);

  async function alternar() {
    const proximo = !curtido;
    setCurtido(proximo);
    setTotal((t) => t + (proximo ? 1 : -1));
    try {
      const res = await fetch(`${API_PUBLICA}/api/v1/posts/${postId}/curtidas`, {
        method: proximo ? "POST" : "DELETE",
      });
      if (!res.ok) throw new Error();
      localStorage.setItem(chave, proximo ? "1" : "0");
    } catch {
      setCurtido(!proximo);
      setTotal((t) => t + (proximo ? -1 : 1));
    }
  }

  return (
    <button
      type="button"
      onClick={alternar}
      className={`${styles.curtir} ${curtido ? styles.curtido : ""}`}
      aria-pressed={curtido}
    >
      isso me ajudou <b>{total}</b>
    </button>
  );
}

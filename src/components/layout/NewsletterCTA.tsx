"use client";

import { useState } from "react";
import styles from "./newsletter.module.css";

/**
 * Bloco de assinatura (NewsletterCTA do design system).
 * ponytail: ainda não existe backend de newsletter — o envio responde honesto
 * que está por vir; trocar a mensagem pelo POST quando a API existir.
 */
export function NewsletterCTA({ tone = "dashed" }: { tone?: "dashed" | "solid" }) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  return (
    <div className={`${styles.cta} ${tone === "solid" ? styles.solid : ""}`} id="newsletter">
      <h4 className={styles.titulo}>Recebe a próxima às 6h?</h4>
      <p className={styles.descricao}>
        Uma meditação por dia útil. Sem correntes, sem “compartilhe com sete pessoas”.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          setMsg(
            email.includes("@")
              ? "⚠ a newsletter ainda não está no ar — volte em breve."
              : "⚠ informe um e-mail válido.",
          );
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setMsg("");
          }}
          placeholder="seu@email.com"
          aria-label="Seu e-mail"
        />
        <button type="submit">Assinar</button>
      </form>
      <p className={styles.msg}>{msg}</p>
    </div>
  );
}

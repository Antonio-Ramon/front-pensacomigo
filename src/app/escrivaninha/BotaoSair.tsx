"use client";

import { LogOut } from "lucide-react";
import { API_PUBLICA } from "@/lib/navegador";
import styles from "./escrivaninha.module.css";

/** Logout direto no browser: o Set-Cookie de expiração precisa chegar a ele. */
export function BotaoSair() {
  async function sair() {
    await fetch(`${API_PUBLICA}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/";
  }

  return (
    <button type="button" className={styles.btnExcluir} onClick={sair} title="Sair">
      <LogOut size={12} /> sair
    </button>
  );
}

"use client";

import { LogOut } from "lucide-react";
import { API_PUBLICA } from "@/lib/navegador";
import { toast } from "@/lib/toast";
import styles from "./escrivaninha.module.css";

/** Logout direto no browser: o Set-Cookie de expiração precisa chegar a ele. */
export function BotaoSair() {
  async function sair() {
    // sem o Set-Cookie de expiração a sessão continua viva: falhou, fica —
    // redirecionar aqui seria logout de mentira
    try {
      const res = await fetch(`${API_PUBLICA}/api/v1/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!res.ok) throw new Error(`API respondeu ${res.status}.`);
      // Com front e API em domínios diferentes a sessão também vive num cookie daqui.
      await fetch("/api/sessao", { method: "DELETE" });
      window.location.href = "/";
    } catch (e) {
      toast.falhou("Não foi possível sair", e, sair);
    }
  }

  return (
    <button type="button" className={styles.btnExcluir} onClick={sair} title="Sair">
      <LogOut size={12} /> sair
    </button>
  );
}

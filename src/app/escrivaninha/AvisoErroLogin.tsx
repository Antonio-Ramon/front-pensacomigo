"use client";

import { useEffect, useState } from "react";
import styles from "./escrivaninha.module.css";

/**
 * O callback do OAuth não devolve mais JSON de erro: toda falha volta como
 * redirect para cá com `?erro=`. Motivos novos podem surgir no backend, então
 * valor desconhecido cai na mensagem genérica em vez de sumir calado.
 */
const MENSAGENS: Record<string, string> = {
  cancelado: "Login cancelado.",
  expirado: "O login expirou. Tente de novo.",
  falhou: "Não foi possível entrar. Tente de novo em instantes.",
};

const GENERICA = "Não foi possível entrar. Tente de novo em instantes.";

export function AvisoErroLogin() {
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const erro = url.searchParams.get("erro");
    if (erro === null) return;

    setMensagem(MENSAGENS[erro] ?? GENERICA);

    // sem limpar a query o erro reaparece no refresh e viaja junto se a URL for
    // compartilhada; a mensagem já vive no estado e sobrevive à troca
    url.searchParams.delete("erro");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  if (!mensagem) return null;

  return (
    <p className={styles.loginErro} role="alert">
      {mensagem}
    </p>
  );
}

"use client";

import { useEffect } from "react";
import { toast } from "@/lib/toast";

/**
 * O callback do OAuth não devolve mais JSON de erro: toda falha volta como
 * redirect para o front com `?erro=`. Fica no layout raiz porque o destino não
 * é sempre a escrivaninha — `cancelado` e `expirado` são decididos antes de o
 * backend ler o returnUrl do cookie, então caem na home.
 *
 * Motivos novos podem surgir no backend, então valor desconhecido cai na
 * mensagem genérica em vez de sumir calado.
 */
const MENSAGENS: Record<string, string> = {
  cancelado: "Login cancelado.",
  expirado: "O login expirou. Tente de novo.",
  falhou: "Não foi possível entrar. Tente de novo em instantes.",
};

const GENERICA = "Não foi possível entrar. Tente de novo em instantes.";

export function AvisoErroLogin() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const erro = url.searchParams.get("erro");
    if (erro === null) return;

    // limpa antes de avisar: sem isso o erro reaparece no refresh e viaja junto
    // quando a URL é compartilhada — e o efeito repetido do StrictMode não
    // encontra mais o parâmetro, então o toast não sai dobrado
    url.searchParams.delete("erro");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);

    toast.erro(MENSAGENS[erro] ?? GENERICA, { rotulo: "login" });
  }, []);

  return null;
}

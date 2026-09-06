"use client";

import { useEffect } from "react";
import { aplicarFavicon, temaAtual } from "@/lib/tema";

/**
 * Mantém o favicon no tema escolhido.
 *
 * Não basta aplicar uma vez: o <head> é do servidor, que sempre renderiza o tema
 * padrão, e o Next reinsere os <link> da metadata a cada navegação client-side —
 * o que reverteria o ícone. Por isso observamos o <head> e reaplicamos sempre que
 * ele mexer nos links de ícone. Como aplicarFavicon só escreve quando o href está
 * errado, o observer não se realimenta.
 */
export function FaviconDoTema() {
  useEffect(() => {
    const sincronizar = () => aplicarFavicon(temaAtual());
    sincronizar();

    const observer = new MutationObserver(sincronizar);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["href", "rel"],
    });
    return () => observer.disconnect();
  }, []);

  return null;
}

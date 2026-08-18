"use client";

import { useState } from "react";

export function ShareButton({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = useState(false);

  async function compartilhar() {
    const url = location.href;
    if (navigator.share) {
      await navigator.share({ title: titulo, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={compartilhar}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "var(--fs-mono)",
        letterSpacing: "var(--tracking-mono)",
        textTransform: "uppercase",
        color: "var(--soft)",
        background: "none",
        border: "1px solid var(--line)",
        padding: "var(--sp-2) var(--sp-4)",
        cursor: "pointer",
      }}
    >
      {copiado ? "link copiado" : "compartilhar"}
    </button>
  );
}

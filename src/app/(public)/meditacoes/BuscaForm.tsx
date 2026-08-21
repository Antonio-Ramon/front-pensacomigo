"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import styles from "./arquivo.module.css";

/** Navegação client-side: evita o reload da página (que piscava o tema). */
export function BuscaForm({ busca }: { busca?: string }) {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <form
      className={styles.busca}
      onSubmit={(e) => {
        e.preventDefault();
        const valor = new FormData(e.currentTarget).get("busca")?.toString().trim();
        // preserva etapa/estado; buscar volta à página 1
        const q = new URLSearchParams(params);
        q.delete("pagina");
        if (valor) q.set("busca", valor);
        else q.delete("busca");
        const s = q.toString();
        router.push(s ? `/meditacoes?${s}` : "/meditacoes");
      }}
    >
      {/* sem botão, como na referência: Enter submete */}
      <Search size={14} className={styles.buscaIcone} aria-hidden />
      <input
        type="search"
        name="busca"
        placeholder="buscar — ex. Habacuque, luto, maná…"
        defaultValue={busca ?? ""}
        aria-label="Buscar meditações por título"
      />
    </form>
  );
}

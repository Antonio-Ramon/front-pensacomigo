"use client";

import { useRouter } from "next/navigation";
import styles from "./arquivo.module.css";

/** Navegação client-side: evita o reload da página (que piscava o tema). */
export function BuscaForm({ busca }: { busca?: string }) {
  const router = useRouter();

  return (
    <form
      className={styles.busca}
      onSubmit={(e) => {
        e.preventDefault();
        const valor = new FormData(e.currentTarget).get("busca")?.toString().trim();
        router.push(valor ? `/meditacoes?busca=${encodeURIComponent(valor)}` : "/meditacoes");
      }}
    >
      <input
        type="search"
        name="busca"
        placeholder="buscar — ex. Habacuque, luto, maná…"
        defaultValue={busca ?? ""}
        aria-label="Buscar meditações por título"
      />
      <button type="submit">buscar</button>
    </form>
  );
}

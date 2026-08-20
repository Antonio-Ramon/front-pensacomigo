"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./escrivaninha.module.css";

export function BuscaAdmin() {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const q = new URLSearchParams(params);
        const valor = new FormData(e.currentTarget).get("busca")?.toString().trim();
        if (valor) q.set("busca", valor);
        else q.delete("busca");
        router.push(`/escrivaninha?${q}`);
      }}
    >
      <input
        type="search"
        name="busca"
        className={styles.buscaInput}
        placeholder="buscar por título…"
        defaultValue={params.get("busca") ?? ""}
        aria-label="Buscar meditações por título"
      />
    </form>
  );
}

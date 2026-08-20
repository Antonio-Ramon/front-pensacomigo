"use client";

import { useTransition } from "react";
import { excluirPost } from "./actions";
import styles from "./escrivaninha.module.css";

// ponytail: confirm() nativo no lugar do ConfirmDialog da referência — mesmo efeito, zero estado
export function BotaoExcluir({ id, titulo }: { id: string; titulo: string }) {
  const [pendente, startTransition] = useTransition();

  return (
    <button
      type="button"
      className={styles.btnExcluir}
      disabled={pendente}
      onClick={() => {
        if (confirm(`“${titulo}” sai do arquivo na hora. Esta ação não tem volta.`))
          startTransition(() => excluirPost(id));
      }}
    >
      {pendente ? "excluindo…" : "excluir"}
    </button>
  );
}

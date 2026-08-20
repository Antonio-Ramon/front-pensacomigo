"use client";

import { useState, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { excluirPost } from "./actions";
import styles from "./escrivaninha.module.css";

export function BotaoExcluir({ id, titulo }: { id: string; titulo: string }) {
  const [aberto, setAberto] = useState(false);
  const [pendente, startTransition] = useTransition();

  return (
    <>
      <button
        type="button"
        className={styles.btnExcluir}
        disabled={pendente}
        title="Excluir"
        aria-label="Excluir"
        onClick={() => setAberto(true)}
      >
        <Trash2 size={15} />
      </button>
      <ConfirmDialog
        open={aberto}
        tone="danger"
        title="Excluir esta meditação?"
        message={`“${titulo}” sai do arquivo na hora. Esta ação não tem volta.`}
        confirmLabel="Excluir agora"
        cancelLabel="Ainda não"
        onCancel={() => setAberto(false)}
        onConfirm={() => {
          setAberto(false);
          startTransition(() => excluirPost(id));
        }}
      />
    </>
  );
}

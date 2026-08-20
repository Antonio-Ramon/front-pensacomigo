"use client";

import { useState, useTransition } from "react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { excluirComentario, ocultarComentario } from "../../actions";
import styles from "../../escrivaninha.module.css";

export function BotoesModeracao({ postId, id }: { postId: string; id: string }) {
  const [aberto, setAberto] = useState(false);
  const [pendente, startTransition] = useTransition();

  return (
    <span className={styles.acoes}>
      <button
        type="button"
        className={styles.btnExcluir}
        disabled={pendente}
        onClick={() => startTransition(() => ocultarComentario(postId, id))}
      >
        ocultar
      </button>
      <button
        type="button"
        className={styles.btnExcluir}
        disabled={pendente}
        onClick={() => setAberto(true)}
      >
        excluir
      </button>
      <ConfirmDialog
        open={aberto}
        tone="danger"
        title="Excluir este comentário?"
        message="Ele some da conversa na hora. Esta ação não tem volta — para tirar do ar sem apagar, use ocultar."
        confirmLabel="Excluir agora"
        cancelLabel="Ainda não"
        onCancel={() => setAberto(false)}
        onConfirm={() => {
          setAberto(false);
          startTransition(() => excluirComentario(postId, id));
        }}
      />
    </span>
  );
}

"use client";

import { useTransition } from "react";
import { excluirComentario, ocultarComentario } from "../../actions";
import styles from "../../escrivaninha.module.css";

export function BotoesModeracao({ postId, id }: { postId: string; id: string }) {
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
        onClick={() => {
          if (confirm("Excluir este comentário? Esta ação não tem volta."))
            startTransition(() => excluirComentario(postId, id));
        }}
      >
        excluir
      </button>
    </span>
  );
}

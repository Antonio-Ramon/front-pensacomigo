"use client";

import { useState, useTransition } from "react";
import { EyeOff, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/lib/toast";
import { excluirComentario, ocultarComentario } from "../../actions";
import styles from "../../escrivaninha.module.css";

export function BotoesModeracao({ postId, id, autor }: { postId: string; id: string; autor?: string }) {
  const [aberto, setAberto] = useState(false);
  const [pendente, startTransition] = useTransition();

  const ocultar = () =>
    startTransition(() =>
      ocultarComentario(postId, id)
        .then(() => toast.sucesso("Comentário ocultado", { rotulo: "moderação", desc: autor }))
        .catch((e) => toast.falhou("Não foi possível ocultar o comentário", e, ocultar)),
    );
  const excluir = () =>
    startTransition(() =>
      excluirComentario(postId, id)
        .then(() => toast.sucesso("Comentário excluído", { rotulo: "moderação", desc: autor }))
        .catch((e) => toast.falhou("Não foi possível excluir o comentário", e, excluir)),
    );

  return (
    <span className={styles.acoes}>
      <button
        type="button"
        className={styles.btnExcluir}
        disabled={pendente}
        onClick={ocultar}
      >
        <EyeOff size={12} /> ocultar
      </button>
      <button
        type="button"
        className={styles.btnExcluir}
        disabled={pendente}
        onClick={() => setAberto(true)}
      >
        <Trash2 size={12} /> excluir
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
          excluir();
        }}
      />
    </span>
  );
}

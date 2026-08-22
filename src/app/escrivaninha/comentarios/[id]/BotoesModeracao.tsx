"use client";

import { useState, useTransition } from "react";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { toast } from "@/lib/toast";
import { excluirComentario, moderarComentario } from "../../actions";
import styles from "../../escrivaninha.module.css";

export function BotoesModeracao({
  postId,
  id,
  autor,
  aprovado,
}: {
  postId: string;
  id: string;
  autor?: string;
  aprovado: boolean;
}) {
  const [aberto, setAberto] = useState(false);
  const [pendente, startTransition] = useTransition();

  // ocultar é reversível (PATCH .../reexibir), então o toast leva "desfazer" — regra 03 do design
  const moderar = (paraAprovado: boolean) => () =>
    startTransition(() =>
      moderarComentario(postId, id, paraAprovado)
        .then(() =>
          paraAprovado
            ? toast.sucesso("Comentário reexibido", { rotulo: "moderação", desc: autor })
            : toast.sucesso("Comentário ocultado", {
                rotulo: "moderação",
                desc: autor,
                acao: "desfazer →",
                aoAgir: moderar(true),
              }),
        )
        .catch((e) =>
          toast.falhou(
            `Não foi possível ${paraAprovado ? "reexibir" : "ocultar"} o comentário`,
            e,
            moderar(paraAprovado),
          ),
        ),
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
        onClick={moderar(!aprovado)}
      >
        {aprovado ? (
          <>
            <EyeOff size={12} /> ocultar
          </>
        ) : (
          <>
            <Eye size={12} /> reexibir
          </>
        )}
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

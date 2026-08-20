"use client";

import styles from "./confirmdialog.module.css";

/** Modal de confirmação do design system. Ações destrutivas usam tone="danger". */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  tone = "default",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: "default" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className={styles.veu} onClick={onCancel}>
      <div className={styles.caixa} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.titulo}>{title}</h3>
        <p className={styles.mensagem}>{message}</p>
        <div className={styles.acoes}>
          <button type="button" className={styles.cancelar} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={tone === "danger" ? styles.perigo : styles.confirmar}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

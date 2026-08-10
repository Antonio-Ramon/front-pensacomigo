import * as React from 'react';
/** Confirmation modal over a scrim — for destructive actions like deleting a post. */
export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  tone?: 'danger' | 'accent';
  onConfirm?: () => void;
  onCancel?: () => void;
}
export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element | null;

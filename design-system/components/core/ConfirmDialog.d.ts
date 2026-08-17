import * as React from 'react';
/** Modal confirmation dialog. */
export interface ConfirmDialogProps {
  open: boolean; title: React.ReactNode; message?: React.ReactNode;
  confirmLabel?: string; cancelLabel?: string; tone?: 'default' | 'danger';
  onConfirm?: () => void; onCancel?: () => void;
}
export function ConfirmDialog(props: ConfirmDialogProps): JSX.Element | null;

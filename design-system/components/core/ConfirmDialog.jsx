import React from 'react';
import { Button } from './Button.jsx';

/** Modal confirmation. Destructive actions use tone="danger". */
export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar',
  tone = 'default', onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" onClick={onCancel}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.42)', display: 'grid',
        placeItems: 'center', padding: 24, zIndex: 90 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--surface)', border: '1px solid var(--line)',
        borderRadius: 'var(--radius-md)', padding: 28, maxWidth: 420, width: '100%', boxShadow: 'var(--shadow-md)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-medium)', fontSize: 21,
          margin: 0, color: 'var(--ink)' }}>{title}</h3>
        <p style={{ fontSize: 14.5, color: 'var(--soft)', lineHeight: 1.6, margin: '10px 0 0' }}>{message}</p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 24 }}>
          <Button variant="ghost" size="sm" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={tone === 'danger' ? 'accent' : 'solid'} size="sm" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Button } from './Button.jsx';

/** Confirmation dialog centered over a scrim. tone="danger" for destructive actions. */
export function ConfirmDialog({ open, title, message, confirmLabel = 'Confirmar', cancelLabel = 'Cancelar',
  tone = 'danger', onConfirm, onCancel }) {
  React.useEffect(() => {
    if (!open) return;
    if (window.lucide) window.lucide.createIcons();
    const h = e => { if (e.key === 'Escape') onCancel && onCancel(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div onClick={onCancel} style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: 'var(--sp-5)',
      background: 'rgba(22,21,15,0.42)', backdropFilter: 'blur(2px)' }}>
      <div role="dialog" aria-modal="true" onClick={e => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 420, background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-hair)', boxShadow: 'var(--shadow-lg)', padding: 'var(--sp-6)',
          animation: 'pc-dialog-in 180ms cubic-bezier(0.4,0,0.2,1)' }}>
        <style>{`@keyframes pc-dialog-in{from{opacity:0;transform:translateY(8px) scale(0.98)}to{opacity:1;transform:none}}`}</style>
        <div style={{ display: 'flex', gap: 'var(--sp-4)', marginBottom: 'var(--sp-4)' }}>
          <span style={{ width: 42, height: 42, borderRadius: '50%', flexShrink: 0, display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center',
            background: tone === 'danger' ? 'var(--danger-100)' : 'var(--accent-100)' }}>
            <i data-lucide={tone === 'danger' ? 'trash-2' : 'help-circle'}
              style={{ width: 20, height: 20, color: tone === 'danger' ? 'var(--danger-600)' : 'var(--accent-600)' }}></i>
          </span>
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', fontWeight: 600,
              color: 'var(--text-strong)', margin: '0 0 6px' }}>{title}</h3>
            {message && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.6,
              color: 'var(--text-muted)', margin: 0 }}>{message}</p>}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--sp-3)' }}>
          <Button variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
          <Button variant={tone === 'danger' ? 'primary' : 'primary'} onClick={onConfirm}
            style={tone === 'danger' ? { background: 'var(--danger-600)' } : undefined}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}

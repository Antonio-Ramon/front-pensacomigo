import React from 'react';

/** Empty-state block: quiet Lucide glyph, serif message, optional action. */
export function EmptyState({ icon = 'feather', title, message, action, style, ...rest }) {
  return (
    <div style={{ textAlign: 'center', padding: 'var(--sp-9) var(--sp-5)', maxWidth: 420, margin: '0 auto', ...style }} {...rest}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--surface-wash)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-4)' }}>
        <i data-lucide={icon} style={{ width: 24, height: 24, color: 'var(--accent-500)' }}></i>
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', fontWeight: 'var(--w-semibold)',
        color: 'var(--text-strong)', margin: '0 0 var(--sp-2)' }}>{title}</h3>
      {message && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)',
        lineHeight: 1.6, margin: '0 0 var(--sp-5)' }}>{message}</p>}
      {action}
    </div>
  );
}

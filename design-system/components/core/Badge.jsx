import React from 'react';

/** Small status badge. Tones: draft (neutral), published (success), warning, danger. */
export function Badge({ tone = 'draft', children, style, ...rest }) {
  const tones = {
    draft: { background: 'var(--surface-sunken)', color: 'var(--text-muted)', border: '1px solid var(--border-hair)' },
    published: { background: 'var(--success-100)', color: 'var(--success-600)' },
    warning: { background: 'var(--warning-100)', color: 'var(--warning-600)' },
    danger: { background: 'var(--danger-100)', color: 'var(--danger-600)' },
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-medium)', fontSize: 'var(--fs-ui-xs)', letterSpacing: '0.02em',
      padding: '3px 10px', borderRadius: 'var(--radius-pill)', lineHeight: 1.3, ...tones[tone], ...style }}
      {...rest}>
      {tone === 'published' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--success-600)' }}></span>}
      {children}
    </span>
  );
}

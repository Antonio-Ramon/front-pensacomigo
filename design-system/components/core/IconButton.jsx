import React from 'react';

/** Icon-only button (Lucide glyph via `icon` name). For search, share, actions. */
export function IconButton({ icon, size = 'md', label, variant = 'ghost', style, ...rest }) {
  const dim = size === 'sm' ? 32 : size === 'lg' ? 44 : 38;
  const variants = {
    ghost: { background: 'transparent', border: '1px solid transparent', color: 'var(--text-muted)' },
    outline: { background: 'var(--surface-card)', border: '1px solid var(--border-hair)', color: 'var(--text-body)' },
  };
  return (
    <button aria-label={label} title={label}
      style={{ width: dim, height: dim, borderRadius: 'var(--radius-md)', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)', ...variants[variant], ...style }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface-sunken)'; e.currentTarget.style.color = 'var(--accent-600)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = variant === 'outline' ? 'var(--surface-card)' : 'transparent'; e.currentTarget.style.color = variant === 'outline' ? 'var(--text-body)' : 'var(--text-muted)'; }}
      {...rest}>
      <i data-lucide={icon} style={{ width: size === 'sm' ? 16 : 19, height: size === 'sm' ? 16 : 19 }}></i>
    </button>
  );
}

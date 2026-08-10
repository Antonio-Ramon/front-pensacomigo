import React from 'react';

/** Action button. Variants: primary (teal), warm (terracotta), secondary (outline), ghost. */
export function Button({ variant = 'primary', size = 'md', disabled, children, style, ...rest }) {
  const base = {
    fontFamily: 'var(--font-ui)', fontWeight: 'var(--w-semibold)',
    borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)',
    border: '1px solid transparent', transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease), transform var(--dur-fast) var(--ease)',
    lineHeight: 1, whiteSpace: 'nowrap', opacity: disabled ? 0.5 : 1,
  };
  const sizes = {
    sm: { fontSize: 'var(--fs-ui-sm)', padding: '8px 14px' },
    md: { fontSize: 'var(--fs-ui)', padding: '11px 20px' },
    lg: { fontSize: 'var(--fs-ui)', padding: '14px 26px' },
  };
  const variants = {
    primary: { background: 'var(--accent-600)', color: 'var(--text-on-accent)' },
    warm: { background: 'var(--warm-600)', color: 'var(--text-on-accent)' },
    secondary: { background: 'var(--surface-card)', color: 'var(--text-strong)', borderColor: 'var(--border-strong)' },
    ghost: { background: 'transparent', color: 'var(--text-body)' },
  };
  return (
    <button disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-600)';
        if (variant === 'warm') e.currentTarget.style.background = 'var(--warm-600)';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
        if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-card)';
      }}
      onMouseEnter={e => {
        if (disabled) return;
        if (variant === 'primary') e.currentTarget.style.background = 'var(--accent-700)';
        if (variant === 'warm') e.currentTarget.style.background = 'var(--warm-700)';
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-sunken)';
        if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-sunken)';
      }}
      {...rest}>{children}</button>
  );
}

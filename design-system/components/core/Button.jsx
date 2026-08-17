import React from 'react';

/** Pill action button. solid = primary fill · ghost = hairline outline · quiet = text only · accent = terracotta fill. */
export function Button({ variant = 'solid', size = 'md', disabled, children, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const sizes = {
    sm: { fontSize: 'var(--fs-ui-sm)', padding: '8px 16px' },
    md: { fontSize: 'var(--fs-ui)', padding: '12px 22px' },
    lg: { fontSize: 'var(--fs-ui)', padding: '14px 28px' },
  };
  const variants = {
    solid: { background: 'var(--primary)', color: 'var(--on-primary)', borderColor: 'transparent', filter: h && !disabled ? 'brightness(1.12)' : 'none' },
    accent: { background: 'var(--accent)', color: 'var(--on-primary)', borderColor: 'transparent', filter: h && !disabled ? 'brightness(1.08)' : 'none' },
    ghost: { background: 'transparent', color: h && !disabled ? 'var(--primary)' : 'var(--ink)', borderColor: h && !disabled ? 'var(--primary)' : 'var(--line)' },
    quiet: { background: 'transparent', color: h && !disabled ? 'var(--ink)' : 'var(--soft)', borderColor: 'transparent' },
  };
  return (
    <button disabled={disabled} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: 'var(--font-ui)', fontWeight: 'var(--w-medium)', lineHeight: 1, whiteSpace: 'nowrap',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-2)',
        borderRadius: 'var(--radius-pill)', border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1,
        transition: 'filter var(--dur-fast) var(--ease), color var(--dur) var(--ease), border-color var(--dur) var(--ease)',
        ...sizes[size], ...variants[variant], ...style,
      }} {...rest}>{children}</button>
  );
}

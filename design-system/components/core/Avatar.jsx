import React from 'react';

/** Round avatar. Falls back to an initial on the accent wash when no `src`. */
export function Avatar({ src, name = '', size = 40, style, ...rest }) {
  const initial = name.trim().charAt(0).toUpperCase() || '·';
  return (
    <span style={{ width: size, height: size, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--accent-100)', color: 'var(--accent-700)', fontFamily: 'var(--font-ui)',
      fontWeight: 'var(--w-semibold)', fontSize: size * 0.42, ...style }} {...rest}>
      {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initial}
    </span>
  );
}

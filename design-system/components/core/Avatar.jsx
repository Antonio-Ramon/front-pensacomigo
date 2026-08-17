import React from 'react';

/** Initials avatar in accent — square, like everything else. */
export function Avatar({ name = '', initials, size = 30, style, ...rest }) {
  const ini = initials || name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span style={{
      width: size, height: size, display: 'grid', placeItems: 'center', flex: 'none',
      background: 'var(--accent)', color: 'var(--on-primary)', fontFamily: 'var(--font-mono)',
      fontSize: Math.round(size * 0.35), ...style,
    }} {...rest}>{ini}</span>
  );
}

import React from 'react';

/** Lowercase mono eyebrow that opens every section. Wrap emphasis in <b> for accent color. */
export function Eyebrow({ children, style, ...rest }) {
  return (
    <p style={{
      fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tracking-eyebrow)',
      textTransform: 'lowercase', color: 'var(--faint)', margin: 0, ...style,
    }} {...rest}>{children}</p>
  );
}

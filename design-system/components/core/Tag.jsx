import React from 'react';

/** Mono metadata tag — small, rectangular, hairline. Used for scripture refs and topics. */
export function Tag({ children, tone = 'neutral', style, ...rest }) {
  const tones = {
    neutral: { color: 'var(--faint)', borderColor: 'var(--line)' },
    accent: { color: 'var(--accent)', borderColor: 'var(--accent)' },
    primary: { color: 'var(--primary)', borderColor: 'var(--primary)' },
  };
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.06em',
      border: '1px solid', borderRadius: 'var(--radius-xs)', padding: '2px 7px', whiteSpace: 'nowrap',
      ...tones[tone], ...style,
    }} {...rest}>{children}</span>
  );
}

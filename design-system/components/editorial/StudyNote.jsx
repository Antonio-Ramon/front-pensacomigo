import React from 'react';

/** Study aside: accent rule, mono kicker, smaller sans text. For philology and context notes. */
export function StudyNote({ label = 'nota de estudo', children, style, ...rest }) {
  return (
    <aside style={{ margin: '32px 0', borderLeft: '2px solid var(--accent)', padding: '2px 0 2px 20px',
      fontFamily: 'var(--font-ui)', fontSize: 14.5, lineHeight: 1.65, color: 'var(--soft)', ...style }} {...rest}>
      <b style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
        color: 'var(--accent)', marginBottom: 6, fontWeight: 500 }}>{label}</b>
      {children}
    </aside>
  );
}

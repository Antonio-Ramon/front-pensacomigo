import React from 'react';

/** Scripture pulled out of the prose: mono ref with a › marker, serif quote on a surface panel. */
export function VerseBlock({ reference, children, style, ...rest }) {
  return (
    <figure style={{ margin: '32px 0', background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)', padding: '22px 24px', ...style }} {...rest}>
      <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--accent)',
        letterSpacing: '0.08em', marginBottom: 12 }}>
        <span style={{ color: 'var(--faint)' }}>&gt; </span>{reference}
      </figcaption>
      <blockquote style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-light)', fontSize: 19.5,
        lineHeight: 1.5, color: 'var(--ink)', margin: 0 }}>{children}</blockquote>
    </figure>
  );
}

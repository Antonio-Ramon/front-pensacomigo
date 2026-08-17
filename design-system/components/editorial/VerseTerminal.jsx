import React from 'react';

/** Terminal-framed verse — the signature "the faith that makes you think" device. Use once per page. */
export function VerseTerminal({ slug, command, children, cite, style, ...rest }) {
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)',
      borderRadius: 'var(--radius-md)', overflow: 'hidden', ...style }} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 14px',
        borderBottom: '1px solid var(--line)', background: 'var(--bg-alt)' }}>
        {[0, 1, 2].map(i => <i key={i} style={{ width: 8, height: 8, background: 'var(--line)' }} />)}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', marginLeft: 6 }}>{slug}</span>
      </div>
      <div style={{ padding: '26px 24px 24px' }}>
        {command && <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--accent)', margin: '0 0 14px' }}>
          <span style={{ color: 'var(--faint)' }}>› </span>{command}
        </p>}
        <blockquote style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-light)',
          fontSize: 'clamp(19px,2.4vw,24px)', lineHeight: 1.45, color: 'var(--ink)', margin: 0 }}>{children}</blockquote>
        {cite && <cite style={{ display: 'block', marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11.5,
          color: 'var(--soft)', fontStyle: 'normal' }}>{cite}</cite>}
      </div>
    </div>
  );
}

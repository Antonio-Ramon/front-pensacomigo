import React from 'react';

/** One step of the reading trail. Four sit in a hairline grid, no gaps — a single ruled block. */
export function StageCard({ href = '#', number, title, description, refs = [], cta = 'abrir etapa →', style, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'block', background: h ? 'var(--bg-alt)' : 'var(--surface)', padding: '22px 20px 24px',
        textDecoration: 'none', transition: 'background var(--dur) var(--ease)', ...style }} {...rest}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.08em' }}>{number}</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-medium)', fontSize: 19,
        margin: '6px 0', color: 'var(--ink)' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--soft)', lineHeight: 1.5, minHeight: 40, margin: 0 }}>{description}</p>
      <ul style={{ listStyle: 'none', margin: '16px 0 0', padding: 0, display: 'flex', flexDirection: 'column', gap: 7 }}>
        {refs.map(r => <li key={r} style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--soft)' }}>
          <span style={{ color: 'var(--faint)' }}>&gt; </span>{r}</li>)}
      </ul>
      <span style={{ display: 'inline-block', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--primary)' }}>{cta}</span>
    </a>
  );
}

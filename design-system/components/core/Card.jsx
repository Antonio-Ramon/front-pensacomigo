import React from 'react';

/** Generic white surface card. `pad` toggles inner padding; `hover` enables lift on hover. */
export function Card({ pad = true, hover = false, children, style, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <div onMouseEnter={() => hover && setH(true)} onMouseLeave={() => hover && setH(false)}
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hair)',
        borderRadius: 'var(--radius-lg)', padding: pad ? 'var(--sp-6)' : 0,
        boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow var(--dur) var(--ease), transform var(--dur) var(--ease)',
        ...style }} {...rest}>
      {children}
    </div>
  );
}

import React from 'react';

/** Empty state: mono line, serif sentence, optional action. Never illustrated. */
export function EmptyState({ label = 'vazio', title, action, style, ...rest }) {
  return (
    <div style={{ border: '1px dashed var(--line)', borderRadius: 'var(--radius-md)', padding: '44px 28px',
      textAlign: 'center', ...style }} {...rest}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
        color: 'var(--faint)', margin: 0 }}>{label}</p>
      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-light)', fontSize: 21,
        color: 'var(--ink)', margin: '10px 0 0', lineHeight: 1.4 }}>{title}</p>
      {action && <div style={{ marginTop: 20 }}>{action}</div>}
    </div>
  );
}

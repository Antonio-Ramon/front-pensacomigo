import React from 'react';

/** Text input with warm hairline border + accent focus ring. Pass `label` to render a field label. */
export function Input({ label, id, style, wrapStyle, ...rest }) {
  const [f, setF] = React.useState(false);
  const input = (
    <input id={id} onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ width: '100%', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui)',
        color: 'var(--text-strong)', background: 'var(--surface-card)',
        border: `1px solid ${f ? 'var(--accent-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)', padding: '11px 14px', outline: 'none',
        boxShadow: f ? 'var(--ring)' : 'none', transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
        boxSizing: 'border-box', ...style }} {...rest} />
  );
  if (!label) return input;
  return (
    <label htmlFor={id} style={{ display: 'block', ...wrapStyle }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)',
        fontWeight: 'var(--w-medium)', color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>{label}</span>
      {input}
    </label>
  );
}

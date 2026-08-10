import React from 'react';

/** Multiline text field, same styling as Input. */
export function Textarea({ label, id, rows = 4, style, wrapStyle, ...rest }) {
  const [f, setF] = React.useState(false);
  const ta = (
    <textarea id={id} rows={rows} onFocus={() => setF(true)} onBlur={() => setF(false)}
      style={{ width: '100%', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui)',
        color: 'var(--text-strong)', background: 'var(--surface-card)', resize: 'vertical',
        border: `1px solid ${f ? 'var(--accent-500)' : 'var(--border-strong)'}`,
        borderRadius: 'var(--radius-md)', padding: '11px 14px', outline: 'none', lineHeight: 1.6,
        boxShadow: f ? 'var(--ring)' : 'none', transition: 'border-color var(--dur) var(--ease), box-shadow var(--dur) var(--ease)',
        boxSizing: 'border-box', ...style }} {...rest} />
  );
  if (!label) return ta;
  return (
    <label htmlFor={id} style={{ display: 'block', ...wrapStyle }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)',
        fontWeight: 'var(--w-medium)', color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>{label}</span>
      {ta}
    </label>
  );
}

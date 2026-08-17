import React from 'react';

/** Multi-line field. Same hairline language as Input, boxed corners. */
export function Textarea({ label, rows = 4, wrapStyle, style, ...rest }) {
  return (
    <label style={{ display: 'block', ...wrapStyle }}>
      {label && <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: '0.1em', color: 'var(--faint)', marginBottom: 8 }}>{label}</span>}
      <textarea rows={rows} style={{
        width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)',
        fontFamily: 'var(--font-ui)', fontSize: 14, lineHeight: 1.6, padding: '12px 14px',
        borderRadius: 'var(--radius-sm)', outline: 'none', resize: 'vertical', ...style,
      }} {...rest} />
    </label>
  );
}

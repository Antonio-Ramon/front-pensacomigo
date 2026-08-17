import React from 'react';

/** Pill text input. Set `shape="box"` for form fields inside panels. */
export function Input({ label, hint, shape = 'pill', wrapStyle, style, ...rest }) {
  return (
    <label style={{ display: 'block', ...wrapStyle }}>
      {label && <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: '0.1em', color: 'var(--faint)', marginBottom: 8 }}>{label}</span>}
      <input style={{
        width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink)',
        fontFamily: 'var(--font-ui)', fontSize: 14, padding: shape === 'pill' ? '11px 18px' : '10px 12px',
        borderRadius: shape === 'pill' ? 'var(--radius-pill)' : 'var(--radius-sm)', outline: 'none', ...style,
      }} {...rest} />
      {hint && <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11,
        color: 'var(--faint)', marginTop: 6 }}>{hint}</span>}
    </label>
  );
}

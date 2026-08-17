import React from 'react';

/** Native select in system chrome. Options accept strings or {value,label}. */
export function Select({ label, options = [], wrapStyle, style, ...rest }) {
  return (
    <label style={{ display: 'block', ...wrapStyle }}>
      {label && <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10.5,
        letterSpacing: '0.1em', color: 'var(--faint)', marginBottom: 8 }}>{label}</span>}
      <select style={{
        width: '100%', background: 'var(--surface)', border: '1px solid var(--line)', color: 'var(--ink)',
        fontFamily: 'var(--font-ui)', fontSize: 14, padding: '10px 12px', borderRadius: 'var(--radius-sm)',
        outline: 'none', cursor: 'pointer', ...style,
      }} {...rest}>
        {options.map(o => {
          const v = typeof o === 'string' ? o : o.value;
          return <option key={v} value={v}>{typeof o === 'string' ? o : o.label}</option>;
        })}
      </select>
    </label>
  );
}

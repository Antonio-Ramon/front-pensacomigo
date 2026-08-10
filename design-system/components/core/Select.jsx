import React from 'react';

/** Native select styled to match inputs, with a Lucide chevron. */
export function Select({ label, id, options = [], style, wrapStyle, ...rest }) {
  const el = (
    <div style={{ position: 'relative' }}>
      <select id={id}
        style={{ width: '100%', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui)',
          color: 'var(--text-strong)', background: 'var(--surface-card)', appearance: 'none',
          border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)',
          padding: '11px 38px 11px 14px', outline: 'none', cursor: 'pointer',
          boxSizing: 'border-box', ...style }} {...rest}>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
      <i data-lucide="chevron-down" style={{ position: 'absolute', right: 12, top: '50%',
        transform: 'translateY(-50%)', width: 17, height: 17, color: 'var(--text-muted)', pointerEvents: 'none' }}></i>
    </div>
  );
  if (!label) return el;
  return (
    <label htmlFor={id} style={{ display: 'block', ...wrapStyle }}>
      <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)',
        fontWeight: 'var(--w-medium)', color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>{label}</span>
      {el}
    </label>
  );
}

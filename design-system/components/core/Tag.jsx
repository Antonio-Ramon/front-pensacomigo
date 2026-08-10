import React from 'react';

/** Fully-rounded pill tag. `active` fills the tone color. `tone`: warm (default) | teal. `onRemove` shows an × (chip). */
export function Tag({ children, active, tone = 'warm', size = 'md', onClick, onRemove, style, ...rest }) {
  const pad = size === 'sm' ? '3px 10px' : '5px 14px';
  const fs = size === 'sm' ? 'var(--fs-ui-xs)' : 'var(--fs-ui-sm)';
  const tones = {
    warm: { bg: 'var(--warm-100)', text: 'var(--warm-700)', activeBg: 'var(--warm-600)' },
    teal: { bg: 'var(--accent-100)', text: 'var(--accent-700)', activeBg: 'var(--accent-600)' },
  };
  const c = tones[tone] || tones.warm;
  return (
    <span onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--sp-2)',
        fontFamily: 'var(--font-ui)', fontWeight: 'var(--w-medium)', fontSize: fs,
        padding: pad, borderRadius: 'var(--radius-pill)', lineHeight: 1.2,
        background: active ? c.activeBg : c.bg,
        color: active ? 'var(--tag-active-text)' : c.text,
        cursor: onClick ? 'pointer' : 'default', transition: 'background var(--dur) var(--ease), color var(--dur) var(--ease)',
        userSelect: 'none', ...style }}
      {...rest}>
      {children}
      {onRemove && (
        <i data-lucide="x" onClick={e => { e.stopPropagation(); onRemove(); }}
          style={{ width: 13, height: 13, cursor: 'pointer', opacity: 0.7 }}></i>
      )}
    </span>
  );
}

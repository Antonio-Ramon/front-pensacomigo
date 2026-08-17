import React from 'react';

/** Square utility button. `icon` is a Lucide icon name rendered via <i data-lucide>. */
export function IconButton({ icon, label, variant = 'ghost', size = 26, style, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <button aria-label={label} title={label} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: size, height: size, display: 'inline-grid', placeItems: 'center', cursor: 'pointer',
        borderRadius: 'var(--radius-sm)', background: variant === 'outline' ? 'var(--surface)' : 'transparent',
        border: '1px solid ' + (variant === 'outline' ? (h ? 'var(--soft)' : 'var(--line)') : 'transparent'),
        color: h ? 'var(--ink)' : 'var(--soft)', transition: 'color var(--dur) var(--ease), border-color var(--dur) var(--ease)',
        ...style,
      }} {...rest}>
      <i data-lucide={icon} style={{ width: 16, height: 16 }}></i>
    </button>
  );
}

import React from 'react';

/** Selectable mono pill — mood filters, tag filters. Pressed state fills with primary. */
export function Chip({ children, pressed = false, onClick, style, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        fontFamily: 'var(--font-mono)', fontSize: 12.5, cursor: 'pointer', padding: '9px 16px',
        borderRadius: 'var(--radius-pill)', transition: 'all var(--dur-fast) var(--ease)',
        background: pressed ? 'var(--primary)' : 'transparent',
        color: pressed ? 'var(--on-primary)' : (h ? 'var(--ink)' : 'var(--soft)'),
        border: '1px solid ' + (pressed ? 'var(--primary)' : (h ? 'var(--soft)' : 'var(--line)')),
        ...style,
      }} {...rest}>{children}</button>
  );
}

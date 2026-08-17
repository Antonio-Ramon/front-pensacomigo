import React from 'react';

/** Surface panel: hairline border, 10px radius, no shadow by default. `tone="dashed"` for opt-in blocks. */
export function Card({ children, tone = 'solid', padding = 24, style, ...rest }) {
  return (
    <div style={{
      background: tone === 'dashed' ? 'transparent' : 'var(--surface)',
      border: '1px ' + (tone === 'dashed' ? 'dashed' : 'solid') + ' var(--line)',
      borderRadius: 'var(--radius-md)', padding, ...style,
    }} {...rest}>{children}</div>
  );
}

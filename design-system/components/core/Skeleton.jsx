import React from 'react';

/** Loading placeholder — a quiet sunken block, no shimmer. */
export function Skeleton({ width = '100%', height = 14, radius = 'var(--radius-xs)', style, ...rest }) {
  return <span style={{ display: 'block', width, height, background: 'var(--bg-alt)',
    borderRadius: radius, ...style }} {...rest} />;
}

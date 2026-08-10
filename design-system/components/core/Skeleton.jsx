import React from 'react';

/** Loading skeleton block. Shape: line | title | thumb | circle. Animated shimmer. */
export function Skeleton({ shape = 'line', width, height, style, ...rest }) {
  const presets = {
    line: { width: width || '100%', height: height || 14, borderRadius: 'var(--radius-sm)' },
    title: { width: width || '70%', height: height || 28, borderRadius: 'var(--radius-sm)' },
    thumb: { width: width || '100%', aspectRatio: '16 / 9', height, borderRadius: 'var(--radius-md)' },
    circle: { width: width || 40, height: height || 40, borderRadius: '50%' },
  };
  return (
    <div style={{ background: 'linear-gradient(90deg,var(--paper-1) 25%,var(--surface-wash) 37%,var(--paper-1) 63%)',
      backgroundSize: '400% 100%', animation: 'pc-shimmer 1.4s ease infinite', ...presets[shape], ...style }} {...rest}>
      <style>{`@keyframes pc-shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}`}</style>
    </div>
  );
}

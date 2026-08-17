import React from 'react';

/** Status badge — muted, mono, for editorial states (published / draft / scheduled). */
export function Badge({ children, tone = 'neutral', style, ...rest }) {
  const tones = {
    neutral: { color: 'var(--soft)', background: 'var(--bg-alt)' },
    published: { color: 'var(--success)', background: 'var(--success-soft)' },
    draft: { color: 'var(--warning)', background: 'var(--warning-soft)' },
    danger: { color: 'var(--danger)', background: 'var(--danger-soft)' },
  };
  return (
    <span style={{
      fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.06em', padding: '4px 9px',
      borderRadius: 'var(--radius-xs)', ...tones[tone], ...style,
    }} {...rest}>{children}</span>
  );
}

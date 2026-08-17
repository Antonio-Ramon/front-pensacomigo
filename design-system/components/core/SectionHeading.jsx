import React from 'react';
import { Eyebrow } from './Eyebrow.jsx';

/** Eyebrow + serif heading + optional supporting line. The standard opener for any section. */
export function SectionHeading({ eyebrow, title, hint, as: H = 'h2', style, ...rest }) {
  return (
    <div style={{ ...style }} {...rest}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <H style={{
        fontFamily: 'var(--font-display)', fontWeight: 'var(--w-body)', fontSize: 'var(--fs-h2)',
        letterSpacing: 'var(--tracking-display)', lineHeight: 1.15, color: 'var(--ink)', margin: '12px 0 0',
      }}>{title}</H>
      {hint && <p style={{ fontSize: 14.5, color: 'var(--soft)', margin: '8px 0 0', maxWidth: '46ch' }}>{hint}</p>}
    </div>
  );
}

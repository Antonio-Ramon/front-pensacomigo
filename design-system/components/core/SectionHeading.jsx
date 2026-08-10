import React from 'react';

/** Section heading: optional CAPS overline + serif display title, editorial rhythm. */
export function SectionHeading({ overline, title, align = 'left', style, ...rest }) {
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {overline && (
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', fontWeight: 'var(--w-semibold)',
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--warm)',
          marginBottom: 'var(--sp-3)' }}>{overline}</div>
      )}
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--w-semibold)',
        letterSpacing: 'var(--tracking-heading)', lineHeight: 'var(--lh-heading)', color: 'var(--text-strong)', margin: 0 }}>{title}</h2>
    </div>
  );
}

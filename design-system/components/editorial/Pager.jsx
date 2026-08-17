import React from 'react';

/** Previous / next article pager, split by a hairline. */
export function Pager({ prev, next, style, ...rest }) {
  const Side = ({ item, align, kicker }) => item ? (
    <a href={item.href || '#'} style={{ maxWidth: '46%', textAlign: align, textDecoration: 'none' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--faint)',
        display: 'block', marginBottom: 5 }}>{kicker}</span>
      <span style={{ fontFamily: 'var(--font-display)', fontSize: 16.5, color: 'var(--ink)' }}>{item.title}</span>
    </a>
  ) : <span />;
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16, paddingTop: 26,
      borderTop: '1px solid var(--line)', flexWrap: 'wrap', ...style }} {...rest}>
      <Side item={prev} align="left" kicker="← anterior" />
      <Side item={next} align="right" kicker="próxima →" />
    </nav>
  );
}

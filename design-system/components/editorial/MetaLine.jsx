import React from 'react';

/** Mono byline meta: date · read time · tags. The single meta treatment in the system. */
export function MetaLine({ date, readTime, items = [], style, ...rest }) {
  const parts = [date, readTime && <b key="rt" style={{ color: 'var(--soft)', fontWeight: 400 }}>{readTime}</b>, ...items].filter(Boolean);
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', ...style }} {...rest}>
      {parts.map((p, i) => <React.Fragment key={i}>{i > 0 && ' · '}{p}</React.Fragment>)}
    </span>
  );
}

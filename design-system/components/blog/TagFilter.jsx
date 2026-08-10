import React from 'react';
import { Tag } from '../core/Tag.jsx';

/** Horizontal pill filter. Controlled via `active` + `onChange`. Includes a "Todas" reset. */
export function TagFilter({ tags = [], active, onChange, allLabel = 'Todas', style, ...rest }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)', ...style }} {...rest}>
      <Tag active={!active} onClick={() => onChange && onChange(null)}>{allLabel}</Tag>
      {tags.map(t => <Tag key={t} active={active === t} onClick={() => onChange && onChange(t)}>{t}</Tag>)}
    </div>
  );
}

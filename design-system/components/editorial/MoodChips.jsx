import React from 'react';
import { Chip } from '../core/Chip.jsx';

/** "Como você chega hoje?" — the entry filter. Selecting a chip is also deselecting the others. */
export function MoodChips({ options = [], value = null, onChange, style, ...rest }) {
  return (
    <div role="group" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, ...style }} {...rest}>
      {options.map(o => {
        const key = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return <Chip key={key} pressed={key === value}
          onClick={() => onChange && onChange(key === value ? null : key)}>{label}</Chip>;
      })}
    </div>
  );
}

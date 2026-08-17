import React from 'react';

/** Sticky article rail: section index plus reading tools (text size, save, copy link). */
export function TocRail({ label = 'NESTE TEXTO', sections = [], activeId, onSelect, tools, style, ...rest }) {
  return (
    <aside style={{ position: 'sticky', top: 86, paddingTop: 38, width: 'var(--rail)', ...style }} {...rest}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em',
        color: 'var(--faint)', marginBottom: 12 }}>{label}</div>
      <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column',
        gap: 2, borderLeft: '1px solid var(--line)' }}>
        {sections.map(s => {
          const on = s.id === activeId;
          return (
            <li key={s.id}>
              <a href={'#' + s.id} onClick={e => { if (onSelect) { e.preventDefault(); onSelect(s.id); } }}
                style={{ display: 'block', fontSize: 12.5, lineHeight: 1.35, padding: '5px 0 5px 14px',
                  marginLeft: -1, textDecoration: 'none', borderLeft: '1.5px solid ' + (on ? 'var(--accent)' : 'transparent'),
                  color: on ? 'var(--ink)' : 'var(--faint)' }}>{s.label}</a>
            </li>
          );
        })}
      </ul>
      {tools && <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 20,
        borderTop: '1px solid var(--line)' }}>{tools}</div>}
    </aside>
  );
}

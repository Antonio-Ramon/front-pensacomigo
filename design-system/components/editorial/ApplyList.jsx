import React from 'react';

/** "Para esta semana" — the checklist that closes every meditation. Checked items strike through. */
export function ApplyList({ label = 'aplicação', title = 'Para esta semana', items = [], style, ...rest }) {
  const [done, setDone] = React.useState(() => new Set());
  const toggle = i => setDone(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
      maxWidth: 'var(--measure)', ...style }} {...rest}>
      <div style={{ background: 'var(--bg-alt)', padding: '14px 20px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.12em', color: 'var(--accent)' }}>{label}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 'var(--w-medium)',
          margin: '4px 0 0', color: 'var(--ink)' }}>{title}</h3>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, background: 'var(--surface)' }}>
        {items.map((t, i) => (
          <li key={i} style={{ borderBottom: i === items.length - 1 ? 'none' : '1px solid var(--line)' }}>
            <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '15px 20px',
              cursor: 'pointer', fontSize: 14.5, lineHeight: 1.5, color: 'var(--ink)' }}>
              <input type="checkbox" checked={done.has(i)} onChange={() => toggle(i)}
                style={{ appearance: 'none', width: 16, height: 16, flex: 'none', marginTop: 3, cursor: 'pointer',
                  border: '1.5px solid ' + (done.has(i) ? 'var(--primary)' : 'var(--line)'),
                  background: done.has(i) ? 'var(--primary)' : 'transparent',
                  borderRadius: 'var(--radius-xs)', transition: 'all var(--dur-fast) var(--ease)' }} />
              <span style={{ color: done.has(i) ? 'var(--faint)' : 'var(--ink)',
                textDecoration: done.has(i) ? 'line-through' : 'none' }}>{t}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

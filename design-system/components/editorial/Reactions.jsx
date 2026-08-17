import React from 'react';

/** Sentence-shaped reactions ("Isso me ajudou 128") — never emoji, never a like icon. */
export function Reactions({ options = [], style, ...rest }) {
  const [on, setOn] = React.useState(() => new Set());
  const toggle = i => setOn(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', ...style }} {...rest}>
      {options.map((o, i) => {
        const active = on.has(i);
        return (
          <button key={i} type="button" aria-pressed={active} onClick={() => toggle(i)}
            style={{
              fontFamily: 'var(--font-ui)', fontSize: 13, cursor: 'pointer', padding: '8px 15px',
              display: 'flex', gap: 8, alignItems: 'center', borderRadius: 'var(--radius-pill)',
              background: active ? 'var(--primary-soft)' : 'var(--surface)',
              border: '1px solid ' + (active ? 'var(--primary)' : 'var(--line)'),
              color: active ? 'var(--primary)' : 'var(--soft)', transition: 'all var(--dur-fast) var(--ease)',
            }}>
            {o.label}
            <b style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 400,
              color: active ? 'var(--primary)' : 'var(--faint)' }}>{(o.count || 0) + (active ? 1 : 0)}</b>
          </button>
        );
      })}
    </div>
  );
}

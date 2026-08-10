import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/** One comment: avatar, name, relative time, body, Reply link. Nest one level via `reply`. */
export function Comment({ name, avatar, time, children, onReply, reply = false, replies = [], style, ...rest }) {
  return (
    <div style={{ ...style }} {...rest}>
      <div style={{ display: 'flex', gap: 'var(--sp-3)' }}>
        <Avatar name={name} src={avatar} size={reply ? 32 : 38} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--sp-3)' }}>
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 'var(--w-semibold)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-strong)' }}>{name}</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', color: 'var(--text-faint)' }}>{time}</span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.6,
            color: 'var(--text-body)', margin: '4px 0 6px' }}>{children}</p>
          {!reply && onReply && (
            <button onClick={onReply} style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)',
              fontWeight: 'var(--w-medium)', color: 'var(--accent-600)', background: 'none', border: 'none',
              cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <i data-lucide="reply" style={{ width: 13, height: 13 }}></i>Responder</button>
          )}
        </div>
      </div>
      {replies.length > 0 && (
        <div style={{ marginLeft: 50, marginTop: 'var(--sp-4)', paddingLeft: 'var(--sp-4)',
          borderLeft: '1px solid var(--border-hair)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
          {replies.map((r, i) => <Comment key={i} {...r} reply />)}
        </div>
      )}
    </div>
  );
}

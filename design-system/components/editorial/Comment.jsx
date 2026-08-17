import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/** Reader comment. Replies nest once, marked by a hairline rail. */
export function Comment({ author, date, children, replies = [], depth = 0, style, ...rest }) {
  return (
    <div style={{ paddingLeft: depth ? 20 : 0, borderLeft: depth ? '1px solid var(--line)' : 'none', ...style }} {...rest}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <Avatar name={author} size={30} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13.5, fontWeight: 'var(--w-medium)', color: 'var(--ink)' }}>{author}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)' }}>{date}</span>
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-light)', fontSize: 16,
            lineHeight: 1.6, color: 'var(--ink)', marginTop: 6 }}>{children}</div>
        </div>
      </div>
      {replies.length > 0 && <div style={{ marginTop: 20, marginLeft: 42, display: 'flex',
        flexDirection: 'column', gap: 20 }}>
        {replies.map((r, i) => <Comment key={i} author={r.author} date={r.date} depth={depth + 1}>{r.body}</Comment>)}
      </div>}
    </div>
  );
}

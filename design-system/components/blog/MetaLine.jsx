import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/** Meta line: author avatar + name + separator + date, and optional read-time. */
export function MetaLine({ author, avatar, date, readTime, size = 'md', style, ...rest }) {
  const fs = size === 'sm' ? 'var(--fs-ui-xs)' : 'var(--fs-ui-sm)';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', fontFamily: 'var(--font-ui)',
      fontSize: fs, color: 'var(--text-muted)', ...style }} {...rest}>
      {author && <Avatar name={author} src={avatar} size={size === 'sm' ? 26 : 32} />}
      <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {author && <span style={{ color: 'var(--text-body)', fontWeight: 'var(--w-medium)' }}>{author}</span>}
        {author && date && <span style={{ opacity: 0.5 }}>·</span>}
        {date && <span>{date}</span>}
        {readTime && <><span style={{ opacity: 0.5 }}>·</span><span>{readTime}</span></>}
      </span>
    </div>
  );
}

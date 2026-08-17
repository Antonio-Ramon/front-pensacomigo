import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/** Author bio panel that closes an article. */
export function AuthorBox({ name, initials, bio, style, ...rest }) {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: 24, background: 'var(--surface)',
      border: '1px solid var(--line)', borderRadius: 'var(--radius-md)', maxWidth: 'var(--measure)', ...style }} {...rest}>
      <Avatar name={name} initials={initials} size={44} />
      <div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 'var(--w-medium)',
          margin: 0, color: 'var(--ink)' }}>{name}</h4>
        <p style={{ fontSize: 14, color: 'var(--soft)', margin: '5px 0 0', lineHeight: 1.55 }}>{bio}</p>
      </div>
    </div>
  );
}

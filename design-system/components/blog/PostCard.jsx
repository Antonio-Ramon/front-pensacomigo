import React from 'react';
import { Tag } from '../core/Tag.jsx';
import { MetaLine } from './MetaLine.jsx';

/** Post card. layout="card" = 16:9 thumb stacked; layout="row" = editorial list row (small thumb left, large title). */
export function PostCard({ title, excerpt, image, author, date, readTime, tags = [], layout = 'card', onClick, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const hover = { onMouseEnter: () => setH(true), onMouseLeave: () => setH(false) };

  if (layout === 'row') {
    return (
      <article onClick={onClick} {...hover}
        style={{ display: 'grid', gridTemplateColumns: '160px minmax(0,1fr)', gap: 'var(--sp-5)', alignItems: 'start',
          cursor: onClick ? 'pointer' : 'default', ...style }} {...rest}>
        <div style={{ aspectRatio: '4 / 3', background: 'var(--surface-wash)', border: '1px solid var(--border-hair)',
          borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {image && <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ maxWidth: '58ch' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 'var(--w-semibold)',
            letterSpacing: 'var(--tracking-heading)', lineHeight: 1.2, margin: '0 0 var(--sp-3)',
            color: h ? 'var(--accent-700)' : 'var(--text-strong)', transition: 'color var(--dur) var(--ease)' }}>{title}</h3>
          {excerpt && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', lineHeight: 1.6,
            color: 'var(--text-muted)', margin: '0 0 var(--sp-4)', display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{excerpt}</p>}
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--sp-4)' }}>
            <MetaLine author={author} date={date} readTime={readTime} size="sm" />
            {tags.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
              {tags.map(t => <Tag key={t} size="sm">{t}</Tag>)}
            </div>}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article onClick={onClick} {...hover}
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hair)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden', cursor: onClick ? 'pointer' : 'default',
        display: 'flex', flexDirection: 'column', boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'box-shadow var(--dur) var(--ease)', ...style }} {...rest}>
      <div style={{ aspectRatio: '16 / 9', background: 'var(--surface-wash)', overflow: 'hidden' }}>
        {image && <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </div>
      <div style={{ padding: 'var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)', flex: 1 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 'var(--w-semibold)',
          letterSpacing: 'var(--tracking-heading)', lineHeight: 1.2, margin: 0,
          color: h ? 'var(--accent-700)' : 'var(--text-strong)', transition: 'color var(--dur) var(--ease)' }}>{title}</h3>
        {excerpt && <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.6,
          color: 'var(--text-muted)', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{excerpt}</p>}
        <div style={{ marginTop: 'auto', paddingTop: 'var(--sp-2)' }}>
          <MetaLine author={author} date={date} readTime={readTime} size="sm" style={{ marginBottom: 'var(--sp-3)' }} />
          {tags.length > 0 && <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)' }}>
            {tags.map(t => <Tag key={t} size="sm">{t}</Tag>)}
          </div>}
        </div>
      </div>
    </article>
  );
}

import React from 'react';
import { Tag } from '../core/Tag.jsx';

/**
 * The list unit of the whole site: date · cover thumb · title/dek/tags · arrow.
 * `image` is the author-chosen cover; without one, a striped placeholder renders.
 * There is no card grid in this system — archives are rows separated by hairlines.
 */
export function PostRow({ href = '#', date, title, dek, tags = [], image, imageAlt = '', style, ...rest }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: 'grid', gridTemplateColumns: '86px 96px 1fr 30px', gap: 20, alignItems: 'start',
        padding: '20px 6px', borderBottom: '1px solid var(--line)', textDecoration: 'none',
        background: h ? 'var(--bg-alt)' : 'transparent', transition: 'background var(--dur) var(--ease)', ...style,
      }} {...rest}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--faint)', whiteSpace: 'nowrap', paddingTop: 4 }}>{date}</span>
      <span style={{ width: 96, height: 68, overflow: 'hidden', display: 'grid', placeItems: 'center',
        border: '1px solid ' + (h ? 'var(--soft)' : 'var(--line)'), transition: 'border-color var(--dur) var(--ease)',
        background: 'repeating-linear-gradient(45deg, var(--bg-alt) 0 8px, transparent 8px 17px)' }}>
        {image
          ? <img src={image} alt={imageAlt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--faint)' }}>capa</span>}
      </span>
      <span>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 'var(--w-medium)', fontSize: 20,
          letterSpacing: '-0.012em', lineHeight: 1.25, margin: 0, color: 'var(--ink)' }}>{title}</h3>
        {dek && <p style={{ fontSize: 14, color: 'var(--soft)', margin: '5px 0 0', lineHeight: 1.55, maxWidth: '58ch' }}>{dek}</p>}
        {tags.length > 0 && <span style={{ marginTop: 9, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tags.map(t => <Tag key={t}>{t}</Tag>)}
        </span>}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', justifySelf: 'end', paddingTop: 4,
        color: h ? 'var(--accent)' : 'var(--faint)', opacity: h ? 1 : 0.55,
        transform: h ? 'translateX(4px)' : 'translateX(-8px)',
        transition: 'transform 220ms var(--ease), opacity var(--dur), color var(--dur)' }}>→</span>
    </a>
  );
}

import React from 'react';

/** Horizontal external-link preview card: thumbnail, title, description, source domain. */
export function LinkPreview({ url, title, description, image, domain, style, ...rest }) {
  const [h, setH] = React.useState(false);
  const host = domain || (url ? url.replace(/^https?:\/\//, '').split('/')[0] : '');
  return (
    <a href={url} target="_blank" rel="noreferrer" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: 'flex', textDecoration: 'none', background: 'var(--surface-card)',
        border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        boxShadow: h ? 'var(--shadow-md)' : 'var(--shadow-xs)', transition: 'box-shadow var(--dur) var(--ease)', ...style }} {...rest}>
      <div style={{ width: 160, flexShrink: 0, background: 'var(--surface-wash)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {image ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <i data-lucide="link" style={{ width: 22, height: 22, color: 'var(--accent-500)' }}></i>}
      </div>
      <div style={{ padding: 'var(--sp-4) var(--sp-5)', display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', letterSpacing: '0.04em',
          textTransform: 'uppercase', color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <i data-lucide="link" style={{ width: 12, height: 12 }}></i>{host}</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 'var(--w-semibold)',
          color: 'var(--text-strong)', lineHeight: 1.25 }}>{title}</div>
        {description && <div style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', color: 'var(--text-muted)',
          lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{description}</div>}
      </div>
    </a>
  );
}

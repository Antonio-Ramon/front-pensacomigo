import React from 'react';

/**
 * Real photograph chosen by the author — cover or mid-post figure.
 * With no `src`, renders the striped drop placeholder with a mono label.
 * Square corners, hairline border, mono caption below.
 */
export function PostImage({ src, alt = '', caption, label = 'imagem escolhida pelo autor', height = 200, style, ...rest }) {
  return (
    <figure style={{ margin: 0, ...style }} {...rest}>
      <div style={{ border: '1px solid var(--line)', overflow: 'hidden', height,
        background: 'repeating-linear-gradient(45deg, var(--bg-alt) 0 10px, transparent 10px 22px)',
        display: 'grid', placeItems: 'center' }}>
        {src
          ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          : <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em',
              color: 'var(--faint)', background: 'var(--bg)', border: '1px solid var(--line)', padding: '4px 10px' }}>{label}</span>}
      </div>
      {caption && <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--faint)',
        marginTop: 10, letterSpacing: '0.04em' }}>{caption}</figcaption>}
    </figure>
  );
}

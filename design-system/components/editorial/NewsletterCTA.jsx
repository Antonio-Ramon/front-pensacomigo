import React from 'react';
import { Button } from '../core/Button.jsx';

/** Inline subscribe block. tone="dashed" for the in-article version, "solid" for standalone pages. */
export function NewsletterCTA({ title = 'Recebe a próxima às 6h?', description, cta = 'Assinar',
  placeholder = 'seu@email.com', tone = 'dashed', onSubscribe, style, ...rest }) {
  const [email, setEmail] = React.useState('');
  const [msg, setMsg] = React.useState('');
  const submit = () => {
    const ok = email.includes('@');
    setMsg(ok ? '✓ pronto — confira sua caixa de entrada.' : '⚠ informe um e-mail válido.');
    if (ok && onSubscribe) onSubscribe(email);
  };
  return (
    <div style={{ maxWidth: 'var(--measure)', border: '1px ' + (tone === 'dashed' ? 'dashed' : 'solid') + ' var(--line)',
      background: tone === 'dashed' ? 'transparent' : 'var(--surface)',
      borderRadius: 'var(--radius-md)', padding: 24, ...style }} {...rest}>
      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 'var(--w-medium)',
        margin: 0, color: 'var(--ink)' }}>{title}</h4>
      {description && <p style={{ fontSize: 14, color: 'var(--soft)', margin: '6px 0 0' }}>{description}</p>}
      <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={placeholder}
          aria-label="Seu e-mail" style={{ flex: 1, minWidth: 180, background: 'var(--bg)',
            border: '1px solid var(--line)', borderRadius: 'var(--radius-pill)', padding: '11px 18px',
            color: 'var(--ink)', fontFamily: 'var(--font-ui)', fontSize: 14, outline: 'none' }} />
        <Button onClick={submit}>{cta}</Button>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--accent)',
        margin: '12px 0 0', minHeight: 16 }}>{msg}</p>
    </div>
  );
}

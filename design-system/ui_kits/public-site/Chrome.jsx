// Shared chrome for the public site: sticky header + footer.
function SiteHeader({ onNav, active, dark, onToggleTheme }) {
  const { IconButton } = window.PensaComigoDesignSystem_3d6f1f;
  const nav = ['Início', 'Meditações', 'Tags', 'Sobre'];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'var(--header-bg)',
      backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border-hair)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: '0 var(--gutter)', height: 72,
        display: 'flex', alignItems: 'center', gap: 'var(--sp-6)' }}>
        <a onClick={() => onNav('home')} style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700,
          letterSpacing: '-0.02em', color: 'var(--text-strong)', cursor: 'pointer', textDecoration: 'none', flexShrink: 0 }}>
          Pensa <span style={{ color: 'var(--warm-600)' }}>comigo</span></a>
        <nav style={{ display: 'flex', gap: 'var(--sp-5)', margin: '0 auto', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui)' }}>
          {nav.map(n => (
            <a key={n} onClick={() => onNav(n === 'Início' ? 'home' : 'home')}
              style={{ color: 'var(--text-body)', textDecoration: 'none', cursor: 'pointer', fontWeight: 500,
                paddingBottom: 2, borderBottom: '2px solid transparent' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-600)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-body)'}>{n}</a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
          <IconButton icon="search" label="Buscar" variant="ghost" />
          <IconButton icon={dark ? 'sun' : 'moon'} label={dark ? 'Tema claro' : 'Tema escuro'} variant="ghost" onClick={onToggleTheme} />
        </div>
      </div>
    </header>
  );
}

function NewsletterSection() {
  const { Button, Input } = window.PensaComigoDesignSystem_3d6f1f;
  const [email, setEmail] = React.useState('');
  const [sent, setSent] = React.useState(false);
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });
  return (
    <section style={{ background: 'var(--surface-wash)', borderTop: '1px solid var(--border-hair)',
      borderBottom: '1px solid var(--border-hair)', marginTop: 'var(--sp-10)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: 'var(--sp-9) var(--gutter)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', fontWeight: 600,
          letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--warm)', marginBottom: 'var(--sp-3)' }}>Newsletter</div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 600,
          letterSpacing: 'var(--tracking-heading)', color: 'var(--text-strong)', margin: '0 0 var(--sp-3)' }}>
          Receba uma meditação nova por semana</h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)',
          color: 'var(--text-muted)', margin: '0 0 var(--sp-5)' }}>Sem pressa, sem ruído. Só reflexão que vale o seu tempo.</p>
        {sent ? (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-ui)',
            fontSize: 'var(--fs-ui)', color: 'var(--success-600)' }}>
            <i data-lucide="check-circle" style={{ width: 18, height: 18 }}></i> Inscrição confirmada. Bem-vindo(a)!</div>
        ) : (
          <form onSubmit={e => { e.preventDefault(); if (email.trim()) setSent(true); }}
            style={{ display: 'flex', gap: 'var(--sp-3)', maxWidth: 440, margin: '0 auto' }}>
            <Input type="email" required placeholder="seu@email.com" value={email}
              onChange={e => setEmail(e.target.value)} style={{ flex: 1 }} />
            <Button variant="primary" type="submit">Inscrever</Button>
          </form>
        )}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-hair)', background: 'var(--surface-card)' }}>
      <div style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--gutter)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--sp-6)' }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-strong)' }}>
            Pensa <span style={{ color: 'var(--warm-600)' }}>comigo</span></div>
          <p style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', color: 'var(--text-muted)', marginTop: 8 }}>
            "A fé que te obriga a pensar."</p>
        </div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)', display: 'flex', gap: 'var(--sp-7)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ color: 'var(--text-body)' }}>Navegar</strong>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Meditações</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Tags</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Sobre</a>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <strong style={{ color: 'var(--text-body)' }}>Newsletter</strong>
            <span style={{ maxWidth: 200, lineHeight: 1.5 }}>Uma meditação nova por semana. Sem pressa, sem ruído.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { SiteHeader, SiteFooter, NewsletterSection });

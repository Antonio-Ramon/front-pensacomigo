// Home screen: featured hero + tag filter + single-column editorial list.
function HomeScreen({ onOpen }) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const { PostCard, TagFilter, Button, MetaLine, SectionHeading, EmptyState } = NS;
  const [active, setActive] = React.useState(null);
  const posts = window.PC_POSTS;
  const featured = posts[0];
  const rest = posts.slice(1).filter(p => !active || p.tags.includes(active));

  return (
    <main style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-8) var(--gutter) 0' }}>
      {/* Hero */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 'var(--sp-7)',
        alignItems: 'center', marginBottom: 'var(--sp-9)' }}>
        <div style={{ aspectRatio: '4 / 3', borderRadius: 'var(--radius-lg)', background: 'var(--surface-wash)',
          border: '1px solid var(--border-hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-faint)' }}>imagem de capa 4:3</span>
        </div>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-display)', fontWeight: 700,
            letterSpacing: 'var(--tracking-display)', lineHeight: 'var(--lh-display)', color: 'var(--text-strong)', margin: '0 0 var(--sp-4)' }}>
            {featured.title}</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)',
            color: 'var(--text-body)', margin: '0 0 var(--sp-5)' }}>{featured.excerpt}</p>
          <MetaLine author={featured.author} date={featured.date} readTime={featured.readTime} style={{ marginBottom: 'var(--sp-5)' }} />
          <Button variant="primary" onClick={() => onOpen(featured)}>Ler a meditação</Button>
        </div>
      </section>

      {/* Filter + grid */}
      <SectionHeading overline="Meditações" title="Últimas reflexões" style={{ marginBottom: 'var(--sp-5)' }} />
      <TagFilter tags={window.PC_TAGS} active={active} onChange={setActive} style={{ marginBottom: 'var(--sp-7)' }} />
      {rest.length === 0
        ? <EmptyState icon="search-x" title="Nenhuma meditação com essa marca"
            message="Tente outra marca ou volte para todas as reflexões."
            action={<Button variant="secondary" onClick={() => setActive(null)}>Ver todas</Button>} />
        : <div style={{ display: 'flex', flexDirection: 'column' }}>
            {rest.map((p, i) => <PostCard key={p.id} {...p} layout="row" onClick={() => onOpen(p)}
              style={{ padding: 'var(--sp-6) 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-hair)' }} />)}
          </div>}
    </main>
  );
}
Object.assign(window, { HomeScreen });

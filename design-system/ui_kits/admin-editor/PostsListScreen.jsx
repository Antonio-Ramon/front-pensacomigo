// Admin posts list — table-ish list with status, meta counters, actions.
function PostsListScreen({ onEdit }) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const { Button, Badge, IconButton, ConfirmDialog } = NS;
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });
  const [posts, setPosts] = React.useState(window.ADMIN_POSTS);
  const [toDelete, setToDelete] = React.useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      <header style={{ background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hair)' }}>
        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 var(--gutter)', height: 64, display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-strong)' }}>
            Pensa <span style={{ color: 'var(--warm-600)' }}>comigo</span> · Admin</span>
          <div style={{ marginLeft: 'auto' }}><Button variant="primary" onClick={() => onEdit()}>Nova meditação</Button></div>
        </div>
      </header>

      <main style={{ maxWidth: 1080, margin: '0 auto', padding: 'var(--sp-7) var(--gutter)' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 600, letterSpacing: 'var(--tracking-heading)', color: 'var(--text-strong)', margin: '0 0 var(--sp-5)' }}>Meditações</h1>

        <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 90px 90px 80px', gap: 'var(--sp-4)', padding: 'var(--sp-3) var(--sp-5)',
            borderBottom: '1px solid var(--border-hair)', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', letterSpacing: '0.06em',
            textTransform: 'uppercase', color: 'var(--text-faint)', fontWeight: 600 }}>
            <span>Título</span><span>Status</span><span>Data</span><span>Views</span><span>Curtidas</span><span></span>
          </div>
          {posts.map((p, i) => (
            <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 90px 90px 80px', gap: 'var(--sp-4)',
              padding: 'var(--sp-4) var(--sp-5)', alignItems: 'center', borderBottom: i < posts.length - 1 ? '1px solid var(--border-hair)' : 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-wash)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{p.title}</span>
              <span><Badge tone={p.status === 'published' ? 'published' : 'draft'}>{p.status === 'published' ? 'Publicado' : 'Rascunho'}</Badge></span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)' }}>{p.date}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)' }}>{p.views.toLocaleString('pt-BR')}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)' }}>{p.likes}</span>
              <span style={{ display: 'flex', gap: 2 }}>
                <IconButton icon="pencil" label="Editar" size="sm" onClick={() => onEdit(p)} />
                <IconButton icon="trash-2" label="Excluir" size="sm" onClick={() => setToDelete(p)} />
              </span>
            </div>
          ))}
        </div>
      </main>

      <ConfirmDialog open={!!toDelete} tone="danger"
        title="Excluir meditação?"
        message={toDelete ? `“${toDelete.title}” será removida permanentemente. Esta ação não pode ser desfeita.` : ''}
        confirmLabel="Excluir" cancelLabel="Cancelar"
        onCancel={() => setToDelete(null)}
        onConfirm={() => { setPosts(posts.filter(x => x.id !== toDelete.id)); setToDelete(null); }} />
    </div>
  );
}
Object.assign(window, { PostsListScreen });

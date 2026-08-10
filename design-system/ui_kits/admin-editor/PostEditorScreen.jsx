// Two-column post editor screen with metadata sidebar.
function PostEditorScreen({ onExit }) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const { Button, Input, Textarea, Select, Tag, Avatar } = NS;
  const [tags, setTags] = React.useState(['Fé', 'Silêncio']);
  const [title, setTitle] = React.useState('O silêncio também é uma resposta');
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'var(--surface-card)', borderBottom: '1px solid var(--border-hair)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 var(--gutter)', height: 64, display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
          <button onClick={onExit} style={{ width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
            <i data-lucide="x" style={{ width: 20, height: 20 }}></i></button>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 'var(--fs-ui)', color: 'var(--text-strong)' }}>Editar meditação</span>
          <span style={{ marginLeft: 8, display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', color: 'var(--text-faint)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--warning-600)' }}></span>Rascunho salvo</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--sp-3)' }}>
            <Button variant="secondary" onClick={onExit}>Cancelar</Button>
            <Button variant="primary">Publicar</Button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'var(--sp-7) var(--gutter)',
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 340px', gap: 'var(--sp-8)', alignItems: 'start' }}>
        {/* Main column */}
        <div style={{ paddingLeft: 30 }}>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Título da meditação"
            style={{ width: '100%', border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-display)',
              fontSize: 'var(--fs-h1)', fontWeight: 700, letterSpacing: 'var(--tracking-display)', color: 'var(--text-strong)',
              marginBottom: 'var(--sp-6)', boxSizing: 'border-box' }} />
          <BlockEditor />
        </div>

        {/* Metadata sidebar */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)',
          background: 'var(--surface-card)', border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-lg)',
          padding: 'var(--sp-5)', position: 'sticky', top: 88 }}>
          <Input label="Slug" defaultValue="o-silencio-tambem-e-uma-resposta" />
          <Textarea label="Resumo" rows={3} defaultValue="A gente aprende a orar pedindo. Mas e quando a única oração possível é ficar quieto?" />
          <div>
            <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', fontWeight: 500, color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>Tags</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
              {tags.map(t => <Tag key={t} size="sm" onRemove={() => setTags(tags.filter(x => x !== t))}>{t}</Tag>)}
            </div>
            <Input placeholder="Adicionar tag…" />
          </div>
          <Input label="Data" type="text" defaultValue="12/07/2026" />
          <div>
            <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', fontWeight: 500, color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>Imagem de capa</span>
            <div style={{ border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', padding: 'var(--sp-5)', textAlign: 'center', background: 'var(--surface-wash)' }}>
              <i data-lucide="image" style={{ width: 22, height: 22, color: 'var(--accent-500)' }}></i>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', color: 'var(--text-muted)', marginTop: 6 }}>Arraste ou <span style={{ color: 'var(--accent-600)', fontWeight: 600 }}>envie uma imagem</span></div>
            </div>
          </div>
          <div>
            <span style={{ display: 'block', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', fontWeight: 500, color: 'var(--text-body)', marginBottom: 'var(--sp-2)' }}>Autor</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-md)', padding: '8px 12px' }}>
              <Avatar name="Antonio" size={30} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-strong)' }}>Antonio</span>
              <i data-lucide="chevron-down" style={{ width: 16, height: 16, color: 'var(--text-muted)', marginLeft: 'auto' }}></i>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
Object.assign(window, { PostEditorScreen });

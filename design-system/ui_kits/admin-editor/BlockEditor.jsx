// Block editor: reorderable list of text/image/link blocks, hover drag handle,
// action menu, + inserter with a 3-type picker, and a floating text toolbar.

function BlockToolbar() {
  const tools = [
    { icon: 'bold' }, { icon: 'italic' }, { icon: 'underline' }, { sep: true },
    { icon: 'link' }, { icon: 'quote' }, { icon: 'list' }, { icon: 'list-ordered' }, { icon: 'code' },
  ];
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, background: 'var(--ink-900)',
      borderRadius: 'var(--radius-md)', padding: '4px 6px', boxShadow: 'var(--shadow-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px 2px 4px', borderRight: '1px solid rgba(255,255,255,0.15)', marginRight: 2 }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#f0ece5' }}>Parágrafo</span>
        <i data-lucide="chevron-down" style={{ width: 13, height: 13, color: '#c9c2b6' }}></i>
      </div>
      {tools.map((t, i) => t.sep
        ? <span key={i} style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.15)', margin: '0 3px' }}></span>
        : <button key={i} style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer', color: '#e8e3da' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <i data-lucide={t.icon} style={{ width: 15, height: 15 }}></i></button>)}
    </div>
  );
}

function BlockShell({ children, active, onActivate, onRemove, onDup, dragProps }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={onActivate}
      style={{ position: 'relative', borderRadius: 'var(--radius-md)', padding: 'var(--sp-3) var(--sp-4)',
        border: `1px solid ${active ? 'var(--accent-500)' : 'transparent'}`,
        background: active ? 'var(--surface-card)' : 'transparent', transition: 'border-color var(--dur) var(--ease)' }}>
      <div {...dragProps} style={{ position: 'absolute', left: -30, top: 10, opacity: hover ? 1 : 0, cursor: 'grab',
        transition: 'opacity var(--dur) var(--ease)', color: 'var(--text-faint)' }}>
        <i data-lucide="grip-vertical" style={{ width: 18, height: 18 }}></i>
      </div>
      <div style={{ position: 'absolute', right: 8, top: 8, opacity: hover ? 1 : 0, display: 'flex', gap: 2, transition: 'opacity var(--dur) var(--ease)' }}>
        <button onClick={e => { e.stopPropagation(); onDup(); }} title="Duplicar"
          style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-hair)', borderRadius: 6, cursor: 'pointer', color: 'var(--text-muted)' }}>
          <i data-lucide="copy" style={{ width: 14, height: 14 }}></i></button>
        <button onClick={e => { e.stopPropagation(); onRemove(); }} title="Remover"
          style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--surface-card)', border: '1px solid var(--border-hair)', borderRadius: 6, cursor: 'pointer', color: 'var(--danger-600)' }}>
          <i data-lucide="trash-2" style={{ width: 14, height: 14 }}></i></button>
      </div>
      {children}
    </div>
  );
}

function Inserter({ onInsert }) {
  const [open, setOpen] = React.useState(false);
  const types = [
    { t: 'text', icon: 'type', label: 'Texto' },
    { t: 'image', icon: 'image', label: 'Imagem' },
    { t: 'link', icon: 'link', label: 'Link' },
  ];
  return (
    <div style={{ position: 'relative', height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseEnter={e => e.currentTarget.querySelector('.line').style.opacity = 1}
      onMouseLeave={e => { e.currentTarget.querySelector('.line').style.opacity = 0; setOpen(false); }}>
      <div className="line" style={{ position: 'absolute', left: 0, right: 0, height: 1, background: 'var(--accent-200,var(--border-strong))', opacity: 0, transition: 'opacity var(--dur) var(--ease)' }}></div>
      <button onClick={() => setOpen(!open)} style={{ position: 'relative', zIndex: 2, width: 26, height: 26, borderRadius: '50%',
        background: 'var(--accent-600)', border: 'none', color: 'var(--text-on-accent)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        <i data-lucide="plus" style={{ width: 15, height: 15 }}></i></button>
      {open && (
        <div style={{ position: 'absolute', top: 30, zIndex: 5, display: 'flex', gap: 4, background: 'var(--surface-card)',
          border: '1px solid var(--border-hair)', borderRadius: 'var(--radius-md)', padding: 6, boxShadow: 'var(--shadow-lg)' }}>
          {types.map(x => (
            <button key={x.t} onClick={() => { onInsert(x.t); setOpen(false); }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 72, padding: '10px 6px',
                background: 'transparent', border: '1px solid transparent', borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-body)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--surface-sunken)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <i data-lucide={x.icon} style={{ width: 18, height: 18, color: 'var(--accent-600)' }}></i>{x.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function BlockEditor() {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const { LinkPreview } = NS;
  const [blocks, setBlocks] = React.useState(window.INITIAL_BLOCKS);
  const [active, setActive] = React.useState('b1');
  React.useEffect(() => { if (window.lucide) lucide.createIcons(); });

  const insertAt = (i, type) => {
    const nb = { id: 'b' + Date.now(), type,
      ...(type === 'text' ? { html: '' } : type === 'image' ? { alt: '' } : { url: '', title: '', description: '', domain: '' }) };
    const copy = [...blocks]; copy.splice(i, 0, nb); setBlocks(copy); setActive(nb.id);
  };
  const remove = id => setBlocks(blocks.filter(b => b.id !== id));
  const dup = id => { const i = blocks.findIndex(b => b.id === id); const c = [...blocks]; c.splice(i + 1, 0, { ...blocks[i], id: 'b' + Date.now() }); setBlocks(c); };

  const renderBody = (b) => {
    if (b.type === 'text') return (
      <div>
        {active === b.id && <div style={{ marginBottom: 'var(--sp-3)' }}><BlockToolbar /></div>}
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)', lineHeight: 'var(--lh-body)',
          color: b.html ? 'var(--text-body)' : 'var(--text-faint)', margin: 0 }}>{b.html || 'Escreva o texto…'}</p>
      </div>
    );
    if (b.type === 'image') return (
      <div style={{ border: '2px dashed var(--border-strong)', borderRadius: 'var(--radius-md)', padding: 'var(--sp-6)',
        textAlign: 'center', background: 'var(--surface-wash)' }}>
        <i data-lucide="upload-cloud" style={{ width: 26, height: 26, color: 'var(--accent-500)' }}></i>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)', marginTop: 8 }}>
          Arraste uma imagem ou <span style={{ color: 'var(--accent-600)', fontWeight: 600 }}>procure no dispositivo</span></div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', color: 'var(--text-faint)', marginTop: 6 }}>Depois: crop, zoom e texto alternativo (alt)</div>
      </div>
    );
    return <LinkPreview url={b.url} title={b.title || 'Cole uma URL para buscar o preview'} description={b.description} domain={b.domain} />;
  };

  return (
    <div>
      {blocks.map((b, i) => (
        <React.Fragment key={b.id}>
          <Inserter onInsert={t => insertAt(i, t)} />
          <BlockShell active={active === b.id} onActivate={() => setActive(b.id)}
            onRemove={() => remove(b.id)} onDup={() => dup(b.id)} dragProps={{}}>
            {renderBody(b)}
          </BlockShell>
        </React.Fragment>
      ))}
      <Inserter onInsert={t => insertAt(blocks.length, t)} />
    </div>
  );
}
Object.assign(window, { BlockEditor });

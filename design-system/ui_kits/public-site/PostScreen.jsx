
// Post page: reading-first layout — progress bar, slim sidebar, continuity footer.
function ReadingProgress() {
  const [pct, setPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 2, zIndex: 40, background: 'transparent', pointerEvents: 'none' }}>
      <div style={{ height: '100%', width: pct + '%', background: 'var(--accent-600)', transition: 'width 90ms linear' }}></div>
    </div>
  );
}

function PostScreen({ post, onBack, onOpen }) {
  const NS = window.PensaComigoDesignSystem_3d6f1f;
  const { Tag, MetaLine, Avatar, Card, LinkPreview, Comment, Button, Textarea, Input, IconButton } = NS;
  const [likes, setLikes] = React.useState(214);
  const [liked, setLiked] = React.useState(false);
  const p = post || window.PC_POSTS[0];

  const related = window.PC_POSTS.filter(x => x.id !== p.id).slice(0, 2);

  return (
    <React.Fragment>
      <ReadingProgress />
      <main style={{ maxWidth: 'var(--container)', margin: '0 auto', padding: 'var(--sp-7) var(--gutter) 0' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'none',
          border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)',
          color: 'var(--text-muted)', marginBottom: 'var(--sp-5)', padding: 0 }}>
          <i data-lucide="arrow-left" style={{ width: 16, height: 16 }}></i> Voltar</button>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 240px', gap: 'var(--sp-8)', alignItems: 'start' }}>
          {/* Article */}
          <article>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h1)', fontWeight: 700,
              letterSpacing: 'var(--tracking-display)', lineHeight: 'var(--lh-heading)', color: 'var(--text-strong)', margin: '0 0 var(--sp-4)' }}>
              {p.title}</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-lede)', lineHeight: 'var(--lh-lede)',
              color: 'var(--text-body)', margin: '0 0 var(--sp-5)', maxWidth: 'var(--measure)' }}>{p.excerpt}</p>
            <MetaLine author={p.author} date={p.date} readTime={p.readTime} style={{ marginBottom: 'var(--sp-6)' }} />

            <div style={{ aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', background: 'var(--surface-wash)',
              border: '1px solid var(--border-hair)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--sp-7)' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-faint)' }}>imagem de capa 16:9</span>
            </div>

            <div style={{ maxWidth: 'var(--measure)', fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body)',
              lineHeight: 'var(--lh-body)', color: 'var(--text-body)' }}>
              <p style={{ margin: '0 0 var(--sp-5)' }}>A gente aprende a orar pedindo. Desde cedo nos ensinam a lista: agradecer, confessar, pedir. Mas há um tipo de oração que ninguém ensina — a que acontece quando não sobra nenhuma palavra.</p>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', fontWeight: 600,
                letterSpacing: 'var(--tracking-heading)', color: 'var(--text-strong)', margin: 'var(--sp-6) 0 var(--sp-3)' }}>Quando o pedido acaba</h2>
              <p style={{ margin: '0 0 var(--sp-5)' }}>Elias, depois do fogo e do vento, encontra Deus num "cicio tranquilo e suave". Não no espetáculo — no sussurro. Pensa comigo: e se boa parte da nossa ansiedade espiritual venha de esperar o trovão quando Deus escolheu o silêncio?</p>
              <blockquote style={{ margin: 'var(--sp-6) 0', paddingLeft: 'var(--sp-5)', borderLeft: '3px solid var(--warm-500)',
                fontStyle: 'italic', fontSize: '1.35rem', lineHeight: 1.5, color: 'var(--text-strong)' }}>
                "O silêncio não é a ausência de Deus. Às vezes é a forma mais alta da sua presença."</blockquote>
              <p style={{ margin: '0 0 var(--sp-5)' }}>Não estou defendendo a mudez espiritual, nem dizendo que pedir seja menor. Estou dizendo que o silêncio tem uma gramática própria, e que aprender essa gramática talvez seja parte do amadurecer da fé.</p>

              {/* Inline external link reference */}
              <LinkPreview url="https://youtube.com" domain="youtube.com" style={{ margin: 'var(--sp-6) 0' }}
                title="A oração contemplativa — uma introdução" description="Um ensaio em vídeo sobre a tradição do silêncio na espiritualidade cristã." />

              <p style={{ margin: '0 0 var(--sp-5)' }}>Então, da próxima vez que faltarem as palavras, tente não preencher o vazio. Fica. Escuta. Talvez a resposta já esteja ali — só que sem som.</p>
            </div>

            {/* Reactions + tags as plain text */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
              gap: 'var(--sp-4)', marginTop: 'var(--sp-7)', paddingTop: 'var(--sp-5)',
              borderTop: '1px solid var(--border-hair)', maxWidth: 'var(--measure)' }}>
              <button onClick={() => { setLiked(!liked); setLikes(likes + (liked ? -1 : 1)); }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: liked ? 'var(--warm-100)' : 'transparent',
                  border: '1px solid var(--border-strong)', borderRadius: 'var(--radius-pill)', padding: '8px 16px', cursor: 'pointer',
                  fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: liked ? 'var(--warm-700)' : 'var(--text-body)' }}>
                <i data-lucide="heart" style={{ width: 16, height: 16, fill: liked ? 'var(--warm-600)' : 'none' }}></i>
                {liked ? likes : 'Isso me tocou'}</button>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)' }}>
                Em <span style={{ color: 'var(--warm-700)' }}>{p.tags.join(', ')}</span></div>
            </div>

            {/* Comments */}
            <section style={{ marginTop: 'var(--sp-8)', maxWidth: 'var(--measure)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', fontWeight: 600, color: 'var(--text-strong)', margin: '0 0 var(--sp-5)' }}>2 comentários</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                <Comment name="Maria Clara" time="há 2 dias" onReply={() => {}}
                  replies={[{ name: 'Antonio', time: 'há 1 dia', children: 'Obrigado por ler com atenção, Maria. Esse "ficar" é mesmo o mais difícil.' }]}>
                  Isso me tocou. Passei a semana tentando entender por que a quietude me assustava tanto.</Comment>
                <Comment name="Rafael" time="há 3 dias" onReply={() => {}}>
                  Nunca tinha pensado no episódio de Elias assim. Vou reler com calma.</Comment>
              </div>

              <div style={{ marginTop: 'var(--sp-7)' }}>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui)', fontWeight: 600, color: 'var(--text-strong)', margin: '0 0 var(--sp-3)' }}>Deixe um comentário</h3>
                <Textarea placeholder="Escreva seu comentário…" rows={3} style={{ marginBottom: 'var(--sp-3)' }} />
                <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-3)' }}>
                  <Input placeholder="Seu nome" style={{ flex: 1 }} />
                </div>
                <Button variant="primary">Comentar</Button>
              </div>
            </section>
          </article>

          {/* Slim sidebar: author + share only */}
          <aside style={{ position: 'sticky', top: 92, display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
            <Card>
              <Avatar name={p.author} size={48} style={{ marginBottom: 'var(--sp-3)' }} />
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, color: 'var(--text-strong)' }}>{p.author}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-sm)', color: 'var(--text-muted)', marginBottom: 'var(--sp-3)' }}>Autor · Pensa comigo</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.6, color: 'var(--text-muted)', margin: 0 }}>
                Escreve meditações que preferem perguntas a respostas fáceis.</p>
            </Card>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', fontWeight: 600,
                letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 'var(--sp-3)' }}>Compartilhar</div>
              <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                <IconButton icon="link" label="Copiar link" variant="ghost" />
                <IconButton icon="mail" label="Enviar por e-mail" variant="ghost" />
                <IconButton icon="share-2" label="Compartilhar" variant="ghost" />
              </div>
            </div>
          </aside>
        </div>

        {/* Continuity footer — generous exit after the article */}
        <section style={{ marginTop: 'var(--sp-10)', paddingTop: 'var(--sp-7)', borderTop: '1px solid var(--border-hair)' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', fontWeight: 600,
            letterSpacing: 'var(--tracking-overline)', textTransform: 'uppercase', color: 'var(--warm)', marginBottom: 'var(--sp-3)' }}>Continue pensando</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h2)', fontWeight: 600,
            letterSpacing: 'var(--tracking-heading)', color: 'var(--text-strong)', margin: '0 0 var(--sp-6)' }}>Outras meditações</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 'var(--sp-6)' }}>
            {related.map(r => (
              <div key={r.id} onClick={() => onOpen && onOpen(r)} style={{ display: 'flex', gap: 'var(--sp-4)', cursor: 'pointer' }}>
                <div style={{ width: 96, height: 96, borderRadius: 'var(--radius-md)', background: 'var(--surface-wash)',
                  border: '1px solid var(--border-hair)', flexShrink: 0 }}></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-h3)', fontWeight: 600,
                    color: 'var(--text-strong)', lineHeight: 1.25, marginBottom: 6 }}>{r.title}</div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.55,
                    color: 'var(--text-muted)', margin: '0 0 8px' }}>{r.excerpt}</p>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 'var(--fs-ui-xs)', color: 'var(--text-faint)' }}>{r.date} · {r.readTime}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
Object.assign(window, { PostScreen, ReadingProgress });

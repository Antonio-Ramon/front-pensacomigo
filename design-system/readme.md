# Pensa Comigo — Design System

> **Pensa Comigo** — *"A fé que te obriga a pensar."*
> Blog cristão de meditações reflexivas. Tom contemplativo e convidativo — um convite ao pensar junto, nunca pregação de púlpito. Sereno, respirável, foco absoluto na leitura.

Stack alvo do produto: **React + Next.js**, Tailwind + shadcn/ui. Este design system é
independente de framework: tokens em CSS custom properties, componentes React puros.

---

## Sources / materiais recebidos

Nenhum codebase ou Figma foi fornecido. Recebemos a descrição da marca + notas de
direção visual detalhadas, e **5 imagens de referência de layout** em `uploads/`:

- `uploads/9e7a13b430f761a461ef84c77775c08f.webp` — **referência principal**: página
  pública de post (off-white, cards brancos, accent taupe, sidebar com bio/relacionados/
  tags/share, comentários com resposta + formulário). O nosso layout público segue esta.
- `uploads/f7ca5f5916439f69b5112e4d5cf4205d.webp` — editor de artigo em duas colunas
  (título, toolbar rich-text, conteúdo, sidebar de metadados: slug/excerpt/category/date/
  cover/author). Base funcional do editor admin.
- `uploads/smith_blog_post.webp` / `_640px.webp` — post longo "smith." (referência de
  ritmo de leitura, citações destacadas, imagens full-width, meta e reações).
- `uploads/original-6ae8b2be228b1999bd98d94efdfaed77.webp` — referência longa de post.

> ⚠️ As imagens de referência são **funcionais/de layout** — as cores corporativas azuis
> de algumas (ex.: editor smith.) **não** são a marca. A paleta é a do brief: creme +
> creme + teal, com terracota/areia como acento quente. Ref `9e7a13…` é uma variante.

### Substituições sinalizadas
- **Fontes**: nenhum arquivo de fonte foi fornecido. Usamos Google Fonts próximas do
  brief — **Newsreader** (display serifada com presença), **Source Serif 4** (corpo de
  leitura), **Instrument Sans** (UI/meta/botões). Carregadas via CDN em `tokens/fonts.css`.
  Envie os arquivos se quiser self-host / outra escolha.
- **Logo**: nenhum logo foi fornecido. Renderizamos o nome "Pensa comigo" em tipografia
  (display serif). Nenhum mark foi desenhado. Envie um logo se existir.
- **Ícones**: sem set próprio → usamos **Lucide** (via CDN), stroke fino e neutro,
  condizente com o tom sereno. Ver seção ICONOGRAPHY.

---

## CONTENT FUNDAMENTALS

**Voz.** Convidativa, na primeira pessoa do plural implícita ("Pensa *comigo*") — o autor
pensa *junto* com o leitor, não fala de cima. Reflexiva, honesta, sem certezas fáceis.
Faz perguntas em vez de dar respostas fechadas. Português do Brasil.

**Tratamento.** Trata o leitor por **você**, de forma calorosa e próxima. Evita jargão
teológico pesado; quando aparece um termo, é explicado com naturalidade.

**Tom.** Contemplativo, arejado, honesto. Nunca dogmático, nunca "vendedor", nunca
sensacionalista. A dúvida é bem-vinda; o convite é a pensar, não a concordar.

**Casing.** Títulos em *sentence case* com presença tipográfica (não ALL CAPS, não Title
Case forçado). Overlines/datelines curtas podem usar CAPS com tracking largo (ex.:
`MEDITAÇÃO · 8 MIN DE LEITURA`). Nome da marca aparece como "Pensa comigo" (só o P
maiúsculo) no header.

**Emoji.** Não. A identidade é textual e serena; emoji quebra o tom editorial.

**Exemplos de copy**
- Slogan: *"A fé que te obriga a pensar."*
- Título de post: *"O silêncio também é uma resposta"*
- Excerpt: *"A gente aprende a orar pedindo. Mas e quando a única oração possível é ficar
  quieto? Pensa comigo sobre o peso — e o alívio — do silêncio."*
- CTA newsletter: *"Receba uma meditação nova por semana. Sem pressa, sem ruído."*
- Estado vazio: *"Ainda não há meditações por aqui. A primeira reflexão está a caminho."*
- Botão primário: *"Publicar"*, *"Comentar"*, *"Ler a meditação"*.

---

## VISUAL FOUNDATIONS

**Mood.** Revista de ensaios, não blog de tecnologia. Editorial, contemplativo, muito
respiro. A página parece papel: quente, calma, com foco na coluna de texto.

**Cor.** Fundo da página **branco** (`--bg-page` `#ffffff`); **cards brancos** que se
distinguem por hairline (`--line-200`) + sombra sutil; texto em **cinza-quase-preto
quente** (`--ink-900` `#1e1c18`). A cor primária é um **teal** (`--accent-600` `#1f6560`,
família `#164B4A`/`#3B8D84`) — calma, meditação e foco — em botões, links e tags ativas.
Um **acento quente secundário** de **terracota + areia** (`--warm-600` `#6b4a2e`, `--warm-sand`
`#cdb693`) traz calor e esperança, usado com parcimônia (overlines de seção, destaques,
hover de tag). Status semânticos existem mas são **dessaturados** (verde-oliva, âmbar,
telha). Máximo 1–2 cores de fundo por tela. Zero gradientes chamativos.

**Tipografia.** Títulos em **Newsreader** serifada, peso 600–700, tracking levemente
negativo (`-0.02em`) — presença sem gritar. Corpo de leitura em **Source Serif 4** a
**19px / line-height 1.78** — leitura longa é o caso central. UI, meta, nav e botões em
**Instrument Sans** (grotesca neutra), 14–16px. Datelines/overlines em CAPS com tracking
`0.14em`.

**Espaçamento.** Generoso. Escala base 4px, mas seções respiram com `--sp-9` (96px).
Coluna de leitura limitada a **~680px** (`--measure`). Container do site 1200px.

**Fundos.** Sem imagens de fundo, sem texturas, sem padrões. Só o creme sólido, com
lavagem sutil `--surface-wash` para seções alternadas. Imagens (capas de post) são
**fotográficas, 16:9, cantos arredondados**, tom quente preferido; nunca full-bleed
agressivo — sempre dentro do container com respiro.

**Cantos.** Radii justos: cards e inputs `6px` (`--radius-md`), imagens `10px` (`--radius-lg`),
tags totalmente arredondadas (pílula `999px`).

**Bordas.** Hairlines de **1px** em cinza clarríssimo quente (`--line-200`). Inputs com
borda `--line-300`. Nunca bordas grossas.

**Sombras.** Muito sutis e quentes. Cards em repouso usam `--shadow-sm` ou apenas borda;
elevação no hover sobe para `--shadow-md`. Nunca sombras pesadas. Sem inner-shadows
exceto foco.

**Hover.** Links → escurecem para `--accent-700`. Botões primários → escurecem levemente.
Cards de post → elevam a sombra + título muda para accent, transição `200ms`. Tags →
fundo um tom mais forte. Sem mudança de escala em cards.

**Press.** Botões escurecem mais (`--accent-700`) e reduzem levemente (`transform:
scale(0.98)`). Sutil.

**Foco.** Anel de foco `--ring` (3px, accent a 28% de opacidade). Sempre visível para
teclado.

**Transparência / blur.** Uso mínimo. Header pode usar fundo creme a ~85% com
`backdrop-filter: blur(8px)` quando fixo. Fora isso, superfícies são sólidas.

**Cards.** Fundo branco-quente, radius `6–10px`, borda hairline `--line-200` **ou** `--shadow-sm`
(não os dois pesados juntos), padding generoso (`--sp-5`/`--sp-6`). Card de post: thumb
16:9 no topo, corpo com título + resumo + meta + tags pílula no rodapé.

**Animação.** Discreta. Fades e translações curtas (`120–320ms`) com easing
`cubic-bezier(0.4,0,0.2,1)`. Sem bounces, sem molas, sem parallax. O movimento nunca
compete com a leitura.

**Layout fixo.** Header pode ser sticky. Na página de post, sidebar direita é sticky no
desktop e vira seção no fim no mobile.

---

## ICONOGRAPHY

- **Sistema:** [Lucide](https://lucide.dev) via CDN (`lucide@latest`). Stroke fino
  (1.5–2px), cantos arredondados, estilo linear neutro — combina com o tom sereno.
  *Substituição sinalizada:* nenhum set de ícones foi fornecido pela marca.
- **Uso:** ícones são funcionais e discretos (busca, share, curtir, arrastar, +, menu,
  chevrons). Tamanho típico 18–20px, cor `--text-muted`, `--accent-600` quando ativos.
- **Sem iconografia religiosa literal** — nada de cruzes, pombas, vitrais ou clip-art. A
  identidade cristã vem do conteúdo e do tom, não de ícones.
- **Emoji:** não usados.
- **Redes sociais** (share): ícones de marca Lucide (`instagram`, `twitter`, `linkedin`,
  `facebook`).
- Ver `assets/icons.md` para a lista e a forma de carregar.

---

## Index / manifesto do root

- `styles.css` — entrypoint global (só `@import`s). Consumidores linkam este arquivo.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius-shadow.css`
- `guidelines/` — cards de especímen (Type, Colors, Spacing, Brand) para a aba Design System
- `components/` — primitivas React reutilizáveis (ver abaixo)
- `ui_kits/public-site/` — recreação da área pública (leitor)
- `ui_kits/admin-editor/` — recreação da área administrativa (editor de blocos)
- `assets/` — `icons.md` (não há logo/imagens próprias; placeholders nos kits)
- `SKILL.md` — wrapper para uso como Agent Skill

### Componentes
Button, IconButton, Tag, Input, Textarea, Select, Card, Badge, Avatar, SectionHeading,
Skeleton, EmptyState, ConfirmDialog, MetaLine, PostCard, TagFilter, LinkPreview, Comment.

### UI kits
- **public-site** — home (hero + grid), página de post (corpo + sidebar + comentários)
- **admin-editor** — editor de post em duas colunas com editor de blocos, lista de posts

---

*(Seções CONTENT FUNDAMENTALS, VISUAL FOUNDATIONS e ICONOGRAPHY acima respondem à
direção de marca. Atualize conforme o produto evolui.)*

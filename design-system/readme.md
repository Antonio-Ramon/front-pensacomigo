# Pensa Comigo — Design System

> **Pensa Comigo** — *"A fé que te obriga a pensar."*
> Blog de meditações bíblicas. Editorial, silencioso, régua de 1px. O leitor é tratado
> como alguém capaz de raciocinar, não como alguém que precisa ser acalmado.

Stack alvo: **React + Next.js**. O sistema é independente de framework: tokens em CSS
custom properties, componentes React puros, templates em HTML.

---

## Os três temas

Toda a identidade é temática. O documento declara `<html data-theme="…">` e **nada mais
muda**: os mesmos 12 primitivos existem nos três temas, e todo componente lê apenas as
variáveis semânticas.

| tema | uso | bg | primary | accent |
|---|---|---|---|---|
| **papel** (padrão) | leitura diurna, papel quente | `#FAF8F5` | índigo `#463C8C` | terracota `#C2643F` |
| **tinta** | leitura noturna, carvão frio | `#0F0F13` | lavanda `#A99DF2` | âmbar `#E9A263` |
| **terra** | sépia, impresso, arquivo | `#EFE7DB` | argila `#8A5334` | ardósia `#3D5A73` |

Primitivos por tema: `--bg --bg-alt --surface --ink --soft --faint --primary --on-primary
--accent --line --glow --mark` (+ `--primary-strong --primary-soft --accent-soft`,
estados semânticos e `--ring`). Aliases semânticos (`--text-strong`, `--surface-card`,
`--link` …) apontam para eles. **Nunca escreva um hex num componente.**

---

## CONTENT FUNDAMENTALS

**Voz.** Pensa *comigo*: o autor raciocina junto, não prega de cima. Parte sempre de uma
passagem específica, mostra o contexto e o termo original, e só então chega à terça-feira
comum do leitor. Não fecha o assunto com uma frase bonita.

**Tratamento.** Você. Português do Brasil. Jargão teológico só quando explicado.

**Casing.** Títulos em sentence case. Etiquetas, datas e comandos em **minúsculas mono**
com tracking largo (`meditações diárias · por antonio & jéssica`). O nome da marca
aparece como `pensa·comigo` no header.

**Emoji.** Não. Nem em reações — reações são frases ("Isso me ajudou 128").

**Exemplos de copy**
- Slogan: *"A fé que te obriga a pensar."*
- Título: *"Elias dormiu antes de ouvir a voz"*
- Dek: *"Antes da brisa suave, Deus mandou o profeta comer e descansar."*
- CTA: *"Começar por onde você está"* · *"abrir etapa →"* · *"arquivo completo →"*
- Vazio: *"Ainda não há meditações por aqui."*

---

## VISUAL FOUNDATIONS

**Mood.** Revista de ensaios com cheiro de terminal. Uma coluna de 940px, muito respiro,
hairlines por toda parte, cantos retos em tudo, e um único dispositivo lúdico: o **terminal de versículo**.

**Cor.** Um fundo, uma superfície, uma linha. `--primary` carrega ação e a capitular;
`--accent` carrega referências bíblicas, marcações e a seta que avança no hover. Máximo
duas cores de fundo por tela; zero gradientes além do brilho radial do hero (`--glow`).

**Tipografia.** **Newsreader** para títulos (400) e para a prosa (300 a 18.5px/1.78,
capitular de 3.15em em `--primary`). **Inter Tight** para interface (13–16px).
**JetBrains Mono** para eyebrows, datas, refs, tags e comandos (10–12.5px).

**Espaçamento.** Escala 4px até 96px. Coluna de leitura 64ch, site 940px, rail 190px.

**Bordas e superfícies.** 1px em `--line` é a hierarquia. Grades (trilha, passagens) são
feitas com `gap:1px` sobre fundo `--line`, não com bordas por célula. Sombra só em modal.

**Cantos.** Nenhum. `border-radius:0` em tudo — botões, campos, chips, tags, cards, avatares e miniaturas são retângulos exatos (referência herdr.dev).

**Movimento.** 150–350ms em `cubic-bezier(.22,.9,.3,1)`. A linha do arquivo troca de
fundo e a seta avança 12px; nada escala, nada quica.

**Imagens.** Fotografias reais, **escolhidas pelo autor do post** — a capa e imagens no
meio do texto (`PostImage` / `<figure>` na prosa). Sempre com hairline de 1px, cantos
retos e legenda mono. Sem imagem definida, renderiza o placeholder listrado com
etiqueta mono — nunca banco de imagens genérico.

---

## ICONOGRAPHY

- [Lucide](https://lucide.dev) via CDN, stroke 1.5–2px, 16–20px, cor `--soft`.
  *Substituição sinalizada:* a marca não forneceu set próprio.
- Sem iconografia religiosa literal (cruzes, pombas, vitrais). Sem emoji.
- Setas e marcadores são **caracteres mono** (`→`, `›`, `>`), não ícones.

---

## Index

- `styles.css` — entrypoint (só `@import`s). Consumidores linkam este arquivo.
- `tokens/` — `fonts.css`, `colors.css` (os 3 temas), `typography.css`, `spacing.css`,
  `radius-shadow.css`, `base.css`
- `guidelines/` — cards de especímen: temas papel/tinta/terra, tipo, layout, superfícies, marca
- `components/core/` e `components/editorial/` — primitivas React
- `templates/blog-home/`, `templates/blog-post/` — pontos de partida completos
- `assets/icons.md` — como carregar Lucide
- `SKILL.md` — wrapper para uso como Agent Skill

### Components

**Core** — Avatar, Badge, Button, Card, Chip, ConfirmDialog, EmptyState, Eyebrow,
IconButton, Input, Select, SectionHeading, Skeleton, Tag, Textarea, ThemeSwitcher.

**Editorial** — ApplyList, AuthorBox, Comment, MetaLine, MoodChips,
NewsletterCTA, Pager, PostImage, PostRow, Prose, Reactions, StageCard, StudyNote,
TocRail, VerseBlock, VerseTerminal.

### Templates
- **Blog — home**: hero, filtro de estado com terminal de versículo, trilha de 4 etapas,
  arquivo em linhas, newsletter.
- **Blog — meditação**: capa do autor, coluna de leitura com capitular, rail fixo com
  índice e controles de texto, aplicação, reações, autor, paginação.

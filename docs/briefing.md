# Pensa Comigo — Briefing do Produto

> **"A fé que te obriga a pensar."**

**Versão:** 2.0 · **Data:** 17/08/2026 · **Autores:** Antonio Ramon Alves Silva & Jéssica Rose

> A v2 substitui a v1 após auditoria contra o backend real (`../service-pensacomigo`, MVP
> completo). As divergências foram resolvidas em grilling de arquitetura — cada mudança de
> backend virou issue lá; o que era promessa da v1 sem lastro no código foi corrigido aqui.
> Regras de negócio que o front precisa respeitar: ver `CONTEXT.md` na raiz.

---

## 1. Visão do Produto

### 1.1 O que é

**Pensa Comigo** é um blog autoral cristão dedicado a meditações reflexivas — textos que se
aproximam de pregações escritas, mas com tom contemplativo e convidativo. O nome carrega a
proposta: não é um púlpito que fala de cima para baixo, é um convite ao pensar junto.

### 1.2 Para quem

- **Leitores:** pessoas que buscam conteúdo devocional com substância intelectual.
- **Autores:** dois administradores (Antonio Ramon e Jéssica Rose), definidos por seed no
  backend; novos autores entram por seed/migration, não por cadastro.

### 1.3 Proposta de valor

- Conteúdo devocional editorial, com experiência de leitura impecável
- Editor de publicação em blocos (texto rico, imagens ajustadas, links com preview)
- Interação leve dos leitores: comentários, curtidas e visualizações — sem cadastro

---

## 2. Identidade

A identidade está **implementada** no design system do repo (`design-system/`): três temas
(`papel` diurno, `tinta` noturno, `terra` sépia), tokens semânticos (`--bg`, `--ink`,
`--primary`, `--accent`...), Newsreader para títulos e leitura, Inter Tight para interface,
JetBrains Mono para etiquetas e referências bíblicas. Cantos retos, bordas de 1px em vez de
sombra, sem iconografia religiosa literal, sem gradiente (exceto o glow do hero), sem emoji.

O design system é a fonte de verdade visual — este briefing não a duplica. Ver
`design-system/readme.md` e os protótipos navegáveis em `ui-reference/`.

---

## 3. Funcionalidades

### 3.1 Área pública (leitores)

**Home / Listagem**
- Hero com post em destaque; grid responsivo de cards
- Card: capa, título, resumo, tags em pílula, autor, data, tempo de leitura
- O **resumo é derivado no front**: ~160 caracteres do primeiro bloco de texto, sem HTML.
  Não existe campo de resumo no backend (decisão registrada — o preview de compartilhamento
  mostra o começo do post)
- Filtro por tag e busca por título via Gridify (`filter=tag=oracao`, `filter=titulo=*termo`)

**Página de meditação**
- Título, resumo derivado, linha de metadados (autor com foto, data, tempo de leitura)
- Capa larga; corpo renderizado do array de blocos
- Sidebar (desktop): bio do autor (**constante no front**, `lib/autores.ts`), posts
  relacionados (**feed filtrado pela primeira tag do post**, `pageSize=3`), tags,
  compartilhamento (Web Share API)
- Curtir/descurtir anônimo (dedup por `viewer_hash` no servidor) e contador de visualizações
  (incrementado pela API na abertura por slug)
- SEO completo: `generateMetadata` por post, Open Graph com capa

**Comentários — moderação pós-publicação**
- Leitor comenta com nome + conteúdo, sem cadastro
- O comentário **nasce visível**. As barreiras automáticas são do backend: rate limit de
  5/min por visitante (429) e filtro de palavrão
- Um único nível de resposta (resposta de resposta → 422)
- Admin **oculta ou apaga** depois — não existe fila de aprovação prévia

### 3.2 Área administrativa (autores)

**Autenticação — conduzida 100% pelo backend** ([service-pensacomigo#17](https://github.com/Antonio-Ramon/service-pensacomigo/issues/17))
- O front não integra com o Google: redireciona para a rota de login da API, que faz o
  fluxo OAuth completo (consent, callback, allowlist) e devolve **sessão em cookie
  httpOnly/secure/sameSite** emitido pela própria API
- O browser fala **direto com a API** (`credentials: 'include'`), sem BFF/proxy no Next
- Requisito de deploy: front e API sob o **mesmo domínio raiz**
- **A área admin do front está bloqueada até a #17 sair.** A área pública é anônima e
  independe dela

**Gestão de posts**
- Lista com status **rascunho/publicado** ([#20](https://github.com/Antonio-Ramon/service-pensacomigo/issues/20)), data, contadores, editar/excluir
- Editor em duas colunas: título + blocos na principal; na coluna de metadados: **capa
  (upload), tags (chips com autocomplete via `GET /tags`), status**. O slug aparece como
  informação, **não é editável** (gerado do título e congelado pelo backend); data e autor
  também não são editáveis (banco e claim do JWT, respectivamente)

**Editor de blocos**
- Lista vertical reordenável por drag-and-drop (`@dnd-kit/sortable`); "+" entre blocos,
  alça, duplicar/remover
- **Bloco de texto:** Tiptap emitindo **HTML** restrito à whitelist do `CONTEXT.md` —
  parágrafo, H2/H3, negrito, itálico, sublinhado, tachado, links, listas, citação, código
  inline, destaque (`mark`), sobrescrito/subscrito, separador — mais dois nodes customizados
  do design system: **Versículo** (`div.verse` com referência mono + citação serifada) e
  **nota lateral** (`div.aside`). Sem tabela, sem imagem inline (imagem é bloco)
- **Bloco de imagem:** drag-and-drop, crop com zoom/proporção (`react-easy-crop`), conversão
  WebP no browser (`canvas.toBlob(..., 'image/webp', 0.85)`), alt — o blob sobe **direto**
  para `POST /api/v1/imagens` (máx. 5 MB; jpg/jpeg/png/webp), que devolve `{ path, url }`
- **Bloco de link:** ao colar a URL, o front chama o endpoint de preview OG do backend
  ([#21](https://github.com/Antonio-Ramon/service-pensacomigo/issues/21)) e preenche
  título/descrição/thumbnail/siteName no bloco

**Moderação de comentários**
- Lista de comentários publicados (filtrável por post) com ações **ocultar** (`PATCH
  .../ocultar`) e **apagar** (`DELETE`) — exigem claim `is_admin`

### 3.3 Modelo de conteúdo (contrato real do backend)

O corpo do post é um array ordenado de blocos em `jsonb`. O bloco é **flat**: todos os
campos coexistem e `tipo` (enum numérico) diz quais valem. Serialização camelCase.

```ts
type Bloco = {
  id: string;                 // guid
  tipo: 0 | 1 | 2;            // 0 Texto · 1 Imagem · 2 Link
  ordem: number;              // informativo — a ordem efetiva é a do array
  // tipo 0
  html?: string;              // sanitizado pelo backend na escrita (#18)
  // tipo 1
  imagemPath?: string; imagemUrl?: string; alt?: string; aspectRatio?: number;
  // tipo 2
  linkUrl?: string; linkTitulo?: string; linkDescricao?: string;
  linkThumbnail?: string; linkSiteName?: string;
}
```

Coerência validada na escrita (422 com índice): texto→`html`, imagem→`imagemPath`,
link→`linkUrl`.

---

## 4. Arquitetura Técnica

### 4.1 Visão geral

| Camada | Tecnologia |
| :--- | :--- |
| **Backend** | .NET 10, Clean Architecture + CQRS (MediatR 14), EF Core 10 + Npgsql, FluentValidation 12, Gridify, Swagger — **MVP completo** |
| **Banco** | PostgreSQL (Supabase), blocos em `jsonb` |
| **Storage** | Supabase Storage via `POST /api/v1/imagens` (service key só no .NET) |
| **Frontend** | React + Next.js (App Router) + **componentes próprios criados no app** (`src/components/ui/`), com `design-system/` e `ui-reference/` apenas como referência visual — sem Tailwind, sem shadcn/ui |
| **Autenticação** | Google OAuth conduzido pela API → cookie httpOnly da API (#17) |

### 4.2 Backend

Ver `../service-pensacomigo/README.md` e `docs/architecture-pensa-comigo.md` — o backend
documenta a si mesmo; este briefing não duplica. Pontos que moldam o front:

- Rotas sob `/api/v1`; listagens no envelope `{ items, totalItems }` com Gridify
  (whitelist por entidade); erros no envelope `{ successed, message, notifications[] }`
  com `notifications[].key` por campo
- Escrita de post de outro autor devolve **404** (não 403); moderação exige `is_admin`
- Visitante anônimo identificado por `viewer_hash` (HMAC de IP + User-Agent no servidor) —
  o front não gerencia identidade de leitor

**Issues abertas que o front espera:**

| Issue | O quê | Bloqueia |
| :--- | :--- | :--- |
| [#17](https://github.com/Antonio-Ramon/service-pensacomigo/issues/17) | OAuth completo no backend + sessão por cookie | Toda a área admin |
| [#18](https://github.com/Antonio-Ramon/service-pensacomigo/issues/18) | Sanitização de `Bloco.Html` (whitelist do `CONTEXT.md`) | Nada (defesa em profundidade) |
| [#19](https://github.com/Antonio-Ramon/service-pensacomigo/issues/19) | Tags + autor no DTO do feed | Card completo da home |
| [#20](https://github.com/Antonio-Ramon/service-pensacomigo/issues/20) | Status Rascunho/Publicado + DataPublicacao | Fluxo de rascunho no editor |
| [#21](https://github.com/Antonio-Ramon/service-pensacomigo/issues/21) | Preview OG para bloco de link | Preview automático no editor |

### 4.3 Frontend (Next.js)

**Renderização**
- Público: Server Components + ISR; `generateMetadata` (SEO/OG); `generateStaticParams`
- Admin (`/admin/*`): Client Components, `noindex`

**Dados e estado**
- **Tipos gerados do Swagger:** `openapi-typescript` → `src/types/api.d.ts`, commitado;
  script `npm run api:types` contra a API local. Mudou contrato → regenera → `tsc` acusa
- Leitura pública: `fetch` nativo com cache do Next
- Client (admin + curtir/comentar): **TanStack Query**
- Editor de blocos: `useReducer`
- Formulários: **estado controlado simples — sem react-hook-form, sem zod.** A validação
  mora no backend; o front pinta o 422 por campo via `notifications[].key`

**UI:** componentes **criados do zero** no app (`src/components/ui/`), sob demanda por fase —
`design-system/` e `ui-reference/` são **referência visual, nunca importados**. Tokens
semânticos dos três temas reescritos em `src/styles/tokens.css` (valores transcritos da
identidade); CSS Modules por componente; fontes via `next/font`. `Prose` renderiza o HTML
dos blocos de texto.

### 4.4 Estrutura de pastas

```
src/
├── app/
│   ├── (public)/        # home, [slug], tags/[tag]
│   ├── admin/           # posts (lista/novo/editar), comentarios — bloqueado pela #17
│   └── login/
├── styles/
│   └── tokens.css       # 3 temas (papel/tinta/terra) reescritos do zero
├── components/
│   ├── ui/              # primitivos próprios: Button, Card, Badge, Input...
│   ├── blog/            # composições públicas: PostCard, Hero, Prose, Verse, Aside
│   ├── editor/          # EditorBlocos, BlocoTexto, BlocoImagem, BlocoLink
│   └── layout/          # Header, Footer, ThemeSwitcher
├── lib/                 # api client, autores.ts (bio), resumo.ts (derivação)
├── types/               # api.d.ts (gerado do Swagger)
└── hooks/
middleware.ts            # gate do /admin (forma final depende da #17)
```

---

## 5. Decisões Registradas

| # | Decisão | Justificativa |
| :--- | :--- | :--- |
| 1 | PostgreSQL + Supabase (banco/storage) | `jsonb` nativo; infra gerenciada gratuita |
| 2 | Sem senhas — 100% Google OAuth | Menos superfície de ataque |
| 3 | Bloco flat com campos opcionais | Serialização trivial jsonb ↔ TypeScript |
| 4 | Views como coluna incrementada | Simplicidade; atômico no banco |
| 5 | Likes com `(post_id, viewer_hash)` único | Dedup sem cadastro |
| 6 | Comentários com 1 nível, **pós-moderação** | Rate limit + filtro de palavrão barram abuso; ocultar é reversível; fila prévia mataria a conversa |
| 7 | Next.js (não SPA) | SEO e Open Graph exigem SSR |
| 8 | **Bloco de texto em HTML sanitizado no backend** (#18) | Backend já grava HTML; sanitizar na escrita fecha o XSS sem migration. Substitui a decisão v1 "Tiptap com JSON" |
| 9 | **Whitelist única de HTML** (fonte: `CONTEXT.md`) | Editor, sanitizador e CSS derivam da mesma lista — nada perigoso entra, nada escrito se perde, tudo tem estilo |
| 10 | **Backend conduz o OAuth; cookie httpOnly da API** (#17) | Front não toca em token; substitui a v1 "front obtém id_token" |
| 11 | **Browser → API direto, sem BFF** | Uma camada a menos; exige mesmo domínio raiz |
| 12 | **Upload direto para `POST /imagens`** | Uma rota, uma service key, uma validação. Substitui a v1 "Route Handler do Next" |
| 13 | **Resumo derivado no front** | Sem migration; custo aceito: og:description = começo do post |
| 14 | **Rascunho/Publicado no backend** (#20) | Dois autores se revisam; localStorage não cobre |
| 15 | **Bio hardcoded no front** | 2 autores com acesso ao repo; vira coluna quando entrar autor sem commit |
| 16 | **Componentes próprios criados no app, sem Tailwind/shadcn** | `design-system/` e `ui-reference/` são só referência visual; o código de UI nasce em `src/` escrito para o app |
| 17 | **Tipos gerados do Swagger, commitados** | Contrato vem do backend; a v1 (tipos à mão) foi como o briefing acumulou 9 divergências |
| 18 | **Sem RHF/zod — 422 da API por campo** | Espelhar FluentValidation em zod é segunda fonte de verdade que deriva |
| 19 | Session pooler 5432 p/ migrations, 6543 runtime | Conforme backend real |

---

## 6. Infraestrutura e Operação

- Supabase Free: 500 MB banco, 1 GB storage — suficiente com WebP
- Pause por inatividade (~7 dias): ping agendado (GitHub Actions/Uptime Robot)
- Sem backup automático no free: dump periódico via GitHub Actions
- Segredos: User Secrets (dev) / env vars (prod); nada no Git
- **Deploy: front e API sob o mesmo domínio raiz** (requisito da decisão 11); hosting a
  definir na fase de deploy

---

## 7. Roadmap

### Backend (`service-pensacomigo`) — MVP completo ✅

Auth (login com id_token), Posts (CRUD + feed + slug + tempo de leitura), Tags, Comentários
(anônimo + rate limit + filtro + moderação), Curtidas (idempotente), Imagens (upload),
Views (atômico). Pendências = issues #17, #18, #19, #20, #21.

### Frontend (este repo)

| Fase | Entrega | Depende de |
| :--- | :--- | :--- |
| 1 | Setup Next.js + tokens e base de UI própria + geração de tipos do Swagger | — |
| 2 | Rotas públicas: home (feed, filtro, busca), post (blocos, Prose), ISR + SEO/OG | #19 (card completo) |
| 3 | Comentários, curtidas e views na página do post | — |
| 4 | Login + gate do admin | **#17** |
| 5 | Admin: lista de posts + moderação de comentários | #17 |
| 6 | Editor de blocos (dnd-kit + Tiptap com nodes Versículo/aside + crop/WebP + preview de link) | #17, #20, #21 |
| 7 | Deploy sob domínio compartilhado + ping anti-pause | fases 1–6 |

Ordem de construção: **público primeiro** (fases 1–3 não dependem de auth), admin depois.

---

## 8. Glossário

| Termo | Significado |
| :--- | :--- |
| **Bloco** | Unidade de conteúdo do post (texto, imagem ou link), reordenável |
| **Versículo** | Node do editor / padrão `div.verse` do design system: citação bíblica com referência em mono |
| **Nota lateral** | Node do editor / padrão `div.aside`: comentário do autor à margem do texto |
| **ISR** | Incremental Static Regeneration |
| **viewer_hash** | HMAC (IP + User-Agent) calculado no servidor; identifica o leitor anônimo para dedup de curtida e rate limit |
| **Envelope** | Formatos padrão da API: `{ items, totalItems }` (listas) e `{ successed, message, notifications[] }` (erros) |

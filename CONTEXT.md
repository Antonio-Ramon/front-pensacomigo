# CONTEXT — front-pensacomigo

Regras que o Swagger não conta. O contrato de tipos vem gerado da API (`src/types/api.d.ts`);
este arquivo guarda o que é **regra de negócio e acordo entre repos**. Produto e decisões:
`docs/briefing.md` (v2). Backend: `../service-pensacomigo` (README + `docs/`).

## Whitelist de HTML do bloco de texto (fonte canônica)

O editor Tiptap emite, o sanitizador do backend ([#18](https://github.com/Antonio-Ramon/service-pensacomigo/issues/18))
permite, e o CSS do `Prose` estiliza **exatamente** esta lista. Tag nova = mudar os três
juntos (cada tag nova é superfície de XSS e de CSS quebrado).

- **Estrutura:** `p`, `h2`, `h3`, `blockquote`, `ul`, `ol`, `li`, `hr`
- **Inline:** `strong`, `em`, `u`, `s`, `code`, `mark`, `a` (só `href` http/https e `title`), `sup`, `sub`, `br`
- **Padrões do design system** (único uso permitido de `class`):
  - Versículo: `div.verse` > `div.r` (referência) + `q` (texto)
  - Nota lateral: `div.aside` (com `b` para o rótulo)
- **Banido:** qualquer outra classe, `style`, `id`, `on*`, `img`, `iframe`, `table`,
  `script`. Imagem e embed **são blocos** (tipo 1 e 2), nunca HTML inline.

## Regras da API que não estão no schema

- **Slug é congelado**: gerado do título na criação, nunca muda. No editor é informativo.
- **Data e autor não são editáveis**: banco (`now()`) e claim do JWT.
- **Resposta de resposta é proibida** (1 nível): a API devolve 422.
- **Comentário nasce visível** (pós-moderação). Barreiras: rate limit 5/min por visitante
  (429) e filtro de palavrão. Admin oculta (`PATCH .../ocultar`) ou apaga (`DELETE`).
- **404 em vez de 403** ao escrever em post de outro autor — não trate 404 como "não existe"
  no admin sem considerar "não é seu".
- **Moderação exige claim `is_admin`** → 403 sem ela.
- **Curtida é idempotente** por `viewer_hash` (calculado no servidor; o front não gerencia
  identidade de leitor — só chama `POST`/`DELETE /posts/{id}/curtidas`).
- **`GET /posts/{slug}` incrementa visualizações** — cuidado com prefetch/revalidação
  agressiva inflando o contador.
- **Listagens**: envelope `{ items, totalItems }`; Gridify com whitelist por entidade
  (posts: `titulo`, `slug`, `autor`, `tag`, `dataCriacao`). Busca: `filter=titulo=*termo`.
- **Erros**: envelope `{ successed, message, notifications: [{ key, message }] }` — pintar
  `notifications` por campo nos formulários (não há zod/RHF; a validação mora no backend).
- **Upload**: `POST /api/v1/imagens` multipart, máx. 5 MB, jpg/jpeg/png/webp; devolve
  `{ path, url }` — `path` vai no bloco/capa, `url` é exibição.
- **Bloco flat**: `tipo` numérico (0 texto, 1 imagem, 2 link); coerência na escrita
  (texto→`html`, imagem→`imagemPath`, link→`linkUrl`, senão 422 com índice). O campo
  `ordem` é informativo — a ordem efetiva é a do array.

## Decisões de arquitetura do front (grilling 17/08/2026)

1. Bloco de texto é **HTML sanitizado no backend** (#18) — não ProseMirror JSON.
2. **Resumo derivado no front**: ~160 chars do primeiro bloco de texto, sem HTML
   (`lib/resumo.ts`). Não existe campo no backend.
3. **Bio do autor hardcoded** em `lib/autores.ts`; vira coluna quando entrar autor sem
   acesso ao repo.
4. **Posts relacionados** = feed filtrado pela primeira tag (`?filter=tag=X&pageSize=3`).
5. **Auth conduzida pelo backend** ([#17](https://github.com/Antonio-Ramon/service-pensacomigo/issues/17)):
   cookie httpOnly da API; browser chama a API **direto** (`credentials: 'include'`), sem
   BFF. Requisito: front e API no mesmo domínio raiz. **Admin bloqueado até a #17.**
6. **UI = componentes próprios criados no app** (`src/components/ui/`); `design-system/` e
   `ui-reference/` são **apenas referência visual, nunca importados**. Sem Tailwind, sem shadcn.
7. **Tipos gerados do Swagger** (`npm run api:types`), commitados.
8. **TanStack Query** no client; **sem react-hook-form, sem zod**.
9. Editor: `@dnd-kit/sortable` + Tiptap (whitelist acima + nodes Versículo/aside) +
   `react-easy-crop` + WebP no browser.

## Issues do backend que o front espera

| | O quê | Bloqueia no front |
|---|---|---|
| [#17](https://github.com/Antonio-Ramon/service-pensacomigo/issues/17) | OAuth completo + cookie de sessão | Área admin inteira |
| [#18](https://github.com/Antonio-Ramon/service-pensacomigo/issues/18) | Sanitização de `Bloco.Html` | Nada (defesa em profundidade) |
| [#19](https://github.com/Antonio-Ramon/service-pensacomigo/issues/19) | Tags + autor no DTO do feed | Card completo da home |
| [#20](https://github.com/Antonio-Ramon/service-pensacomigo/issues/20) | Rascunho/Publicado + DataPublicacao | Fluxo de rascunho no editor |
| [#21](https://github.com/Antonio-Ramon/service-pensacomigo/issues/21) | Preview OG de link | Preview automático no bloco de link |

Ordem de construção: público primeiro (fases 1–3 do roadmap), admin depois.

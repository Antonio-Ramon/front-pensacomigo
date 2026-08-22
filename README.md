<h1 align="center">Pensa Comigo — Front</h1>

<p align="center"><em>“A fé que te obriga a pensar.”</em></p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white">
  <img alt="CSS Modules" src="https://img.shields.io/badge/CSS%20Modules-sem%20Tailwind-1572B6?logo=css3&logoColor=white">
  <img alt="Backend" src="https://img.shields.io/badge/API-.NET%2010%20%2B%20PostgreSQL-512BD4?logo=dotnet&logoColor=white">
  <img alt="Status" src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow">
</p>

Front do blog de meditações cristãs **Pensa Comigo**: textos contemplativos, leitura sem
ruído, e uma área de administração (a *escrivaninha*) onde o post é montado em blocos.

## Sumário

- [Stack](#stack)
- [Como rodar](#como-rodar)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Estrutura](#estrutura)
- [Rotas](#rotas)
- [Backend](#backend)
- [Convenções](#convenções)
- [Documentação](#documentação)

## Stack

| Camada | Escolha | Por quê |
|---|---|---|
| Framework | Next.js 16 (App Router, Server Components, Server Actions) | render no servidor, cache por rota |
| UI | componentes próprios em `src/components/ui/` + CSS Modules | sem Tailwind, sem shadcn |
| Ícones | `lucide-react` | |
| Imagem | `react-image-crop` + conversão WebP no browser | corte de capa antes do upload |
| Tipos da API | `openapi-typescript` a partir do Swagger, commitados | contrato não se infere, se gera |

Sem gerenciador de estado, sem `react-hook-form`, sem `zod`: a validação mora no backend e
volta no envelope de erro (`notifications`), que os formulários pintam por campo.

## Como rodar

Requer **Node 20+** e o backend rodando em `../service-pensacomigo` (ou uma `API_URL` que aponte para ele).

```bash
git clone https://github.com/Antonio-Ramon/front-pensacomigo.git
cd front-pensacomigo
npm install
cp .env.example .env      # ajuste as URLs
npm run dev               # http://localhost:3000
```

## Variáveis de ambiente

| Variável | Obrigatória | O que é |
|---|---|---|
| `API_URL` | sim | URL da API usada **no servidor** (dev: `http://localhost:5001`) |
| `NEXT_PUBLIC_API_URL` | sim | mesma API, chamada **pelo browser** (curtida e comentário). Precisa estar liberada no CORS do backend |
| `NEXT_PUBLIC_STORAGE_URL` | sim em prod | base pública do Supabase Storage, para montar a URL da imagem a partir do `path` gravado |
| `NEXT_PUBLIC_SITE_URL` | não | URL pública do site (SEO/OG); em dev pode ficar vazia |

## Scripts

```bash
npm run dev         # dev server (Turbopack)
npm run build       # build de produção
npm start           # serve o build
npm run api:types   # regenera src/types/api.d.ts do Swagger (backend precisa estar de pé)
```

## Estrutura

```
src/
  app/
    (public)/        # home, /meditacoes, /tags/[tag], /[slug]
    escrivaninha/    # área admin: lista, editor de blocos, moderação de comentários
    api/sessao/      # única route handler: diz se o visitante é admin (não derruba o cache do header)
  components/
    blog/            # Prose, Curtidas, Comentarios, TocRail, ProgressoLeitura
    layout/          # Header, Footer, ThemeSwitcher, NewsletterCTA
    ui/              # Toaster, ConfirmDialog, CortadorImagem, EmptyState
  lib/               # api.ts, api-admin.ts, toast.ts, imagens.ts, datas.ts, resumo.ts
  styles/            # tokens.css (design tokens) e prose.css (HTML do post)
  types/api.d.ts     # gerado do Swagger
design-system/       # referência visual — nunca importado pelo app
ui-reference/        # protótipos HTML — idem
```

## Rotas

| Rota | O que faz |
|---|---|
| `/` | home com o feed de meditações |
| `/meditacoes` | listagem paginada + busca |
| `/tags/[tag]` | feed filtrado pela tag |
| `/[slug]` | post (incrementa visualizações no GET), curtidas e comentários |
| `/escrivaninha` | lista de posts do autor, busca e exclusão |
| `/escrivaninha/editor` · `/editor/[id]` | editor de blocos (texto, imagem, link) |
| `/escrivaninha/comentarios/[id]` | moderação: ocultar ou apagar |

## Backend

A API vive em [`service-pensacomigo`](https://github.com/Antonio-Ramon/service-pensacomigo)
(.NET 10 + EF Core + PostgreSQL/Supabase, Clean Architecture + CQRS), repo irmão na mesma
pasta. **Ao mexer em contrato — endpoints, DTOs, filtro/ordenação/paginação, formato de erro
— leia o README e o `docs/` de lá em vez de inferir pelo front.**

Detalhes que valem lembrar (o resto está em [`CONTEXT.md`](CONTEXT.md)):

- Autenticação é conduzida pelo backend: cookie `httpOnly` da API, browser chamando a API
  direto com `credentials: 'include'` — sem BFF. Exige front e API no mesmo domínio raiz.
- Listagens vêm no envelope `{ items, totalItems }`; erros em
  `{ successed, message, notifications: [] }`.
- Escrever em post de outro autor devolve **404, não 403** — não trate 404 como “não existe”.
- Upload: `POST /api/v1/imagens`, multipart, máx. 5 MB, jpg/png/webp; devolve `{ path, url }`.

## Convenções

- **Português** em nomes de arquivo, rota, componente e commit; commits em
  [Conventional Commits](https://www.conventionalcommits.org/pt-br/).
- **Whitelist de HTML do bloco de texto** é contrato de três pontas (editor, sanitizador do
  backend, CSS do `Prose`). Tag nova = mudar as três juntas — a lista canônica está em
  [`CONTEXT.md`](CONTEXT.md).
- `design-system/` e `ui-reference/` são referência visual: **nunca importe deles**.
- Comentários `// ponytail:` marcam simplificação deliberada e o que a substitui quando doer.

## Documentação

| Arquivo | Conteúdo |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | regras de negócio e acordos entre repos que o Swagger não conta |
| [`docs/briefing.md`](docs/briefing.md) | briefing de produto (v2) |
| [`docs/domain.md`](docs/domain.md) | vocabulário do domínio |
| [`docs/agents/`](docs/agents/) | issue tracker, labels de triagem e convenções para agentes |

---

Projeto pessoal e privado de **Antonio Ramon** e **Jéssica Rose**. Sem licença aberta.

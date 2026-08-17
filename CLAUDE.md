# front-pensacomigo

Front do blog de meditações cristãs **Pensa Comigo**.

## Backend

A API fica em `../service-pensacomigo` (repo irmão, mesma pasta do GitHub). Se não estiver lá,
procure nas pastas vizinhas antes de desistir:
`ls ../.. | grep -i pensacomigo` — e, sem resultado, pergunte ao usuário o caminho.

Stack: .NET 10 + EF Core +
PostgreSQL/Supabase, Clean Architecture + CQRS. Ao mexer em contrato de API — endpoints, DTOs,
filtro/ordenação/paginação, formato de erro — leia `../service-pensacomigo/README.md` e
`../service-pensacomigo/docs/` em vez de inferir pelo front.

## Agent skills

### Issue tracker

Issues live as GitHub issues in `Antonio-Ramon/front-pensacomigo`, managed via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

The five canonical roles, each label string equal to its name (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `CONTEXT.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

# TypeScript 7 no projeto, codegen dos tipos da API isolado

O front usa **TypeScript 7** (porta nativa em Go), e por isso o `openapi-typescript` **não
pode morar no `package.json`**. O `npm run api:types` roda o gerador numa árvore separada,
com um TypeScript 5.9 só dele, via `npx -p`.

## Por quê

O `openapi-typescript` não escreve o `.d.ts` como texto: ele monta a árvore sintática pela API
do compilador (`ts.factory`, `ts.SyntaxKind`) e manda o TypeScript imprimir. O pacote npm do TS
7 é um wrapper fino sobre um binário Go e não expõe essa API em JS — `ts.factory` vem
`undefined` e o gerador morre antes de emitir qualquer coisa.

Não é um problema pontual desse pacote. O `@hey-api/openapi-ts`, sucessor mais ativo do ramo,
falha idêntico (`ts.SyntaxKind.AnyKeyword` de `undefined`) — e pior, o peer range dele
(`>=5.5.3 || >=6.0.0`) aceita o TS 7, então instala limpo e só quebra na execução. Os geradores
que sobrevivem ao TS 7 (`swagger-typescript-api`, `oazapfts`) sobrevivem por acidente de
packaging: declaram `typescript` como *dependency* em vez de *peer*, então o npm aninha a cópia
própria deles. Mas emitem uma classe de client HTTP com `@ts-nocheck` no topo, não um contrato
`paths`/`components` — trocar custaria 17 referências a `components["schemas"]` em 5 arquivos e
os 23 aliases de `lib/api.ts`, para terminar com um arquivo gerado que desliga a checagem.

Manter os dois no mesmo `package.json` **não é uma opção**: o peer `^5.x` do
`openapi-typescript` contra o TS 7 da raiz faz `npm ci` abortar com `ERESOLVE`. Quebra clone
novo, CI e deploy. E `overrides` aninhado não salva — o npm recusa, porque peer dependency tem
que ser satisfeito no mesmo nível da árvore.

Daí a separação: a raiz fica com TS 7 e `npm ci` limpo; o gerador roda fora dela, no cache do
npx, com o TS 5.9 que ele precisa. Saída verificada byte a byte idêntica à que o TS 5.9 gerava
dentro do projeto.

## Consequências

- **`openapi-typescript` não aparece em `devDependencies` — e não pode voltar.** Se alguém
  rodar `npm i -D openapi-typescript`, o próximo `npm ci` quebra.
- O `npm run api:types` **precisa de rede na primeira execução** de cada máquina (o npx baixa
  o gerador para o cache); depois roda offline.
- As duas versões estão **fixadas dentro do script** (`typescript@5.9.3`,
  `openapi-typescript@7.13.0`). Não há lockfile cobrindo elas — é proposital: fixar no script é
  o que mantém o resultado reprodutível.
- O ganho medido do TS 7 (mediana de 3-5 rodadas, 4 vCPUs): `tsc --noEmit` do zero **4,25s →
  0,51s**; recheck depois de editar um arquivo **1,95s → 0,31s**; `npm run build` completo
  **16,4s → 9,7s**; pico de memória do type-check **364 MB → 237 MB**. Em compensação o
  compilador ocupa ~31 MB no disco em vez de 23 MB (o binário Go vem em
  `@typescript/typescript-<plataforma>`), e o `npm run api:types` ficou ~0,8s mais lento por
  causa da árvore isolada do npx. O TS 6.0 foi medido junto e empata com o 5.9 — é a mesma
  engine em JavaScript.

## Quando reverter isso

Quando o `openapi-typescript` publicar versão que rode sobre o TS 7 (hoje o `latest` 7.13.0
ainda declara `peerDependencies: { typescript: "^5.x" }`), o caminho de volta é curto: devolver
`openapi-typescript` às `devDependencies` e restaurar o script para
`openapi-typescript http://localhost:5001/swagger/v1/swagger.json -o src/types/api.d.ts`.
Nada no código do app depende dessa separação — o `src/types/api.d.ts` é declaração pura e
compila igual nos dois mundos.

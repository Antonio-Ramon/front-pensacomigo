# Toast de remoção não oferece "desfazer"

A regra 03 do sistema de toasts (`ui-reference/Toasts.dc.html`) manda toda remoção sair com
"desfazer". Cumprimos só onde a API deixa: excluir post e excluir comentário são hard delete
(`DELETE /posts/{id}`, `DELETE /posts/{postId}/comentarios/{id}`), e um "desfazer" ali seria um
botão que mente. Essas duas são protegidas por `ConfirmDialog` **antes** e confirmadas por toast
**depois**, sem ação de rodapé.

## Revisão (2026-08-22)

O backend ganhou `PATCH /posts/{postId}/comentarios/{id}/reexibir`. Ocultar comentário virou
reversível, então o toast de ocultar leva "desfazer →" (chama `reexibir`) e não pede confirmação
antes — a regra 03 vale de novo nesse caminho. O `ConfirmDialog` de excluir fica: hard delete
continua sem volta.

## Consequências

Se um dia o `DELETE` virar soft delete, o `ConfirmDialog` de excluir também sai do caminho —
confirmar duas vezes uma ação reversível é atrito à toa.

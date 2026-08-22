# Toast de remoção não oferece "desfazer"

A regra 03 do sistema de toasts (`ui-reference/Toasts.dc.html`) manda toda remoção sair com
"desfazer". Não cumprimos: a API só tem hard delete (`DELETE /posts/{id}`,
`DELETE /posts/{postId}/comentarios/{id}`) e ocultar comentário não tem endpoint de volta —
um "desfazer" no front seria um botão que mente. As remoções da escrivaninha, então, são
protegidas por `ConfirmDialog` **antes** e confirmadas por toast **depois**, sem ação de rodapé.

## Consequências

Quando o backend ganhar soft delete (ou um `PATCH .../reexibir`), a regra 03 volta a valer e
o `ConfirmDialog` de excluir pode sair do caminho — confirmar duas vezes uma ação reversível
é atrito à toa. Até lá, os dois passos são o que temos.

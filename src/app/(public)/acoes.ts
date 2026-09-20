"use server";

import { updateTag } from "next/cache";
import { TAG_POSTS } from "@/lib/api";

/**
 * Derruba o cache das listagens antes do feed ao vivo re-renderizar. Sem isso o
 * `router.refresh()` volta a montar o server component em cima da MESMA resposta em cache
 * (`revalidate: 60`), e a lista chega idêntica — post publicado não aparece, removido não some.
 *
 * `updateTag` e não `revalidateTag`: o segundo só marca a entrada como velha, e o render que
 * vem logo em seguida ainda pode ser servido com o valor antigo. Aqui o render seguinte é o
 * ponto inteiro da chamada.
 */
export async function revalidarPosts() {
  updateTag(TAG_POSTS);
}

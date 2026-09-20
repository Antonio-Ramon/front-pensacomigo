"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ouvirGeral } from "@/lib/tempoReal";
import { revalidarPosts } from "@/app/(public)/acoes";

/**
 * Post publicado ou removido muda a LISTA, não um número: `router.refresh()` refaz o render
 * do server component com os dados novos, sem F5 e sem duplicar a montagem da listagem aqui.
 *
 * O refresh sozinho não basta: ele re-renderiza, mas o `fetch` da listagem é servido pelo
 * cache de dados do Next. Por isso `revalidarPosts()` vem antes — é ele que torna o render
 * seguinte capaz de ver a lista nova.
 *
 * Só entra em página de feed. Na página do post um refresh custaria +1 visualização, porque
 * é o próprio GET que incrementa o contador.
 */
export function FeedAoVivo() {
  const router = useRouter();

  useEffect(() => {
    // Sem realtime a página continua como sempre foi — daí o catch vazio.
    const atualizar = () => {
      revalidarPosts()
        .then(() => router.refresh())
        .catch(() => {});
    };

    return ouvirGeral({ PostPublicado: atualizar, PostRemovido: atualizar });
  }, [router]);

  return null;
}

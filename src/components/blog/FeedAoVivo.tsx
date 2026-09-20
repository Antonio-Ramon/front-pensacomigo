"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ouvirGeral } from "@/lib/tempoReal";

/**
 * Post publicado ou removido muda a LISTA, não um número: `router.refresh()` refaz o render
 * do server component com os dados novos, sem F5 e sem duplicar a montagem da listagem aqui.
 *
 * Só entra em página de feed. Na página do post um refresh custaria +1 visualização, porque
 * é o próprio GET que incrementa o contador.
 */
export function FeedAoVivo() {
  const router = useRouter();

  useEffect(
    () => ouvirGeral({ PostPublicado: () => router.refresh(), PostRemovido: () => router.refresh() }),
    [router],
  );

  return null;
}

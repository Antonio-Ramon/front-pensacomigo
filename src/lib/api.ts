import type { components } from "@/types/api";

export type PostResumo = components["schemas"]["PostResumoResponse"];
export type PostDetalhe = components["schemas"]["PostDetalheResponse"];
export type Bloco = components["schemas"]["Bloco"];
export type Tag = components["schemas"]["TagResponse"];
export type Autor = components["schemas"]["AutorResponse"];
export type Etapa = components["schemas"]["EtapaResponse"];
export type StatusPost = components["schemas"]["StatusPost"];
export type Mood = components["schemas"]["Mood"];

type Pagina<T> = { items?: T[] | null; totalItems?: number };

const BASE = process.env.API_URL ?? "http://localhost:5001";

/** Tag de cache das listagens de post. Quem publica ou remove invalida por aqui. */
export const TAG_POSTS = "posts";

async function get<T>(path: string, revalidate: number, tags?: string[]): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate, tags } });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${res.status} em ${path}`);
  return res.json();
}

export async function listarPosts(
  opts: { pagina?: number; pageSize?: number; filter?: string } = {},
) {
  const q = new URLSearchParams({
    Page: String(opts.pagina ?? 1),
    PageSize: String(opts.pageSize ?? 12),
    OrderBy: "dataCriacao desc",
  });
  if (opts.filter) q.set("Filter", opts.filter);
  // A tag é o que permite derrubar TODAS as listagens de uma vez — home, arquivo e cada tag
  // têm URL (e portanto entrada de cache) diferente, e publicar/remover muda todas elas.
  // Sem isso o `router.refresh()` do feed ao vivo re-renderiza e recebe o cache antigo de volta.
  const pagina = await get<Pagina<PostResumo>>(`/api/v1/Posts?${q}`, 60, [TAG_POSTS]);
  return { items: pagina?.items ?? [], totalItems: pagina?.totalItems ?? 0 };
}

// Catálogo fixo (nasce por seed no backend) — cache longo sem culpa.
export async function listarEtapas() {
  return (await get<Etapa[]>("/api/v1/Etapas", 3600)) ?? [];
}

export async function listarAutores() {
  const pagina = await get<Pagina<Autor>>("/api/v1/Autores", 3600);
  return pagina?.items ?? [];
}

// A API incrementa visualizações a cada GET por slug — revalidação longa de propósito.
export function abrirPost(slug: string) {
  return get<PostDetalhe>(`/api/v1/Posts/${encodeURIComponent(slug)}`, 300);
}

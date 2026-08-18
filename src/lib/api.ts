import type { components } from "@/types/api";

export type PostResumo = components["schemas"]["PostResumoResponse"];
export type PostDetalhe = components["schemas"]["PostDetalheResponse"];
export type Bloco = components["schemas"]["Bloco"];
export type Tag = components["schemas"]["TagResponse"];

type Pagina<T> = { items?: T[] | null; totalItems?: number };

const BASE = process.env.API_URL ?? "http://localhost:5001";

async function get<T>(path: string, revalidate: number): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate } });
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
  const pagina = await get<Pagina<PostResumo>>(`/api/v1/Posts?${q}`, 60);
  return { items: pagina?.items ?? [], totalItems: pagina?.totalItems ?? 0 };
}

// A API incrementa visualizações a cada GET por slug — revalidação longa de propósito.
export function abrirPost(slug: string) {
  return get<PostDetalhe>(`/api/v1/Posts/${encodeURIComponent(slug)}`, 300);
}

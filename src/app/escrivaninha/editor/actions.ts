"use server";

import { revalidatePath } from "next/cache";
import type { components } from "@/types/api";
import { fetchAdmin } from "@/lib/api-admin";
import type { Mood, StatusPost } from "@/lib/api";

type PostSalvo = components["schemas"]["PostResponse"];
export type LinkPreview = components["schemas"]["LinkPreviewResponse"];
type TagCriada = components["schemas"]["TagResponse"];
type Imagem = components["schemas"]["ImagemResponse"];

// Erros voltam como valor ({ erro }) — throw em server action vira mensagem opaca em produção.
type Resultado<T> = { ok: true; dados: T } | { ok: false; erro: string };

async function comErro<T>(res: Response): Promise<Resultado<T>> {
  if (res.ok) {
    // DELETE devolve 204 sem corpo — json() estouraria
    const texto = await res.text();
    return { ok: true, dados: (texto ? JSON.parse(texto) : null) as T };
  }
  // sessão vencida no meio da escrita: a mensagem crua ("API respondeu 401") não
  // diz ao autor o que fazer, e é justo quando o texto não salvo importa
  if (res.status === 401)
    return { ok: false, erro: "Sua sessão expirou. Entre de novo em outra aba e tente publicar." };
  if (res.status === 403) return { ok: false, erro: "Sua conta não tem permissão para isso." };
  const corpo = await res.json().catch(() => null);
  const msgs = corpo?.notifications?.map((n: { message: string }) => n.message).join("; ");
  return { ok: false, erro: msgs || corpo?.message || `API respondeu ${res.status}.` };
}

export async function salvarPost(dados: {
  id?: string;
  titulo: string;
  dek: string | null;
  imagemCapa: string | null;
  tagIds: string[];
  conteudo: components["schemas"]["Bloco"][];
  status: StatusPost;
  moods: Mood[];
  etapaId: string | null;
  dataPublicacao: string | null; // só com status Agendado
}): Promise<Resultado<PostSalvo>> {
  const { id, ...corpo } = dados;
  const res = await fetchAdmin(id ? `/api/v1/Posts/${id}` : "/api/v1/Posts", {
    method: id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(corpo),
  });
  const r = await comErro<PostSalvo>(res);
  if (r.ok) {
    revalidatePath("/escrivaninha");
    revalidatePath("/");
    if (r.dados.slug) revalidatePath(`/${r.dados.slug}`);
  }
  return r;
}

export async function enviarImagem(fd: FormData): Promise<Resultado<Imagem>> {
  return comErro(await fetchAdmin("/api/v1/Imagens", { method: "POST", body: fd }));
}

// 422 quando vinculada a posts — a mensagem da API já diz a contagem.
export async function excluirTag(id: string): Promise<Resultado<null>> {
  return comErro(await fetchAdmin(`/api/v1/Tags/${id}`, { method: "DELETE" }));
}

export async function criarTag(nome: string): Promise<Resultado<TagCriada>> {
  return comErro(
    await fetchAdmin("/api/v1/Tags", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ nome }),
    }),
  );
}

export async function buscarPreviewLink(url: string): Promise<Resultado<LinkPreview>> {
  return comErro(await fetchAdmin(`/api/v1/Links/preview?url=${encodeURIComponent(url)}`));
}

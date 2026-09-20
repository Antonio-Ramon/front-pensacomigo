"use server";

import { revalidatePath, updateTag } from "next/cache";
import { fetchAdmin } from "@/lib/api-admin";
import { TAG_POSTS } from "@/lib/api";

export async function excluirPost(id: string) {
  const res = await fetchAdmin(`/api/v1/Posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Falha ao excluir (${res.status}).`);
  revalidatePath("/escrivaninha");
  // O post sai das listagens públicas também — sem isto ele continua na home e no arquivo
  // até o cache vencer sozinho.
  updateTag(TAG_POSTS);
}

// Moderação sai por server action de propósito: o CORS do backend não libera PATCH do browser.
export async function moderarComentario(postId: string, id: string, aprovado: boolean) {
  const acao = aprovado ? "reexibir" : "ocultar";
  const res = await fetchAdmin(`/api/v1/posts/${postId}/comentarios/${id}/${acao}`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Falha ao ${acao} (${res.status}).`);
  revalidatePath(`/escrivaninha/comentarios/${postId}`);
}

export async function excluirComentario(postId: string, id: string) {
  const res = await fetchAdmin(`/api/v1/posts/${postId}/comentarios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Falha ao excluir (${res.status}).`);
  revalidatePath(`/escrivaninha/comentarios/${postId}`);
}

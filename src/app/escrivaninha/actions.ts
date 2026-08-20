"use server";

import { revalidatePath } from "next/cache";
import { fetchAdmin } from "@/lib/api-admin";

export async function excluirPost(id: string) {
  const res = await fetchAdmin(`/api/v1/Posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Falha ao excluir (${res.status}).`);
  revalidatePath("/escrivaninha");
}

// Moderação sai por server action de propósito: o CORS do backend não libera PATCH do browser.
export async function ocultarComentario(postId: string, id: string) {
  const res = await fetchAdmin(`/api/v1/posts/${postId}/comentarios/${id}/ocultar`, { method: "PATCH" });
  if (!res.ok) throw new Error(`Falha ao ocultar (${res.status}).`);
  revalidatePath(`/escrivaninha/comentarios/${postId}`);
}

export async function excluirComentario(postId: string, id: string) {
  const res = await fetchAdmin(`/api/v1/posts/${postId}/comentarios/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Falha ao excluir (${res.status}).`);
  revalidatePath(`/escrivaninha/comentarios/${postId}`);
}

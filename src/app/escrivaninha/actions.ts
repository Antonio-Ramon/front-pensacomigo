"use server";

import { revalidatePath } from "next/cache";
import { fetchAdmin } from "@/lib/api-admin";

export async function excluirPost(id: string) {
  const res = await fetchAdmin(`/api/v1/Posts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Falha ao excluir (${res.status}).`);
  revalidatePath("/escrivaninha");
}

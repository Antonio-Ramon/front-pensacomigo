import { listarEtapas, type Tag } from "@/lib/api";
import { fetchAdmin } from "@/lib/api-admin";
import { Editor } from "./Editor";

export default async function NovaMeditacao() {
  const [res, etapas] = await Promise.all([
    fetchAdmin("/api/v1/Tags?Page=1&PageSize=100&OrderBy=nome"),
    listarEtapas(),
  ]);
  if (!res.ok) throw new Error(`API ${res.status} ao listar tags.`);
  const { items = [] } = (await res.json()) as { items?: Tag[] };

  return <Editor tags={items ?? []} etapas={etapas} />;
}

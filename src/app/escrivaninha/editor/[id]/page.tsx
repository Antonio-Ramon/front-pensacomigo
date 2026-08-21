import { notFound } from "next/navigation";
import { listarEtapas, type PostDetalhe, type Tag } from "@/lib/api";
import { fetchAdmin } from "@/lib/api-admin";
import { deConteudo } from "../blocos";
import { Editor } from "../Editor";

// GET id/{id} (#29): só o dono enxerga, e sem inflar visualizações como o GET por slug.
export default async function EditarMeditacao({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [resPost, resTags, etapas] = await Promise.all([
    fetchAdmin(`/api/v1/Posts/id/${id}`),
    fetchAdmin("/api/v1/Tags?Page=1&PageSize=100&OrderBy=nome"),
    listarEtapas(),
  ]);
  if (resPost.status === 404) notFound();
  if (!resPost.ok || !resTags.ok) throw new Error("API falhou ao carregar o editor.");

  const post = (await resPost.json()) as PostDetalhe;
  const { items: tags = [] } = (await resTags.json()) as { items?: Tag[] };

  // o detalhe não expõe status: sem data = rascunho, data futura = agendado, passada = publicado
  const status = !post.dataPublicacao ? 0 : new Date(post.dataPublicacao) > new Date() ? 2 : 1;

  return (
    <Editor
      tags={tags ?? []}
      etapas={etapas}
      blocosIniciais={deConteudo(post.conteudo)}
      post={{
        id: post.id!,
        slug: post.slug ?? "",
        titulo: post.titulo ?? "",
        dek: post.dek ?? null,
        imagemCapa: post.imagemCapa ?? null,
        status,
        tagIds: (post.tags ?? []).map((t) => t.id!),
        moods: (post.moods ?? []) as number[],
        etapaId: post.etapa?.id ?? null,
        dataPublicacao: post.dataPublicacao ?? null,
      }}
    />
  );
}

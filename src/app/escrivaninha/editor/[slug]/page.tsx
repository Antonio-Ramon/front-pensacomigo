import { notFound } from "next/navigation";
import type { PostDetalhe, Tag } from "@/lib/api";
import { fetchAdmin } from "@/lib/api-admin";
import { deConteudo } from "../blocos";
import { Editor } from "../Editor";

// Não há GET /Posts/{id} — a edição carrega pelo slug (GET autenticado devolve rascunhos).
export default async function EditarMeditacao({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const [resPost, resTags] = await Promise.all([
    fetchAdmin(`/api/v1/Posts/${encodeURIComponent(slug)}`),
    fetchAdmin("/api/v1/Tags?Page=1&PageSize=100&OrderBy=nome"),
  ]);
  if (resPost.status === 404) notFound();
  if (!resPost.ok || !resTags.ok) throw new Error("API falhou ao carregar o editor.");

  const post = (await resPost.json()) as PostDetalhe;
  const { items: tags = [] } = (await resTags.json()) as { items?: Tag[] };

  return (
    <Editor
      tags={tags ?? []}
      blocosIniciais={deConteudo(post.conteudo)}
      post={{
        id: post.id!,
        slug: post.slug ?? slug,
        titulo: post.titulo ?? "",
        imagemCapa: post.imagemCapa ?? null,
        // o detalhe não expõe status; dataPublicacao preenchida = publicado
        status: post.dataPublicacao ? 1 : 0,
        tagIds: (post.tags ?? []).map((t) => t.id!),
      }}
    />
  );
}

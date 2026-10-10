import type { Metadata } from "next";
import { listarPosts } from "@/lib/api";
import { PostList } from "@/components/blog/PostRow";
import { FeedAoVivo } from "@/components/blog/FeedAoVivo";

type Props = { params: Promise<{ tag: string }> };

// A URL só carrega o slug; o nome legível vem da própria tag dentro dos posts.
// Sem post nenhum, o slug é o melhor que dá para mostrar.
async function carregar(tag: string) {
  const slug = decodeURIComponent(tag);
  const { items } = await listarPosts({ filter: `tag=${slug}`, pageSize: 24 });
  const nome = items[0]?.tags?.find((t) => t.slug === slug)?.nome ?? slug;
  return { items, nome };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nome } = await carregar((await params).tag);
  return { title: `Meditações sobre ${nome}` };
}

export default async function PaginaTag({ params }: Props) {
  const { items, nome } = await carregar((await params).tag);

  return (
    <>
      <FeedAoVivo />
      <p className="pc-eyebrow">meditações sobre</p>
      <h1 className="pc-titulo" style={{ marginBottom: "var(--sp-6)" }}>
        {nome}
      </h1>
      {items.length === 0 ? (
        <p style={{ color: "var(--soft)", fontSize: "var(--fs-lede)" }}>
          Nenhuma meditação com esta tag.
        </p>
      ) : (
        <PostList posts={items} />
      )}
    </>
  );
}

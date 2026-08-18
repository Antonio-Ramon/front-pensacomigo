import type { Metadata } from "next";
import { listarPosts } from "@/lib/api";
import { PostList } from "@/components/blog/PostRow";

type Props = { params: Promise<{ tag: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Meditações sobre ${decodeURIComponent(tag)}` };
}

export default async function PaginaTag({ params }: Props) {
  const { tag } = await params;
  const slug = decodeURIComponent(tag);
  const { items } = await listarPosts({ filter: `tag=${slug}`, pageSize: 24 });

  return (
    <>
      <p className="pc-eyebrow">tag</p>
      <h1 className="pc-titulo" style={{ marginBottom: "var(--sp-6)" }}>
        {slug}
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

import type { Metadata } from "next";
import { listarPosts } from "@/lib/api";
import { PostGrid } from "@/components/blog/PostCard";

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
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "var(--fs-mono)",
          letterSpacing: "var(--tracking-eyebrow)",
          textTransform: "uppercase",
          color: "var(--accent)",
          margin: "0 0 var(--sp-2)",
        }}
      >
        Tag
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          fontWeight: "var(--w-light)",
          letterSpacing: "var(--tracking-display)",
          margin: "0 0 var(--sp-6)",
        }}
      >
        {slug}
      </h1>
      {items.length === 0 ? (
        <p style={{ color: "var(--soft)", fontSize: "var(--fs-lede)" }}>
          Nenhuma meditação com esta tag.
        </p>
      ) : (
        <PostGrid posts={items} />
      )}
    </>
  );
}

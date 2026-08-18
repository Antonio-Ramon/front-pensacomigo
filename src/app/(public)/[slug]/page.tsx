import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { abrirPost, listarPosts } from "@/lib/api";
import { resumoDoPost } from "@/lib/resumo";
import { urlDaImagem } from "@/lib/imagens";
import { bioDoAutor } from "@/lib/autores";
import { Prose } from "@/components/blog/Prose";
import { ShareButton } from "@/components/blog/ShareButton";
import { ProgressoLeitura } from "@/components/blog/ProgressoLeitura";
import { Curtidas } from "@/components/blog/Curtidas";
import { Comentarios } from "@/components/blog/Comentarios";
import { PostList } from "@/components/blog/PostRow";
import { dataPorExtenso } from "@/lib/datas";
import styles from "./post.module.css";

type Props = { params: Promise<{ slug: string }> };

// generateMetadata e a página chamam abrirPost com a mesma URL — o Next deduplica
// o fetch, então as visualizações incrementam uma vez só por render.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await abrirPost(slug);
  if (!post) return {};
  const capa = urlDaImagem(post.imagemCapa);
  return {
    title: post.titulo ?? undefined,
    description: resumoDoPost(post.conteudo) || undefined,
    openGraph: {
      type: "article",
      title: post.titulo ?? undefined,
      description: resumoDoPost(post.conteudo) || undefined,
      images: capa ? [capa] : undefined,
    },
  };
}

export default async function PaginaPost({ params }: Props) {
  const { slug } = await params;
  const post = await abrirPost(slug);
  if (!post) notFound();

  const capa = urlDaImagem(post.imagemCapa);
  const fotoAutor = urlDaImagem(post.autor?.imagemUrl);
  const bio = bioDoAutor(post.autor?.nome);

  // Posts relacionados = feed filtrado pela primeira tag (decisão do CONTEXT.md)
  const primeiraTag = post.tags?.[0]?.slug;
  const relacionados = primeiraTag
    ? (await listarPosts({ filter: `tag=${primeiraTag}`, pageSize: 4 })).items
        .filter((p) => p.slug !== post.slug)
        .slice(0, 3)
    : [];

  return (
    <article className={styles.artigo}>
      <ProgressoLeitura />

      {(post.tags?.length ?? 0) > 0 && (
        <div className={styles.tags}>
          {post.tags!.map((t) => (
            <Link key={t.id} href={`/tags/${t.slug}`}>
              {t.nome}
            </Link>
          ))}
        </div>
      )}

      <h1 className={styles.titulo}>{post.titulo}</h1>

      <div className={styles.metaLinha}>
        {fotoAutor && <img src={fotoAutor} alt="" className={styles.avatar} />}
        {post.autor?.nome && <span className={styles.autorNome}>{post.autor.nome}</span>}
        <span>{dataPorExtenso(post.dataCriacao)}</span>
        <span>· {post.tempoLeitura} min</span>
        <span>· {post.qtdVisualizacoes} leituras</span>
      </div>

      {capa && <img src={capa} alt="" className={styles.capa} />}

      <Prose conteudo={post.conteudo} />

      <div className={styles.rodapeArtigo}>
        <Curtidas postId={post.id!} inicial={post.qtdCurtidas ?? 0} />
        <ShareButton titulo={post.titulo ?? "Pensa Comigo"} />
      </div>

      {bio && (
        <div className={styles.bio}>
          {fotoAutor && <img src={fotoAutor} alt="" className={styles.avatar} />}
          <p style={{ margin: 0 }}>
            <strong style={{ color: "var(--ink)" }}>{post.autor?.nome}</strong> — {bio}
          </p>
        </div>
      )}

      <Comentarios postId={post.id!} />

      {relacionados.length > 0 && (
        <section className={styles.relacionados}>
          <h2 className={styles.relacionadosTitulo}>Continue pensando</h2>
          <PostList posts={relacionados} />
        </section>
      )}
    </article>
  );
}

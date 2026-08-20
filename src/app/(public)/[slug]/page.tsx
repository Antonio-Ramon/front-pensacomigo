import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { abrirPost, listarPosts, type Bloco } from "@/lib/api";
import { resumoDoPost } from "@/lib/resumo";
import { urlDaImagem } from "@/lib/imagens";
import { Prose } from "@/components/blog/Prose";
import { ProgressoLeitura } from "@/components/blog/ProgressoLeitura";
import { TocRail, type SecaoToc } from "@/components/blog/TocRail";
import { Curtidas } from "@/components/blog/Curtidas";
import { Comentarios } from "@/components/blog/Comentarios";
import { PostList } from "@/components/blog/PostRow";
import { NewsletterCTA } from "@/components/layout/NewsletterCTA";
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

const slugDeTexto = (t: string) =>
  t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Injeta id nos <h2> do conteúdo e devolve o índice de seções para o TocRail.
function comAncoras(conteudo: Bloco[] | null | undefined) {
  const secoes: SecaoToc[] = [];
  const blocos = (conteudo ?? []).map((b) => {
    if (b.tipo !== 0 || !b.html?.includes("<h2>")) return b;
    const html = b.html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, texto: string) => {
      const label = texto.replace(/<[^>]+>/g, "");
      const id = `sec-${slugDeTexto(label) || secoes.length + 1}`;
      secoes.push({ id, label });
      return `<h2 id="${id}">${texto}</h2>`;
    });
    return { ...b, html };
  });
  return { blocos, secoes };
}

function iniciaisDe(nome: string) {
  return nome.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default async function PaginaPost({ params }: Props) {
  const { slug } = await params;
  const post = await abrirPost(slug);
  if (!post) notFound();

  const capa = urlDaImagem(post.imagemCapa);
  const fotoAutor = urlDaImagem(post.autor?.imagemUrl);
  const nomeAutor = post.autor?.nome ?? "";
  const { blocos, secoes } = comAncoras(post.conteudo);

  // Relacionados = feed filtrado pela primeira tag (decisão do CONTEXT.md);
  // o mesmo feed ordenado dá o pager anterior/próxima.
  const [{ items: feed }, relacionados] = await Promise.all([
    listarPosts({ pageSize: 100 }),
    post.tags?.[0]?.slug
      ? listarPosts({ filter: `tag=${post.tags[0].slug}`, pageSize: 4 }).then(({ items }) =>
          items.filter((p) => p.slug !== post.slug).slice(0, 2),
        )
      : Promise.resolve([]),
  ]);
  const idx = feed.findIndex((p) => p.slug === post.slug);
  const anterior = idx >= 0 ? feed[idx + 1] : undefined; // feed é do mais novo ao mais velho
  const proxima = idx > 0 ? feed[idx - 1] : undefined;

  return (
    <article>
      <ProgressoLeitura />

      <Link href="/meditacoes" className={styles.voltar}>
        ← todas as meditações
      </Link>

      <p className="pc-eyebrow">meditação</p>
      <h1 className={styles.titulo}>{post.titulo}</h1>

      <div className={styles.metaLinha}>
        {fotoAutor ? (
          <img src={fotoAutor} alt="" className={styles.avatar} />
        ) : (
          nomeAutor && <span className={styles.avatarIniciais}>{iniciaisDe(nomeAutor)}</span>
        )}
        <span>
          {nomeAutor && <span className={styles.autorNome}>{nomeAutor}</span>}
          <span className={styles.metaMono}>
            {dataPorExtenso(post.dataCriacao)} · <b>{post.tempoLeitura} min de leitura</b>
            {(post.tags?.length ?? 0) > 0 && (
              <>
                {" · "}
                {post.tags!.map((t, i) => (
                  <span key={t.id}>
                    {i > 0 && " · "}
                    <Link href={`/tags/${t.slug}`}>{t.nome}</Link>
                  </span>
                ))}
              </>
            )}
          </span>
        </span>
      </div>

      {capa && <img src={capa} alt="" className={styles.capa} />}

      <div className={styles.corpo}>
        <div className={styles.coluna}>
          <Prose conteudo={blocos} />

          <div className={styles.reacoes}>
            <Curtidas postId={post.id!} inicial={post.qtdCurtidas ?? 0} />
          </div>

          {post.autor?.bio && (
            <div className={styles.authorBox}>
              {fotoAutor ? (
                <img src={fotoAutor} alt="" className={styles.avatarGrande} />
              ) : (
                <span className={styles.avatarGrandeIniciais}>{iniciaisDe(nomeAutor)}</span>
              )}
              <div>
                <h4 className={styles.authorNomeBox}>{nomeAutor}</h4>
                <p className={styles.authorBio}>{post.autor.bio}</p>
              </div>
            </div>
          )}

          <div className={styles.newsletter}>
            <NewsletterCTA />
          </div>

          {relacionados.length > 0 && (
            <section className={styles.relacionados}>
              <h3 className={styles.tituloSecao}>Continue por aqui</h3>
              <PostList posts={relacionados} />
            </section>
          )}

          {(anterior || proxima) && (
            <nav className={styles.pager}>
              {anterior ? (
                <Link href={`/${anterior.slug}`} className={styles.pagerLado}>
                  <span className={styles.pagerKicker}>← anterior</span>
                  <span className={styles.pagerTitulo}>{anterior.titulo}</span>
                </Link>
              ) : (
                <span />
              )}
              {proxima ? (
                <Link href={`/${proxima.slug}`} className={`${styles.pagerLado} ${styles.pagerDireita}`}>
                  <span className={styles.pagerKicker}>próxima →</span>
                  <span className={styles.pagerTitulo}>{proxima.titulo}</span>
                </Link>
              ) : (
                <span />
              )}
            </nav>
          )}

          <Comentarios postId={post.id!} />
        </div>

        <div className={styles.railBox}>
          <TocRail secoes={secoes} />
        </div>
      </div>
    </article>
  );
}

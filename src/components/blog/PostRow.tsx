import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PostResumo } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";
import { dataCurta } from "@/lib/datas";
import styles from "./postrow.module.css";

/**
 * Unidade de listagem de todo o site: data · miniatura · título/resumo/tags · seta.
 * A referência visual não usa grid de cards — arquivo é linha separada por fio.
 */
export function PostRow({ post }: { post: PostResumo }) {
  const capa = urlDaImagem(post.imagemCapa);
  return (
    <Link href={`/${post.slug}`} className={styles.row}>
      <span className={styles.data}>{dataCurta(post.dataCriacao)}</span>
      <span className={styles.thumb}>
        {capa ? <img src={capa} alt="" loading="lazy" /> : <span>capa</span>}
      </span>
      <span className={styles.corpo}>
        <h3 className={styles.titulo}>{post.titulo}</h3>
        {post.dek && <p className={styles.dek}>{post.dek}</p>}
        <p className={styles.meta}>
          {post.tempoLeitura} min de leitura
          {(post.tags?.length ?? 0) > 0 && <> · {post.tags!.map((t) => t.nome).join(" · ")}</>}
        </p>
      </span>
      <span className={styles.seta} aria-hidden>
        <ArrowRight size={15} />
      </span>
    </Link>
  );
}

export function PostList({ posts }: { posts: PostResumo[] }) {
  return (
    <div className={styles.lista}>
      {posts.map((p) => (
        <PostRow key={p.id} post={p} />
      ))}
    </div>
  );
}

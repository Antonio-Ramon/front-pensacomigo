import Link from "next/link";
import type { PostResumo } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";
import styles from "./postcard.module.css";

export function dataPorExtenso(iso?: string) {
  return iso
    ? new Date(iso).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";
}

export function PostCard({ post }: { post: PostResumo }) {
  const capa = urlDaImagem(post.imagemCapa);
  return (
    <Link href={`/${post.slug}`} className={styles.card}>
      {capa && <img src={capa} alt="" className={styles.capa} loading="lazy" />}
      <div className={styles.corpo}>
        <p className={styles.meta}>
          {dataPorExtenso(post.dataCriacao)} · {post.tempoLeitura} min
        </p>
        {/* tags e autor entram quando a service-pensacomigo#19 sair e os tipos forem regenerados */}
        <h3 className={styles.titulo}>{post.titulo}</h3>
      </div>
    </Link>
  );
}

export function PostGrid({ posts }: { posts: PostResumo[] }) {
  return (
    <div className={styles.grid}>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </div>
  );
}

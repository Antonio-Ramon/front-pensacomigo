import Link from "next/link";
import type { components } from "@/types/api";
import { fetchAdmin } from "@/lib/api-admin";
import { dataCurta } from "@/lib/datas";
import styles from "../../escrivaninha.module.css";
import { BotoesModeracao } from "./BotoesModeracao";

type Comentario = components["schemas"]["ComentarioListaResponse"];

export default async function ModeracaoComentarios({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ titulo?: string }>;
}) {
  const [{ id: postId }, { titulo }] = await Promise.all([params, searchParams]);

  const res = await fetchAdmin(
    `/api/v1/posts/${postId}/comentarios?PageSize=100&OrderBy=dataCriacao desc`,
  );
  if (!res.ok) throw new Error(`API ${res.status} ao listar comentários.`);
  const { items = [], totalItems = 0 } = (await res.json()) as {
    items?: Comentario[];
    totalItems?: number;
  };

  return (
    <>
      <Link href="/escrivaninha" className={styles.voltar}>
        ← meditações
      </Link>
      <p className="pc-eyebrow">
        moderação · <b>{totalItems} comentários</b>
      </p>
      <h1 className={styles.h1}>{titulo || "Comentários do post"}</h1>

      <div className={styles.tabela}>
        {items.map((c) => (
          <div key={c.id} className={styles.comentarioLinha}>
            <div>
              <p className={styles.comentarioMeta}>
                <b>{c.autor}</b> · {dataCurta(c.dataCriacao)}
              </p>
              <p className={styles.comentarioTexto}>{c.conteudo}</p>
              {c.respostas?.map((r) => (
                <div key={r.id} className={styles.respostaLinha}>
                  <p className={styles.comentarioMeta}>
                    <b>{r.autor}</b> · {dataCurta(r.dataCriacao)}
                  </p>
                  <p className={styles.comentarioTexto}>{r.conteudo}</p>
                  <BotoesModeracao postId={postId} id={r.id!} />
                </div>
              ))}
            </div>
            <BotoesModeracao postId={postId} id={c.id!} />
          </div>
        ))}
      </div>

      {items.length === 0 && <p className={styles.vazio}>Nenhum comentário neste post.</p>}
    </>
  );
}

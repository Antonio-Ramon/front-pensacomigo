import Link from "next/link";
import type { PostResumo } from "@/lib/api";
import { fetchAdmin } from "@/lib/api-admin";
import { dataCurta } from "@/lib/datas";
import { BotaoExcluir } from "./BotaoExcluir";
import { BuscaAdmin } from "./BuscaAdmin";
import styles from "./escrivaninha.module.css";

const STATUS = { rascunho: 0, publicado: 1 } as const;

export default async function PainelAdmin({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; busca?: string }>;
}) {
  const { status, busca } = await searchParams;

  const filtros: string[] = [];
  if (status && status in STATUS) filtros.push(`status=${STATUS[status as keyof typeof STATUS]}`);
  if (busca) filtros.push(`titulo=*${busca}/i`);

  const q = new URLSearchParams({ Page: "1", PageSize: "100", OrderBy: "dataCriacao desc" });
  if (filtros.length) q.set("Filter", filtros.join(","));

  const res = await fetchAdmin(`/api/v1/Posts?${q}`);
  if (!res.ok) throw new Error(`API ${res.status} ao listar posts.`);
  const { items = [], totalItems = 0 } = (await res.json()) as {
    items?: PostResumo[];
    totalItems?: number;
  };

  return (
    <>
      <p className="pc-eyebrow">
        painel do autor · <b>{totalItems} textos</b>
      </p>
      <h1 className={styles.h1}>Todas as meditações</h1>

      <div className={styles.filtros}>
        <div className={styles.chips}>
          {(["publicado", "rascunho"] as const).map((s) => (
            <Link
              key={s}
              className={`${styles.chip} ${status === s ? styles.chipAtivo : ""}`}
              href={{
                pathname: "/escrivaninha",
                query: { ...(busca && { busca }), ...(status !== s && { status: s }) },
              }}
            >
              {s}
            </Link>
          ))}
        </div>
        <BuscaAdmin />
      </div>

      <div className={styles.tabela}>
        <div className={`${styles.linha} ${styles.cabecalhoTabela}`}>
          <span>DATA</span>
          <span>TÍTULO</span>
          <span>AUTOR</span>
          <span>STATUS</span>
          <span style={{ textAlign: "right" }}>AÇÕES</span>
        </div>
        {items.map((p) => {
          const publicado = p.status === 1;
          return (
            <div key={p.id} className={styles.linha}>
              <span className={styles.data}>{dataCurta(p.dataPublicacao ?? p.dataCriacao)}</span>
              <span>
                <Link
                  href={publicado ? `/${p.slug}` : `/escrivaninha/editor/${p.slug}`}
                  className={styles.tituloPost}
                >
                  {p.titulo}
                </Link>
                <br />
                <span className={styles.tagLine}>
                  {(p.tags ?? []).map((t) => t.nome).join(" · ")}
                </span>
              </span>
              <span className={styles.metaCol}>{p.autor?.nome?.toLowerCase()}</span>
              <span>
                <span className={`${styles.badge} ${publicado ? styles.badgePublicado : ""}`}>
                  {publicado ? "publicado" : "rascunho"}
                </span>
              </span>
              <span className={styles.acoes}>
                <Link href={`/escrivaninha/editor/${p.slug}`}>editar →</Link>
                <BotaoExcluir id={p.id!} titulo={p.titulo ?? ""} />
              </span>
            </div>
          );
        })}
      </div>

      {items.length === 0 && <p className={styles.vazio}>Ainda não há meditações por aqui.</p>}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { listarPosts } from "@/lib/api";
import { PostList } from "@/components/blog/PostRow";
import styles from "./arquivo.module.css";

export const metadata: Metadata = { title: "Todas as meditações" };

const PAGE_SIZE = 12;

export default async function Arquivo({
  searchParams,
}: {
  searchParams: Promise<{ busca?: string; pagina?: string }>;
}) {
  const { busca, pagina: paginaParam } = await searchParams;
  const pagina = Math.max(1, Number(paginaParam) || 1);

  const { items, totalItems } = await listarPosts({
    pagina,
    pageSize: PAGE_SIZE,
    filter: busca ? `titulo=*${busca}` : undefined,
  });
  const totalPaginas = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <>
      <section className={styles.cabecalho}>
        <p className="pc-eyebrow">
          arquivo completo · <b>{totalItems} meditações</b>
        </p>
        <h1 className={styles.h1}>Todas as meditações</h1>
        <p className="pc-lede">Busque por título — ou navegue pelo arquivo em ordem.</p>
      </section>

      <form className={styles.busca} action="/meditacoes">
        <input
          type="search"
          name="busca"
          placeholder="buscar — ex. Habacuque, luto, maná…"
          defaultValue={busca ?? ""}
          aria-label="Buscar meditações por título"
        />
        <button type="submit">buscar</button>
      </form>

      {items.length === 0 ? (
        <p className={styles.vazio}>
          {busca ? `Nada encontrado para “${busca}”.` : "Nenhuma meditação publicada ainda."}
        </p>
      ) : (
        <PostList posts={items} />
      )}

      {totalPaginas > 1 && (
        <nav className={styles.paginacao} aria-label="Paginação">
          <span>
            {pagina > 1 && (
              <Link
                href={{
                  pathname: "/meditacoes",
                  query: { ...(busca && { busca }), pagina: pagina - 1 },
                }}
              >
                ← mais recentes
              </Link>
            )}
          </span>
          <span className={styles.contador}>
            página {pagina} de {totalPaginas}
          </span>
          <span>
            {pagina < totalPaginas && (
              <Link
                href={{
                  pathname: "/meditacoes",
                  query: { ...(busca && { busca }), pagina: pagina + 1 },
                }}
              >
                mais antigas →
              </Link>
            )}
          </span>
        </nav>
      )}
    </>
  );
}

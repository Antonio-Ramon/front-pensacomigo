import Link from "next/link";
import { listarPosts } from "@/lib/api";
import { PostGrid, dataPorExtenso } from "@/components/blog/PostCard";
import styles from "./home.module.css";

const PAGE_SIZE = 12;

export default async function Home({
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

  const comHero = pagina === 1 && !busca && items.length > 0;
  const [destaque, ...resto] = comHero ? items : [];
  const grid = comHero ? resto : items;
  const totalPaginas = Math.ceil(totalItems / PAGE_SIZE);

  return (
    <>
      {comHero && destaque && (
        <section className={styles.hero}>
          <p className={styles.heroEyebrow}>Meditação em destaque</p>
          <h1 className={styles.heroTitulo}>
            <Link href={`/${destaque.slug}`}>{destaque.titulo}</Link>
          </h1>
          <p className={styles.heroMeta}>
            {dataPorExtenso(destaque.dataCriacao)} · {destaque.tempoLeitura} min de leitura
          </p>
        </section>
      )}

      <form className={styles.busca} action="/">
        <input
          type="search"
          name="busca"
          placeholder="Buscar por título…"
          defaultValue={busca ?? ""}
          aria-label="Buscar meditações por título"
        />
        <button type="submit">Buscar</button>
      </form>

      {items.length === 0 ? (
        <p className={styles.vazio}>
          {busca ? `Nada encontrado para “${busca}”.` : "Nenhuma meditação publicada ainda."}
        </p>
      ) : (
        <PostGrid posts={grid} />
      )}

      {totalPaginas > 1 && (
        <nav className={styles.paginacao} aria-label="Paginação">
          <span>
            {pagina > 1 && (
              <Link href={{ pathname: "/", query: { ...(busca && { busca }), pagina: pagina - 1 } }}>
                ← mais recentes
              </Link>
            )}
          </span>
          <span>
            {pagina < totalPaginas && (
              <Link href={{ pathname: "/", query: { ...(busca && { busca }), pagina: pagina + 1 } }}>
                mais antigas →
              </Link>
            )}
          </span>
        </nav>
      )}
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { listarPosts } from "@/lib/api";
import { PostList } from "@/components/blog/PostRow";
import { EmptyState } from "@/components/ui/EmptyState";
import { NewsletterCTA } from "@/components/layout/NewsletterCTA";
import { BuscaForm } from "./BuscaForm";
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
    // Gridify: =* é contains, /i ignora maiúsculas
    filter: busca ? `titulo=*${busca}/i` : undefined,
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

      <BuscaForm busca={busca} />

      <p className={styles.nota}>
        {busca
          ? `${totalItems} resultado${totalItems === 1 ? "" : "s"} para “${busca}”`
          : `${totalItems} meditações, da mais recente à mais antiga`}
      </p>

      {items.length === 0 ? (
        <EmptyState
          rotulo="NADA ENCONTRADO"
          frase={
            busca
              ? `Nenhuma meditação bate com “${busca}”. Tente um termo mais curto.`
              : "Nenhuma meditação publicada ainda."
          }
          acao={busca ? { label: "limpar a busca →", href: "/meditacoes" } : undefined}
        />
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
                <ArrowLeft size={11} /> mais recentes
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
                mais antigas <ArrowRight size={11} />
              </Link>
            )}
          </span>
        </nav>
      )}

      <div className={styles.newsletter}>
        <NewsletterCTA />
      </div>
    </>
  );
}

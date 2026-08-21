import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { listarEtapas, listarPosts } from "@/lib/api";
import { MOODS, etapaCurta } from "@/lib/moods";
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
  searchParams: Promise<{ busca?: string; pagina?: string; etapa?: string; estado?: string }>;
}) {
  const { busca, pagina: paginaParam, etapa, estado } = await searchParams;
  const pagina = Math.max(1, Number(paginaParam) || 1);
  const mood = MOODS.find((m) => m.slug === estado);
  const etapaNumero = Number(etapa) || 0;

  // Gridify: =* é contains, /i ignora maiúsculas; vírgula é E lógico.
  // A busca sem acento ("oracao" acha "oração") é resolvida no backend (#30).
  const filtros: string[] = [];
  if (busca) filtros.push(`titulo=*${busca}/i`);
  if (etapaNumero) filtros.push(`etapa=${etapaNumero}`);
  if (mood) filtros.push(`mood=${mood.valor}`);

  const [{ items, totalItems }, etapas] = await Promise.all([
    listarPosts({ pagina, pageSize: PAGE_SIZE, filter: filtros.join(",") || undefined }),
    listarEtapas(),
  ]);
  const totalPaginas = Math.ceil(totalItems / PAGE_SIZE);

  // links de chip/paginação carregam os demais filtros; trocar filtro volta à página 1
  const query = (mudanca: Record<string, string | number | undefined>) => {
    const q: Record<string, string> = {};
    for (const [k, v] of Object.entries({ busca, etapa, estado, ...mudanca }))
      if (v) q[k] = String(v);
    return q;
  };

  const partes = [
    busca && `“${busca}”`,
    etapaNumero > 0 && `etapa ${etapaCurta(etapaNumero, etapas.find((e) => e.numero === etapaNumero)?.titulo)}`,
    mood && `quem chega ${mood.rotulo}`,
  ].filter(Boolean);

  return (
    <>
      <section className={styles.cabecalho}>
        <p className="pc-eyebrow">
          arquivo completo · <b>{totalItems} meditações</b>
        </p>
        <h1 className={styles.h1}>Todas as meditações</h1>
        <p className="pc-lede">
          Busque por título — ou filtre pela etapa da trilha e pelo estado em que você chega.
        </p>
      </section>

      <BuscaForm busca={busca} />

      <div className={styles.filtros}>
        <div>
          <p className={styles.filtroRotulo}>ETAPA DA TRILHA</p>
          <div className={styles.chips}>
            {etapas.map((e) => {
              const ativa = e.numero === etapaNumero;
              return (
                <Link
                  key={e.id}
                  className={`${styles.chip} ${ativa ? styles.chipAtivo : ""}`}
                  href={{ pathname: "/meditacoes", query: query({ etapa: ativa ? undefined : e.numero }) }}
                >
                  {etapaCurta(e.numero, e.titulo)}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <p className={styles.filtroRotulo}>ESTADO DE CHEGADA</p>
          <div className={styles.chips}>
            {MOODS.map((m) => {
              const ativo = m.slug === mood?.slug;
              return (
                <Link
                  key={m.slug}
                  className={`${styles.chip} ${ativo ? styles.chipAtivo : ""}`}
                  href={{ pathname: "/meditacoes", query: query({ estado: ativo ? undefined : m.slug }) }}
                >
                  {m.rotulo}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <p className={styles.nota}>
        {partes.length
          ? `${totalItems} resultado${totalItems === 1 ? "" : "s"} para ${partes.join(" · ")}`
          : `${totalItems} meditações, da mais recente à mais antiga`}
      </p>

      {items.length === 0 ? (
        <EmptyState
          rotulo="NADA ENCONTRADO"
          frase={
            partes.length
              ? "Nenhuma meditação bate com esses filtros. Tente afrouxar um deles."
              : "Nenhuma meditação publicada ainda."
          }
          acao={partes.length ? { label: "limpar filtros →", href: "/meditacoes" } : undefined}
        />
      ) : (
        <PostList posts={items} />
      )}

      {totalPaginas > 1 && (
        <nav className={styles.paginacao} aria-label="Paginação">
          <span>
            {pagina > 1 && (
              <Link href={{ pathname: "/meditacoes", query: query({ pagina: pagina - 1 }) }}>
                <ArrowLeft size={11} /> mais recentes
              </Link>
            )}
          </span>
          <span className={styles.contador}>
            página {pagina} de {totalPaginas}
          </span>
          <span>
            {pagina < totalPaginas && (
              <Link href={{ pathname: "/meditacoes", query: query({ pagina: pagina + 1 }) }}>
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

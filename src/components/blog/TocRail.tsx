"use client";

import { useEffect, useState } from "react";
import { ArrowUpToLine, Link2 } from "lucide-react";
import { toast } from "@/lib/toast";
import styles from "./tocrail.module.css";

export type SecaoToc = { id: string; label: string };

/**
 * Rail fixo do artigo (ref. TocRail do design system): índice das seções (h2)
 * com scroll-spy + ferramentas de leitura A−/A+/topo/copiar link.
 * O tamanho de fonte é aplicado direto no elemento .prose da página.
 */
export function TocRail({ secoes }: { secoes: SecaoToc[] }) {
  const [ativa, setAtiva] = useState(secoes[0]?.id);
  const [fonte, setFonte] = useState(18.5);

  useEffect(() => {
    if (!secoes.length) return;
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting);
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );
    for (const s of secoes) {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [secoes]);

  const PADRAO = 18.5;

  function aplicarFonte(nova: number) {
    setFonte(nova);
    const prose = document.querySelector<HTMLElement>(".prose");
    // no padrão, remove o inline e devolve o controle ao CSS (--fs-prose)
    if (prose) prose.style.fontSize = nova === PADRAO ? "" : `${nova}px`;
  }
  const ajustarFonte = (delta: number) => aplicarFonte(Math.min(23, Math.max(16, fonte + delta)));

  function voltarAoTopo() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Tira o #secao que o clique no índice deixou na barra: no topo não há seção
    // selecionada, e o link copiado em seguida é o do post, não o de um trecho.
    // replaceState não empilha histórico nem mexe na rolagem (o que um href="#" faria).
    history.replaceState(null, "", location.pathname + location.search);
  }

  return (
    <aside className={styles.rail}>
      {secoes.length > 0 && (
        <>
          <p className={styles.rotulo}>NESTE TEXTO</p>
          <ul className={styles.indice}>
            {secoes.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={s.id === ativa ? styles.ativa : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      <div className={styles.ferramentas}>
        <button type="button" onClick={() => ajustarFonte(-1.5)}>A−</button>
        <button
          type="button"
          title="Voltar ao tamanho padrão"
          disabled={fonte === PADRAO}
          onClick={() => aplicarFonte(PADRAO)}
        >
          A
        </button>
        <button type="button" onClick={() => ajustarFonte(1.5)}>A+</button>
        <button type="button" onClick={voltarAoTopo}>
          topo <ArrowUpToLine size={11} />
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(location.href);
              toast.sucesso("Link copiado", { rotulo: "copiado" });
            } catch (e) {
              toast.falhou("Não foi possível copiar o link", e);
            }
          }}
        >
          <Link2 size={11} /> copiar link
        </button>
      </div>
    </aside>
  );
}

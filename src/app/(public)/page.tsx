import Link from "next/link";
import { listarAutores, listarEtapas, listarPosts } from "@/lib/api";
import { MOODS } from "@/lib/moods";
import { versoDoDia } from "@/lib/versos";
import { urlDaImagem } from "@/lib/imagens";
import { PostList } from "@/components/blog/PostRow";
import { NewsletterCTA } from "@/components/layout/NewsletterCTA";
import styles from "./home.module.css";

const NA_HOME = 6;

export default async function Home() {
  const [{ items, totalItems }, autores, etapas, verso] = await Promise.all([
    listarPosts({ pageSize: NA_HOME }),
    listarAutores(),
    listarEtapas(),
    versoDoDia(),
  ]);
  const minutos = items.length
    ? Math.round(items.reduce((s, p) => s + (p.tempoLeitura ?? 0), 0) / items.length)
    : 0;

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroConteudo}>
          <p className="pc-eyebrow">
            meditações diárias · por <b>antonio &amp; jéssica</b>
          </p>
          <h1 className={styles.heroTitulo}>
            A dúvida não é o oposto da fé. É <em>por onde ela começa</em>.
          </h1>
          <p className={styles.heroLede}>
            Uma leitura curta por dia, do texto bíblico ao chão da vida real — escrita para quem
            pensa antes de crer, e continua pensando depois.
          </p>
          <div className={styles.heroBotoes}>
            <Link href="#hoje" className={styles.botao}>
              Começar por onde você está
            </Link>
            <Link href="/meditacoes" className={styles.botaoGhost}>
              Ver todas as meditações
            </Link>
          </div>
          <div className={styles.stats}>
            <div>
              <div className={styles.statNum}>{totalItems}</div>
              <div className={styles.statRotulo}>meditações</div>
            </div>
            <div>
              <div className={styles.statNum}>{minutos} min</div>
              <div className={styles.statRotulo}>leitura média</div>
            </div>
            <div>
              <div className={styles.statNum}>{autores.length}</div>
              <div className={styles.statRotulo}>quem escreve</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secao} id="hoje">
        <p className="pc-eyebrow">ponto de partida</p>
        <h2 className="pc-titulo">Como você chega hoje?</h2>
        <p className="pc-lede">
          Escolha a resposta honesta — não a que soa mais espiritual. A leitura se ajusta a ela.
        </p>
        {/* ponytail: chip leva ao arquivo filtrado; verso-por-estado em página fica para depois */}
        <div className={styles.moodChips}>
          {MOODS.map((m) => (
            <Link key={m.slug} href={`/meditacoes?estado=${m.slug}`} className={styles.chipLink}>
              {m.rotulo}
            </Link>
          ))}
        </div>
        <div className={styles.terminal}>
          <div className={styles.terminalChrome}>
            <i /><i /><i />
            <span>~/meditacoes/hoje</span>
          </div>
          <div className={styles.terminalCorpo}>
            <p className={styles.terminalCmd}>
              <span>› </span>abrir {verso.referencia.toLowerCase().replace(/\s+/g, "-").replace(/:/g, ".")}
            </p>
            <blockquote className={styles.terminalVerso}>“{verso.texto}”</blockquote>
            <cite className={styles.terminalCite}>{verso.referencia}</cite>
          </div>
        </div>
      </section>

      {etapas.length > 0 && (
        <section className={styles.secao} id="trilha">
          <p className="pc-eyebrow">percurso de leitura</p>
          <h2 className="pc-titulo">Quatro etapas, na ordem em que a fé costuma acontecer.</h2>
          <p className="pc-lede">
            Não é um curso. É o caminho que a maioria dos textos percorre: da pergunta ao
            descanso. Comece em qualquer ponto — mas comece.
          </p>
          <div className={styles.trilha}>
            {etapas.map((e) => (
              <Link key={e.id} href={`/meditacoes?etapa=${e.numero}`} className={styles.etapa}>
                <span className={styles.etapaNumero}>{String(e.numero).padStart(2, "0")}</span>
                <h3 className={styles.etapaTitulo}>{e.titulo}</h3>
                <p className={styles.etapaDescricao}>{e.descricao}</p>
                {e.refs && <span className={styles.etapaRefs}>&gt; {e.refs}</span>}
                <span className={styles.etapaCta}>abrir etapa →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.secao}>
        <div className={styles.secaoTopo}>
          <div>
            <p className="pc-eyebrow">o blog</p>
            <h2 className="pc-titulo">Últimas meditações</h2>
          </div>
          <Link href="/meditacoes" className={styles.linkArquivo}>
            arquivo completo →
          </Link>
        </div>
        <div className={styles.lista}>
          {items.length === 0 ? (
            <p className={styles.vazio}>Nenhuma meditação publicada ainda.</p>
          ) : (
            <PostList posts={items} />
          )}
        </div>
      </section>

      <section className={styles.secao} id="sobre">
        <p className="pc-eyebrow">sobre</p>
        <h2 className="pc-titulo">Quem escreve</h2>
        <div className={styles.autores}>
          {autores.map((a) => {
            const foto = urlDaImagem(a.imagemUrl);
            return (
              <div key={a.id} className={styles.autor}>
                {foto ? (
                  <img src={foto} alt="" className={styles.iniciais} />
                ) : (
                  <span className={styles.iniciais}>
                    {(a.nome ?? "")
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                )}
                <div>
                  <p className={styles.autorNome}>{a.nome}</p>
                  {a.bio && <p className={styles.autorBio}>{a.bio}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.secao}>
        <NewsletterCTA />
      </section>
    </>
  );
}

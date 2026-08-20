import Link from "next/link";
import { listarAutores, listarPosts } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";
import { PostList } from "@/components/blog/PostRow";
import { NewsletterCTA } from "@/components/layout/NewsletterCTA";
import styles from "./home.module.css";

const NA_HOME = 6;

export default async function Home() {
  const [{ items, totalItems }, autores] = await Promise.all([
    listarPosts({ pageSize: NA_HOME }),
    listarAutores(),
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

      {/* ponytail: MoodChips e verso-por-estado esperam campos de mood na API — por ora, um versículo fixo */}
      <section className={styles.secao} id="hoje">
        <p className="pc-eyebrow">ponto de partida</p>
        <h2 className="pc-titulo">Como você chega hoje?</h2>
        <p className="pc-lede">Comece pelo texto — um versículo para hoje, antes de qualquer comentário.</p>
        <div className={styles.terminal}>
          <div className={styles.terminalChrome}>
            <i /><i /><i />
            <span>~/meditacoes/hoje</span>
          </div>
          <div className={styles.terminalCorpo}>
            <p className={styles.terminalCmd}>
              <span>› </span>abrir 1-reis-19.7
            </p>
            <blockquote className={styles.terminalVerso}>
              “Levanta-te e come, porque o caminho te será sobremodo longo.”
            </blockquote>
            <cite className={styles.terminalCite}>1 Reis 19:7</cite>
          </div>
        </div>
      </section>

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

import Link from "next/link";
import { listarAutores, listarEtapas, listarPosts } from "@/lib/api";
import { MOODS } from "@/lib/moods";
import { versoDoDia } from "@/lib/versos";
import { urlDaImagem } from "@/lib/imagens";
import { PostList } from "@/components/blog/PostRow";
import { FeedAoVivo } from "@/components/blog/FeedAoVivo";
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
      <FeedAoVivo />
      <section className={styles.hero}>
        <div className={styles.heroConteudo}>
          <p className="pc-eyebrow">
            Meditações bíblicas · por <b>antonio &amp; jéssica</b>
          </p>
          <h1 className={styles.heroTitulo}>
            A dúvida não é o oposto da fé. É <em>por onde ela começa</em>.
          </h1>
          <p className={styles.heroLede}>
            Para quem crê, para quem duvida e para quem está no meio do caminho: meditações
            sobre a Bíblia, escritas como conversa, não como sermão.
          </p>
          <div className={styles.heroBotoes}>
            <Link href="#hoje" className={styles.botao}>
              Escolher uma leitura para hoje
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
              <div className={styles.statRotulo}>autores</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.secao} id="hoje">
        <p className="pc-eyebrow">ponto de partida</p>
        <h2 className="pc-titulo">Como você está hoje?</h2>
        <p className="pc-lede">
          Escolha o que mais se parece com o que você sente agora. A gente mostra meditações
          para esse momento.
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
            <span>versículo do dia</span>
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
          <h2 className="pc-titulo">Um caminho em etapas, da pergunta ao descanso.</h2>
          <p className="pc-lede">
            As meditações estão organizadas em etapas. Você pode começar pela que fizer mais
            sentido para você.
          </p>
          <div className={styles.trilha}>
            {etapas.map((e) => (
              <Link key={e.id} href={`/meditacoes?etapa=${e.numero}`} className={styles.etapa}>
                <span className={styles.etapaNumero}>{String(e.numero).padStart(2, "0")}</span>
                <h3 className={styles.etapaTitulo}>{e.titulo}</h3>
                <p className={styles.etapaDescricao}>{e.descricao}</p>
                {e.refs && <span className={styles.etapaRefs}>&gt; {e.refs}</span>}
                <span className={styles.etapaCta}>ver meditações →</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.secao}>
        <div className={styles.secaoTopo}>
          <div>
            <p className="pc-eyebrow">mais recentes</p>
            <h2 className="pc-titulo">Últimas meditações</h2>
          </div>
          <Link href="/meditacoes" className={styles.linkArquivo}>
            ver todas →
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

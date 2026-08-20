import Link from "next/link";
import { listarAutores, listarPosts } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";
import { PostList } from "@/components/blog/PostRow";
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
            <Link href="/meditacoes" className={styles.botao}>
              Começar a ler
            </Link>
            {items[0] && (
              <Link href={`/${items[0].slug}`} className={styles.botaoGhost}>
                A meditação de hoje
              </Link>
            )}
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
    </>
  );
}

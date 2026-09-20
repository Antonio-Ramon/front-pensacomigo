import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlLoginGoogle, usuarioLogado } from "@/lib/api-admin";
import { urlDaImagem } from "@/lib/imagens";
import { Header } from "@/components/layout/Header";
import { MenuMobile } from "@/components/layout/MenuMobile";
import { BotaoSair } from "./BotaoSair";
import styles from "./escrivaninha.module.css";

export const metadata: Metadata = { title: "Escrivaninha" };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const usuario = await usuarioLogado();

  if (!usuario) {
    return (
      <main className={styles.login}>
        <div>
          <p className="pc-eyebrow">área do autor</p>
          <h1 className={styles.h1}>Entrar no painel</h1>
          {/* <a> comum de propósito: é um redirect para a API, fora do roteador do Next */}
          <a href={urlLoginGoogle("/escrivaninha")} className={styles.loginBotao}>
            entrar com google →
          </a>
        </div>
      </main>
    );
  }

  const foto = urlDaImagem(usuario.imagemUrl);
  const iniciais = (usuario.nome ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const avatar = foto ? (
    <img src={foto} alt="" className={styles.usuarioFoto} />
  ) : (
    <span className={styles.usuarioIniciais}>{iniciais}</span>
  );

  return (
    <>
      <Header
        acoes={
          <>
            <span className={styles.usuario} title={usuario.email ?? undefined}>
              {avatar}
              <span className={styles.usuarioTexto}>
                <span className={styles.usuarioNome}>{usuario.nome?.toLowerCase()}</span>
                {usuario.isAdmin && <span className={styles.usuarioPapel}>admin</span>}
              </span>
            </span>
            {/* no celular o sair mora na gaveta — aqui ele sai de cena pelo CSS */}
            <span className={styles.sairHeader}>
              <BotaoSair />
            </span>
          </>
        }
        menu={
          <MenuMobile>
            <span data-quem>
              {avatar}
              <span>
                <span className={styles.usuarioNome}>{usuario.nome?.toLowerCase()}</span>
                {usuario.isAdmin && <span className={styles.usuarioPapel}>admin</span>}
              </span>
            </span>
            <Link href="/escrivaninha">Meditações</Link>
            <Link href="/escrivaninha/editor">Nova meditação</Link>
            {/* rodapé da gaveta: as duas ações menores lado a lado, em mono */}
            <span data-rodape>
              <Link href="/" className={styles.linkVerBlog}>
                ver blog <ArrowRight size={11} />
              </Link>
              <BotaoSair />
            </span>
          </MenuMobile>
        }
      >
        <span className={styles.breadcrumb}>/ escrivaninha / meditações</span>
        <div className={styles.acoesHeader}>
          <Link href="/" className={styles.linkVerBlog}>
            ver blog <ArrowRight size={11} />
          </Link>
          <Link href="/escrivaninha/editor" className={styles.botaoNova}>
            Nova meditação
          </Link>
        </div>
      </Header>
      <main className={`${styles.wrap} ${styles.main}`}>{children}</main>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlLoginGoogle, usuarioLogado } from "@/lib/api-admin";
import { urlDaImagem } from "@/lib/imagens";
import { ThemeSwitcher } from "@/components/layout/ThemeSwitcher";
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

  return (
    <>
      <header className={styles.header}>
        <div className={`${styles.wrap} ${styles.headerInner}`}>
          <div className={styles.marca}>
            <Link href="/" className={styles.wordmark}>
              pensa<span>·</span>comigo
            </Link>
            <span className={styles.breadcrumb}>/ escrivaninha / meditações</span>
          </div>
          <div className={styles.acoesHeader}>
            <Link href="/" className={styles.linkVerBlog}>
              ver blog <ArrowRight size={11} />
            </Link>
            <Link href="/escrivaninha/editor" className={styles.botaoNova}>
              Nova meditação
            </Link>
            <span className={styles.usuario} title={usuario.email ?? undefined}>
              {urlDaImagem(usuario.imagemUrl) ? (
                <img src={urlDaImagem(usuario.imagemUrl)} alt="" className={styles.usuarioFoto} />
              ) : (
                <span className={styles.usuarioIniciais}>
                  {(usuario.nome ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              )}
              <span>
                <span className={styles.usuarioNome}>{usuario.nome?.toLowerCase()}</span>
                {usuario.isAdmin && <span className={styles.usuarioPapel}>admin</span>}
              </span>
            </span>
            <BotaoSair />
            <div className={styles.temaBox}>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </header>
      <main className={`${styles.wrap} ${styles.main}`}>{children}</main>
    </>
  );
}

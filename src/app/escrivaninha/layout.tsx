import type { Metadata } from "next";
import Link from "next/link";
import { urlLoginGoogle, usuarioLogado } from "@/lib/api-admin";
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
              ver blog →
            </Link>
            <Link href="/escrivaninha/editor" className={styles.botaoNova}>
              Nova meditação
            </Link>
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

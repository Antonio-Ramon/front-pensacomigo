import Link from "next/link";
import { AdminLink } from "./AdminLink";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./layout.module.css";

/**
 * Barra fixa do topo, a mesma no blog e na escrivaninha. A casca — wordmark, container
 * e seletor de tema — é invariante; o miolo vem em `children`, montado por quem conhece
 * a página (navegação pública, breadcrumb e ações do autor).
 */
export function Header({ children }: { children?: React.ReactNode }) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.wordmark}>
          Pensa<span>·</span>Comigo
        </Link>
        {children}
        <div className={styles.temaBox}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

/** Navegação do blog — mora aqui junto do CSS dela; o layout público a passa ao Header. */
export function NavPublica() {
  return (
    <nav className={styles.nav}>
      <Link href="/meditacoes">Meditações</Link>
      <Link href="/#newsletter">Newsletter</Link>
      <Link href="/#sobre">Sobre</Link>
      <AdminLink />
    </nav>
  );
}

import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.wordmark}>
          pensa<span>·</span>comigo
        </Link>
        <nav className={styles.nav}>
          <Link href="/meditacoes">meditações</Link>
        </nav>
        <div className={styles.temaBox}>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

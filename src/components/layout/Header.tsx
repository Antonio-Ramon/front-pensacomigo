import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./layout.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.wordmark}>
          Pensa Comigo
        </Link>
        <nav className={styles.nav}>
          <Link href="/">Início</Link>
          <ThemeSwitcher />
        </nav>
      </div>
    </header>
  );
}

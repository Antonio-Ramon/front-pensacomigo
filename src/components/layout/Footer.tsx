import Link from "next/link";
import styles from "./layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>© {new Date().getFullYear()} pensa comigo · a fé que te obriga a pensar</span>
        <span className={styles.footerLinks}>
          <Link href="/meditacoes">arquivo</Link>
        </span>
      </div>
    </footer>
  );
}

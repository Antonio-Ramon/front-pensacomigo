import styles from "./layout.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>Pensa Comigo — a fé que te obriga a pensar</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}

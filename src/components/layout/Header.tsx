import Link from "next/link";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./layout.module.css";

/**
 * Barra fixa do topo, a mesma no blog e na escrivaninha. A casca — wordmark, container
 * e seletor de tema — é invariante; o miolo vem de quem conhece a página:
 * `children` é a faixa do meio (navegação pública, breadcrumb e ações do autor, que
 * o CSS esconde no celular), `acoes` fica sempre visível ao lado do tema e `menu` é
 * a gaveta que só aparece abaixo de 760px.
 */
export function Header({
  children,
  acoes,
  menu,
}: {
  children?: React.ReactNode;
  acoes?: React.ReactNode;
  menu?: React.ReactNode;
}) {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <Link href="/" className={styles.wordmark}>
          Pensa<span>·</span>Comigo
        </Link>
        {children}
        <div className={styles.direita}>
          <div className={styles.temaBox}>
            <ThemeSwitcher />
          </div>
          {acoes}
          {menu}
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
    </nav>
  );
}

/** Os mesmos destinos da NavPublica, no desenho da gaveta. */
export function LinksPublicos() {
  return (
    <>
      <Link href="/meditacoes">Meditações</Link>
      <Link href="/#newsletter">Newsletter</Link>
      <Link href="/#sobre">Sobre</Link>
    </>
  );
}

import Link from "next/link";
import styles from "./emptystate.module.css";

/** Estado vazio do design system: label mono + frase serif + ação. Nunca ilustrado. */
export function EmptyState({
  rotulo = "NADA POR AQUI",
  frase,
  acao,
}: {
  rotulo?: string;
  frase: string;
  acao?: { label: string; href: string };
}) {
  return (
    <div className={styles.vazio}>
      <p className={styles.rotulo}>{rotulo}</p>
      <p className={styles.frase}>{frase}</p>
      {acao && (
        <Link href={acao.href} className={styles.acao}>
          {acao.label}
        </Link>
      )}
    </div>
  );
}

"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./escrivaninha.module.css";

/**
 * Sem este boundary, um throw das páginas (API fora, 500 na listagem) sobe até a raiz
 * e o autor vê a tela genérica do Next, sem header e sem caminho de volta.
 */
export default function ErroEscrivaninha({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <EmptyState
        rotulo="DEU RUIM"
        frase="A API não respondeu — esta página não pôde ser carregada. Nada do que você já salvou se perdeu."
      />
      <p style={{ textAlign: "center" }}>
        <button type="button" className={styles.loginBotao} onClick={reset}>
          tentar de novo →
        </button>
      </p>
      {/* digest é o único fio até o log do servidor: a mensagem real não chega ao browser em produção */}
      {error.digest && <p className={styles.vazio}>código do erro: {error.digest}</p>}
    </>
  );
}

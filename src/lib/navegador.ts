/**
 * Base da API para chamadas FEITAS NO BROWSER (curtida, comentário). Não pode passar
 * pelo servidor do front: o viewer_hash da API nasce do IP da conexão, e um proxy
 * colapsaria todos os leitores num visitante só — rate limit valendo para o site
 * inteiro e curtida de terceiro virando no-op.
 */
export const API_PUBLICA = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

/** Mensagem de erro da API (ProblemDetails) — ou a genérica, quando não vier nada útil. */
export async function mensagemDeErro(res: Response) {
  try {
    const corpo = await res.json();
    return corpo.detail || corpo.title || `Erro ${res.status}.`;
  } catch {
    return `Erro ${res.status}.`;
  }
}

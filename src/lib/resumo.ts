import type { Bloco } from "@/lib/api";

// Não existe campo de resumo no backend (decisão 13 do briefing):
// deriva ~160 caracteres do primeiro bloco de texto, sem HTML.
export function resumoDoPost(conteudo?: Bloco[] | null): string {
  const html = conteudo?.find((b) => b.tipo === 0 && b.html)?.html ?? "";
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return texto.length > 160 ? `${texto.slice(0, 157).trimEnd()}…` : texto;
}

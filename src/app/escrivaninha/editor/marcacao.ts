// Marcação de texto no estilo WhatsApp: o textarea guarda MARCADORES, a API guarda o
// HTML da whitelist (CONTEXT.md). A ida e a volta moram aqui — e só valem para o bloco
// de parágrafo, que é o único de texto livre.
//
//   *negrito*  _itálico_  ~tachado~  `código`
//   > citação      - item de lista      1. item numerado
//
// ponytail: marcador em textarea em vez de contenteditable/Tiptap. Se um dia precisar de
// link inline ou tabela, aí sim vale trocar por um editor de verdade.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unesc = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

/** marcador → tag; o par tem de estar colado ao texto (`*a*` sim, `* a *` não) */
const PARES: [RegExp, string][] = [
  [/\*(?=\S)([^*\n]*?\S)\*/g, "strong"],
  [/_(?=\S)([^_\n]*?\S)_/g, "em"],
  [/~(?=\S)([^~\n]*?\S)~/g, "s"],
];

// sentinela do trecho de codigo; some antes de o HTML sair daqui
const SENTINELA = (i: number) => `@@cod${i}@@`;

function inlineParaHtml(linha: string): string {
  // `código` sai primeiro e vira sentinela: o `*` de dentro dele não pode virar negrito
  const codigos: string[] = [];
  let s = esc(linha).replace(/`(?=\S)([^`\n]*?\S)`/g, (_, c) => SENTINELA(codigos.push(c) - 1));
  for (const [re, tag] of PARES) s = s.replace(re, `<${tag}>$1</${tag}>`);
  return s.replace(/@@cod(\d+)@@/g, (_, i) => `<code>${codigos[+i]}</code>`);
}

function inlineDeHtml(s: string): string {
  return unesc(
    s
      .replace(/<code>([\s\S]*?)<\/code>/g, "`$1`")
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/g, "*$2*")
      .replace(/<(em|i)>([\s\S]*?)<\/\1>/g, "_$2_")
      .replace(/<(s|del)>([\s\S]*?)<\/\1>/g, "~$2~"),
  );
}

type Linha = "cita" | "ul" | "ol" | "p" | "vazio";
const daLinha = (l: string): Linha =>
  /^>\s?/.test(l)
    ? "cita"
    : /^- /.test(l)
      ? "ul"
      : /^\d+[.)] /.test(l)
        ? "ol"
        : l.trim()
          ? "p"
          : "vazio";

/** texto com marcadores → HTML da whitelist */
export function paraHtml(texto: string): string {
  const linhas = texto.split("\n");
  const saida: string[] = [];
  let i = 0;
  while (i < linhas.length) {
    const tipo = daLinha(linhas[i]);
    if (tipo === "vazio") {
      i++;
      continue;
    }
    const grupo: string[] = [];
    while (i < linhas.length && daLinha(linhas[i]) === tipo) grupo.push(linhas[i++]);

    if (tipo === "p") saida.push(`<p>${grupo.map(inlineParaHtml).join("<br>")}</p>`);
    else if (tipo === "cita")
      saida.push(
        `<blockquote>${grupo
          .map((l) => inlineParaHtml(l.replace(/^>\s?/, "")))
          .join("<br>")}</blockquote>`,
      );
    else
      saida.push(
        `<${tipo}>${grupo
          .map((l) => `<li>${inlineParaHtml(l.replace(/^(?:- |\d+[.)] )/, ""))}</li>`)
          .join("")}</${tipo}>`,
      );
  }
  return saida.join("");
}

const BLOCOS = /<(p|blockquote|ul|ol)>([\s\S]*?)<\/\1>/g;

/** o HTML é só p/blockquote/ul/ol no topo? então cabe no bloco de parágrafo */
export function ehMarcavel(html: string): boolean {
  const h = html.trim();
  return h.length > 0 && h.replace(BLOCOS, "").trim() === "";
}

/** HTML da whitelist → texto com marcadores (inverso de `paraHtml`) */
export function deHtml(html: string): string {
  const linhas = (s: string) =>
    s
      .replace(/<\/p>\s*<p>/g, "<br>")
      .replace(/<\/?p>/g, "")
      .split(/<br\s*\/?>/)
      .map((l) => inlineDeHtml(l).trim());

  const partes: string[] = [];
  for (const [, tag, dentro] of html.trim().matchAll(BLOCOS)) {
    if (tag === "p") partes.push(linhas(dentro).join("\n"));
    else if (tag === "blockquote")
      partes.push(
        linhas(dentro)
          .map((l) => `> ${l}`)
          .join("\n"),
      );
    else {
      const itens = [...dentro.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((m) =>
        inlineDeHtml(m[1]).trim(),
      );
      partes.push(itens.map((t, i) => (tag === "ol" ? `${i + 1}. ${t}` : `- ${t}`)).join("\n"));
    }
  }
  return partes.join("\n\n");
}

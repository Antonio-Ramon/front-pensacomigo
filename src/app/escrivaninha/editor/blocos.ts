import type { Bloco } from "@/lib/api";

// Bloco na visão do editor: os tipos de texto viram HTML da whitelist (CONTEXT.md);
// imagem e link são os tipos 1 e 2 da API. "html" é o fallback de round-trip para
// HTML que o parser não reconhece — edita-se cru, nada se perde.
export type TipoEditor =
  | "paragrafo"
  | "subtitulo"
  | "versiculo"
  | "nota"
  | "aplicacao"
  | "html"
  | "imagem"
  | "link";

export type BlocoEditor = {
  key: number;
  tipo: TipoEditor;
  /** texto do bloco; alt na imagem; HTML cru no fallback */
  texto: string;
  /** referência do versículo (ex. "1 Reis 19:7") */
  ref: string;
  imagemPath?: string | null;
  imagemUrl?: string | null;
  linkUrl?: string;
  linkTitulo?: string | null;
  linkDescricao?: string | null;
  linkThumbnail?: string | null;
  linkSiteName?: string | null;
};

let seq = 1;
export function novoBloco(tipo: TipoEditor): BlocoEditor {
  return { key: seq++, tipo, texto: "", ref: "" };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unesc = (s: string) =>
  s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const brParaQuebra = (s: string) => unesc(s.replace(/<br\s*\/?>/g, "\n"));
// CSS do .verse já põe as aspas curvas (quotes do <q>) — tira as digitadas para não dobrar
const semAspas = (s: string) => s.trim().replace(/^[“"']+|[”"']+$/g, "");

function htmlDoTexto(b: BlocoEditor): string {
  const t = b.texto.trim();
  switch (b.tipo) {
    case "subtitulo":
      return `<h2>${esc(t)}</h2>`;
    case "versiculo":
      return `<div class="verse"><div class="r">${esc(b.ref.trim())}</div><q>${esc(semAspas(t))}</q></div>`;
    case "nota":
      return `<div class="aside"><b>nota de estudo</b>${esc(t).replace(/\n/g, "<br>")}</div>`;
    case "aplicacao":
      return `<div class="aside"><b>aplicação</b><ul>${t
        .split("\n")
        .filter((l) => l.trim())
        .map((l) => `<li>${esc(l.trim())}</li>`)
        .join("")}</ul></div>`;
    case "html":
      return b.texto;
    default:
      // parágrafo: linha em branco separa <p>, quebra simples vira <br>
      return t
        .split(/\n{2,}/)
        .map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`)
        .join("");
  }
}

/** Editor → conteúdo jsonb da API (descarta blocos vazios). */
export function paraConteudo(blocos: BlocoEditor[]): Bloco[] {
  return blocos
    .filter((b) =>
      b.tipo === "imagem" ? b.imagemPath || b.imagemUrl : b.tipo === "link" ? b.linkUrl : b.texto.trim(),
    )
    .map((b, i): Bloco => {
      if (b.tipo === "imagem")
        return { tipo: 1, ordem: i, imagemPath: b.imagemPath, imagemUrl: b.imagemUrl, alt: b.texto.trim() || null };
      if (b.tipo === "link")
        return {
          tipo: 2,
          ordem: i,
          linkUrl: b.linkUrl,
          linkTitulo: b.linkTitulo,
          linkDescricao: b.linkDescricao,
          linkThumbnail: b.linkThumbnail,
          linkSiteName: b.linkSiteName,
        };
      return { tipo: 0, ordem: i, html: htmlDoTexto(b) };
    });
}

/** Conteúdo da API → blocos do editor (HTML desconhecido cai no tipo "html"). */
export function deConteudo(conteudo: Bloco[] | null | undefined): BlocoEditor[] {
  return (conteudo ?? [])
    .slice()
    .sort((a, b) => (a.ordem ?? 0) - (b.ordem ?? 0))
    .map((b): BlocoEditor => {
      if (b.tipo === 1)
        return { ...novoBloco("imagem"), texto: b.alt ?? "", imagemPath: b.imagemPath, imagemUrl: b.imagemUrl };
      if (b.tipo === 2)
        return {
          ...novoBloco("link"),
          linkUrl: b.linkUrl ?? "",
          linkTitulo: b.linkTitulo,
          linkDescricao: b.linkDescricao,
          linkThumbnail: b.linkThumbnail,
          linkSiteName: b.linkSiteName,
        };
      return doHtml(b.html ?? "");
    });
}

function doHtml(html: string): BlocoEditor {
  const h = html.trim();
  let m = h.match(/^<h2>([\s\S]*)<\/h2>$/);
  if (m) return { ...novoBloco("subtitulo"), texto: unesc(m[1]) };

  m = h.match(/^<div class="verse"><div class="r">([\s\S]*?)<\/div><q>([\s\S]*)<\/q><\/div>$/);
  if (m) return { ...novoBloco("versiculo"), ref: unesc(m[1]), texto: unesc(m[2]) };

  m = h.match(/^<div class="aside"><b>aplicação<\/b><ul>([\s\S]*)<\/ul><\/div>$/);
  if (m)
    return {
      ...novoBloco("aplicacao"),
      texto: [...m[1].matchAll(/<li>([\s\S]*?)<\/li>/g)].map((x) => unesc(x[1])).join("\n"),
    };

  m = h.match(/^<div class="aside"><b>[\s\S]*?<\/b>([\s\S]*)<\/div>$/);
  if (m) return { ...novoBloco("nota"), texto: brParaQuebra(m[1]) };

  if (/^(<p>(?:(?!<\/?p>)[\s\S])*<\/p>)+$/.test(h))
    return {
      ...novoBloco("paragrafo"),
      texto: [...h.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((x) => brParaQuebra(x[1])).join("\n\n"),
    };

  return { ...novoBloco("html"), texto: h };
}

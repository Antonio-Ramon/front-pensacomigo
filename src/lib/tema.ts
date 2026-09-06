/**
 * Tema visual do site (papel/tinta/terra): fonte única do nome dos temas, da chave
 * do localStorage e do caminho dos favicons.
 *
 * O favicon acompanha o tema — cada tema tem um ícone próprio em /public/favicons.
 * A troca é feita no DOM (href do <link rel="icon">) porque o tema só existe no
 * cliente: o servidor sempre renderiza "papel".
 */

export const TEMAS = ["papel", "tinta", "terra"] as const;
export type Tema = (typeof TEMAS)[number];

export const TEMA_PADRAO: Tema = "papel";

/** Chave do localStorage. Duplicada no script inline do layout — mude nos dois. */
export const CHAVE_TEMA = "pc-theme";

export const faviconDoTema = (t: Tema) => `/favicons/${t}-96.png`;
export const appleIconDoTema = (t: Tema) => `/favicons/${t}-180.png`;

/**
 * Aponta os <link> de ícone para o tema. No-op fora do browser.
 * Só escreve quando o href está errado — assim pode ser chamada de dentro de um
 * MutationObserver sem realimentá-lo.
 */
export function aplicarFavicon(tema: Tema) {
  if (typeof document === "undefined") return;
  const alvos: [string, string][] = [
    ['link[rel="icon"]', faviconDoTema(tema)],
    ['link[rel="apple-touch-icon"]', appleIconDoTema(tema)],
  ];
  for (const [seletor, href] of alvos) {
    document.querySelectorAll<HTMLLinkElement>(seletor).forEach((l) => {
      if (l.getAttribute("href") !== href) l.setAttribute("href", href);
    });
  }
}

/** Troca o tema: data-theme, favicon e localStorage. */
export function aplicarTema(tema: Tema) {
  document.documentElement.dataset.theme = tema;
  aplicarFavicon(tema);
  try {
    localStorage.setItem(CHAVE_TEMA, tema);
  } catch {}
}

/** Tema já aplicado no <html> pelo script inline. */
export function temaAtual(): Tema {
  const t = document.documentElement.dataset.theme;
  return TEMAS.includes(t as Tema) ? (t as Tema) : TEMA_PADRAO;
}

// O post grava o path do bucket; a exibição monta a URL pública do storage.
export function urlDaImagem(pathOuUrl?: string | null): string | undefined {
  if (!pathOuUrl) return undefined;
  if (/^https?:\/\//.test(pathOuUrl)) return pathOuUrl;
  const base = process.env.NEXT_PUBLIC_STORAGE_URL;
  if (!base) return undefined;
  return `${base.replace(/\/$/, "")}/${pathOuUrl.replace(/^\//, "")}`;
}

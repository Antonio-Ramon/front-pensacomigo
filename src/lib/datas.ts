export function dataPorExtenso(iso?: string) {
  return iso
    ? new Date(iso).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })
    : "";
}

/** Data curta do PostRow: "14 ago 2026" (sem "de", como na referência). */
export function dataCurta(iso?: string) {
  return iso
    ? new Date(iso)
        .toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
        .replace(/\./g, "")
        .replace(/ de /g, " ")
    : "";
}

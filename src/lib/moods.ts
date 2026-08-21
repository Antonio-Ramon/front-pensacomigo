/** Mood do backend (enum 0–4) ↔ slug de URL ↔ rótulo — "Como você chega hoje?". */
export const MOODS = [
  { valor: 0, slug: "cansado", rotulo: "cansado" },
  { valor: 1, slug: "duvida", rotulo: "em dúvida" },
  { valor: 2, slug: "medo", rotulo: "com medo" },
  { valor: 3, slug: "grato", rotulo: "grato" },
  { valor: 4, slug: "luto", rotulo: "em luto" },
] as const;

export const etapaCurta = (numero?: number, titulo?: string | null) =>
  `${String(numero ?? 0).padStart(2, "0")} ${(titulo ?? "").toLowerCase()}`;

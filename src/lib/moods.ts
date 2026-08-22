import type { Mood } from "@/lib/api";

/** Mood do backend (nome do enum) ↔ slug de URL ↔ rótulo — "Como você chega hoje?". */
export const MOODS = [
  { valor: "Cansado", slug: "cansado", rotulo: "cansado" },
  { valor: "EmDuvida", slug: "duvida", rotulo: "em dúvida" },
  { valor: "ComMedo", slug: "medo", rotulo: "com medo" },
  { valor: "Grato", slug: "grato", rotulo: "grato" },
  { valor: "EmLuto", slug: "luto", rotulo: "em luto" },
] as const satisfies readonly { valor: Mood; slug: string; rotulo: string }[];

export const etapaCurta = (numero?: number, titulo?: string | null) =>
  `${String(numero ?? 0).padStart(2, "0")} ${(titulo ?? "").toLowerCase()}`;

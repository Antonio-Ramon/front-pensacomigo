// Verso do dia via bible-api.com (gratuita, sem chave, tradução Almeida).
// Cache de 24h = um verso por dia; se a API cair, cai no verso fixo.
// Livros curados para evitar sorteio de genealogia/censo.
const LIVROS = "PSA,PRO,ISA,MAT,MRK,LUK,JHN,ROM,PHP,COL,JAS,1PE";

const RESERVA = {
  referencia: "1 Reis 19:7",
  texto: "Levanta-te e come, porque o caminho te será sobremodo longo.",
};

export async function versoDoDia() {
  try {
    const res = await fetch(`https://bible-api.com/data/almeida/random/${LIVROS}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return RESERVA;
    const { random_verse: v } = await res.json();
    if (!v?.text) return RESERVA;
    return {
      referencia: `${v.book} ${v.chapter}:${v.verse}`,
      texto: String(v.text).trim().replace(/^["“]|["”]$/g, ""),
    };
  } catch {
    return RESERVA;
  }
}

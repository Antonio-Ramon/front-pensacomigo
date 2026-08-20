// Bio hardcoded até o backend expor autores — service-pensacomigo#22.
// A chave é o nome como vem no seed do backend.
// ponytail: placeholders — cada autor edita a própria bio aqui.
export const bios: Record<string, string> = {
  "Antonio Ramon":
    "Escreve em Pensa Comigo sobre fé que se pensa — meditações que se aproximam de pregações escritas.",
  "Jéssica Rose":
    "Escreve em Pensa Comigo meditações reflexivas — a fé que te obriga a pensar.",
};

export function bioDoAutor(nome?: string | null): string | undefined {
  return nome ? bios[nome] : undefined;
}

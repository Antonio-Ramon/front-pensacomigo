import type { Metadata } from "next";
import PublicLayout from "./(public)/layout";
import { EmptyState } from "@/components/ui/EmptyState";

export const metadata: Metadata = { title: "Página não encontrada" };

// Fica na raiz para cobrir também URL que não casa com rota nenhuma; o layout
// público vem à mão porque a raiz não passa pelo grupo (public).
export default function NaoEncontrada() {
  return (
    <PublicLayout>
      <EmptyState
        rotulo="PÁGINA NÃO ENCONTRADA"
        frase="Essa página não existe (ou mudou de lugar)."
        acao={{ label: "ver todas as meditações →", href: "/meditacoes" }}
      />
    </PublicLayout>
  );
}

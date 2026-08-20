import { NextResponse } from "next/server";
import { usuarioLogado } from "@/lib/api-admin";

// O header público é estático — a checagem de sessão sai daqui para não
// derrubar o cache das páginas. Só diz se é admin, nunca expõe o perfil.
export async function GET() {
  const usuario = await usuarioLogado().catch(() => null);
  return NextResponse.json({ admin: !!usuario?.isAdmin });
}

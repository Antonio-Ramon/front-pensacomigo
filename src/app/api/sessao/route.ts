import { NextResponse } from "next/server";
import { COOKIE_SESSAO, usuarioLogado } from "@/lib/api-admin";

// O header público é estático — a checagem de sessão sai daqui para não
// derrubar o cache das páginas. Devolve o mínimo para o dono da sessão se
// reconhecer na tela (nome e foto ao comentar); email nunca sai daqui.
export async function GET() {
  const usuario = await usuarioLogado().catch(() => null);
  if (!usuario?.isAdmin) return NextResponse.json({ admin: false });

  return NextResponse.json({
    admin: true,
    id: usuario.id,
    nome: usuario.nome,
    imagemUrl: usuario.imagemUrl,
  });
}

// O logout na API expira o cookie do domínio dela; o gravado aqui precisa sair junto.
export async function DELETE() {
  const res = new NextResponse(null, { status: 204 });
  res.cookies.delete(COOKIE_SESSAO);
  return res;
}

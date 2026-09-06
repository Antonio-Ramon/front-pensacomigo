import { NextRequest, NextResponse } from "next/server";
import { COOKIE_SESSAO } from "@/lib/api-admin";

// API e front em domínios diferentes: o cookie da API é host-only e o servidor do Next
// nunca o receberia. O callback do Google devolve o token aqui e quem grava é este handler,
// no domínio do front — a URL com o token morre no redirect seguinte.
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const sessao = searchParams.get("sessao");
  const para = searchParams.get("para");

  // Guarda contra open redirect: só volta para uma página do próprio front.
  const destino = para?.startsWith(origin + "/") || para === origin ? para : origin;

  const res = NextResponse.redirect(destino);
  if (sessao) {
    res.cookies.set(COOKIE_SESSAO, sessao, {
      httpOnly: true,
      secure: req.nextUrl.protocol === "https:",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });
  }
  return res;
}

import { cookies } from "next/headers";
import type { components } from "@/types/api";

export type Perfil = components["schemas"]["PerfilResponse"];

const BASE = process.env.API_URL ?? "http://localhost:5001";

/**
 * Fetch autenticado do lado do servidor: repassa o cookie de sessão (pc_sessao,
 * httpOnly) para a API e nunca cacheia. Em dev front e API compartilham o host
 * "localhost", então o cookie da API chega ao Next; em produção ambos precisam
 * servir sob o mesmo domínio.
 */
export async function fetchAdmin(path: string, init: RequestInit = {}) {
  const sessao = (await cookies()).get("pc_sessao")?.value;
  return fetch(`${BASE}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      ...init.headers,
      ...(sessao ? { cookie: `pc_sessao=${sessao}` } : {}),
    },
  });
}

/** Perfil do logado — ou null (anônimo/sessão vencida). */
export async function usuarioLogado(): Promise<Perfil | null> {
  const res = await fetchAdmin("/api/v1/Usuarios/me");
  return res.ok ? res.json() : null;
}

/** URL que inicia o OAuth no backend; o callback devolve o leitor a returnUrl. */
export function urlLoginGoogle(returnUrl: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return `${BASE}/api/v1/auth/google/iniciar?returnUrl=${encodeURIComponent(site + returnUrl)}`;
}

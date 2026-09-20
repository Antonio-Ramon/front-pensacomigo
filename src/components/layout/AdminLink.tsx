"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { urlDaImagem } from "@/lib/imagens";
import styles from "./layout.module.css";

type Sessao = { admin: boolean; nome?: string | null; imagemUrl?: string | null };

const iniciais = (nome?: string | null) =>
  (nome ?? "?")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/**
 * Atalho do autor no header — só aparece para admin logado. É a foto da conta, com
 * anel no accent: no celular não sobra largura para a pill "admin →", e a foto já
 * diz "você está logado como administrador" sem gastar linha.
 */
export function AdminLink() {
  const [sessao, setSessao] = useState<Sessao | null>(null);

  useEffect(() => {
    fetch("/api/sessao")
      .then((r) => (r.ok ? r.json() : null))
      .then((s: Sessao | null) => setSessao(s?.admin ? s : null))
      .catch(() => {});
  }, []);

  if (!sessao) return null;
  const foto = urlDaImagem(sessao.imagemUrl);
  const nome = sessao.nome?.trim() || "admin";

  return (
    <Link
      href="/escrivaninha"
      className={styles.avatarAdmin}
      title={`${nome} · painel do autor`}
      aria-label={`Painel do autor (${nome})`}
    >
      {foto ? (
        <img src={foto} alt="" />
      ) : (
        <span className={styles.avatarIniciais}>{iniciais(sessao.nome)}</span>
      )}
    </Link>
  );
}

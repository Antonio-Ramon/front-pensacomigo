"use client";

import { useEffect, useState } from "react";
import type { components } from "@/types/api";
import { API_PUBLICA, mensagemDeErro } from "@/lib/navegador";
import { dataCurta } from "@/lib/datas";
import { urlDaImagem } from "@/lib/imagens";
import styles from "./interacoes.module.css";

type Comentario = components["schemas"]["ComentarioListaResponse"];
type Resposta = components["schemas"]["RespostaResponse"];

/** O que /api/sessao devolve — só o dono da sessão se vê aqui. */
type Sessao = { admin?: boolean; id?: string; nome?: string; imagemUrl?: string | null };

const iniciais = (nome?: string | null) =>
  (nome ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/** Avatar da conversa: foto de quem tem conta, iniciais para o visitante anônimo. */
function Avatar({ nome, foto }: { nome?: string | null; foto?: string | null }) {
  const url = urlDaImagem(foto);
  return url ? (
    <img src={url} alt="" className={styles.comentarioFoto} />
  ) : (
    <span className={styles.comentarioAvatar}>{iniciais(nome)}</span>
  );
}

/** Cabeçalho de um comentário: nome, marca de autor do post e data. */
function Assinatura({ item }: { item: Comentario | Resposta }) {
  return (
    <>
      <b>{item.autor}</b>
      {item.ehAutorDoPost && <span className={styles.selo}>autor</span>}
      <span>{dataCurta(item.dataCriacao)}</span>
    </>
  );
}

/**
 * Conversa do post. Lista e envio saem do BROWSER: a API identifica o visitante pelo
 * IP da conexão para o rate limit de 5/min — pelo servidor do front todos seriam um só.
 * Quem está logado comenta pela própria conta (cookie de sessão junto no POST), e a
 * API assina com o nome cadastrado — o formulário nem oferece o campo de nome.
 */
export function Comentarios({ postId, autorId }: { postId: string; autorId?: string }) {
  const [itens, setItens] = useState<Comentario[]>([]);
  const [sessao, setSessao] = useState<Sessao | null>(null);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);
  // respostas aninham um nível só (padrão do design system) — responder só em comentário raiz
  const [respondendoA, setRespondendoA] = useState<{ id: string; autor: string } | null>(null);

  const logado = sessao?.admin ? sessao : null;
  // O selo só vale para quem escreveu ESTE post: admin visitando post do outro autor comenta
  // como qualquer leitor com conta.
  const ehAutorDoPost = !!logado && !!autorId && logado.id === autorId;

  useEffect(() => {
    fetch(`${API_PUBLICA}/api/v1/posts/${postId}/comentarios?PageSize=50&OrderBy=dataCriacao`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((p) => setItens(p.items ?? []))
      .catch(() => setAviso("Não foi possível carregar os comentários."));
  }, [postId]);

  useEffect(() => {
    fetch("/api/sessao")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => setSessao(s))
      .catch(() => {});
  }, []);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!logado && !nome.trim()) return setAviso("⚠ o nome é obrigatório.");
    if (!texto.trim()) return setAviso("⚠ escreva o comentário.");

    setEnviando(true);
    try {
      const res = await fetch(`${API_PUBLICA}/api/v1/posts/${postId}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Cookie de sessão (httpOnly) na chamada: é o que faz a API reconhecer o autor.
        // Sem ele — leitor comum — o comentário segue anônimo, como sempre foi.
        credentials: "include",
        body: JSON.stringify({
          // Logado não manda nome: a API assina com o da conta e ignoraria este campo.
          autor: logado ? null : nome.trim(),
          conteudo: texto.trim(),
          parentId: respondendoA?.id ?? null,
        }),
      });
      if (!res.ok) {
        setAviso(`⚠ ${await mensagemDeErro(res)}`);
        return;
      }
      const criado = await res.json();
      const novo = {
        id: criado.id,
        autor: criado.autor,
        conteudo: criado.conteudo,
        dataCriacao: new Date().toISOString(),
        autorImagemUrl: logado?.imagemUrl ?? null,
        ehAutorDoPost,
      };
      setItens((c) =>
        respondendoA
          ? c.map((i) =>
              i.id === respondendoA.id ? { ...i, respostas: [...(i.respostas ?? []), novo] } : i,
            )
          : [...c, { ...novo, respostas: [] }],
      );
      setRespondendoA(null);
      setNome("");
      setTexto("");
      setAviso(respondendoA ? "✓ resposta publicada." : "✓ comentário publicado.");
    } catch {
      setAviso("⚠ não foi possível enviar agora.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={styles.comentarios}>
      <h2 className={styles.comentariosTitulo}>O que você pensou?</h2>

      <form className={styles.form} onSubmit={enviar}>
        <p className={styles.formTitulo}>
          {respondendoA ? `RESPONDENDO A ${respondendoA.autor.toUpperCase()}` : "DEIXE UM COMENTÁRIO"}
        </p>

        {logado ? (
          // Identidade da conta no lugar do campo de nome: quem assina é a sessão,
          // e um input aqui prometeria uma escolha que a API não aceita.
          <div className={styles.identidade}>
            <Avatar nome={logado.nome} foto={logado.imagemUrl} />
            <span className={styles.identidadeNome}>{logado.nome}</span>
            {ehAutorDoPost && <span className={styles.selo}>autor</span>}
          </div>
        ) : (
          <label>
            <span>nome *</span>
            <input
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
                setAviso("");
              }}
              placeholder="Seu nome (obrigatório)"
              maxLength={80}
            />
          </label>
        )}

        <label>
          <span>comentário</span>
          <textarea
            rows={4}
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setAviso("");
            }}
            placeholder="Pense junto — discordar com cuidado também é comentário."
            maxLength={2000}
          />
        </label>
        <div className={styles.formRodape}>
          <button type="submit" disabled={enviando}>
            {enviando ? "Enviando…" : respondendoA ? "Responder" : "Comentar"}
          </button>
          {respondendoA && (
            <button
              type="button"
              className={styles.btnOutline}
              onClick={() => {
                setRespondendoA(null);
                setAviso("");
              }}
            >
              Cancelar
            </button>
          )}
          <span className={styles.aviso}>{aviso}</span>
        </div>
      </form>

      <p className="pc-eyebrow">
        comentários · <b>{String(itens.length).padStart(2, "0")}</b>
      </p>

      <div className={styles.conversa}>
        {itens.map((c) => (
          <article key={c.id}>
            <div className={styles.comentario}>
              <Avatar nome={c.autor} foto={c.autorImagemUrl} />
              <div className={styles.comentarioCorpo}>
                <p className={styles.comentarioMeta}>
                  <Assinatura item={c} />
                  <button
                    type="button"
                    className={styles.responder}
                    onClick={() => {
                      setRespondendoA({ id: c.id!, autor: c.autor ?? "" });
                      setAviso("");
                    }}
                  >
                    responder
                  </button>
                </p>
                <p className={styles.comentarioTexto}>{c.conteudo}</p>
              </div>
            </div>
            {(c.respostas?.length ?? 0) > 0 && (
              <div className={styles.respostas}>
                {c.respostas!.map((r) => (
                  <div key={r.id} className={`${styles.resposta} ${styles.comentario}`}>
                    <Avatar nome={r.autor} foto={r.autorImagemUrl} />
                    <div className={styles.comentarioCorpo}>
                      <p className={styles.comentarioMeta}>
                        <Assinatura item={r} />
                      </p>
                      <p className={styles.comentarioTexto}>{r.conteudo}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

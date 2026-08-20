"use client";

import { useEffect, useState } from "react";
import type { components } from "@/types/api";
import { API_PUBLICA, mensagemDeErro } from "@/lib/navegador";
import { dataCurta } from "@/lib/datas";
import styles from "./interacoes.module.css";

type Comentario = components["schemas"]["ComentarioListaResponse"];

const iniciais = (nome?: string | null) =>
  (nome ?? "?").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

/**
 * Conversa do post. Lista e envio saem do BROWSER: a API identifica o visitante pelo
 * IP da conexão para o rate limit de 5/min — pelo servidor do front todos seriam um só.
 */
export function Comentarios({ postId }: { postId: string }) {
  const [itens, setItens] = useState<Comentario[]>([]);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    fetch(`${API_PUBLICA}/api/v1/posts/${postId}/comentarios?PageSize=50&OrderBy=dataCriacao`)
      .then((r) => (r.ok ? r.json() : { items: [] }))
      .then((p) => setItens(p.items ?? []))
      .catch(() => setAviso("Não foi possível carregar os comentários."));
  }, [postId]);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    if (!nome.trim()) return setAviso("⚠ o nome é obrigatório.");
    if (!texto.trim()) return setAviso("⚠ escreva o comentário.");

    setEnviando(true);
    try {
      const res = await fetch(`${API_PUBLICA}/api/v1/posts/${postId}/comentarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autor: nome.trim(), conteudo: texto.trim() }),
      });
      if (!res.ok) {
        setAviso(`⚠ ${await mensagemDeErro(res)}`);
        return;
      }
      const criado = await res.json();
      setItens((c) => [
        ...c,
        { id: criado.id, autor: criado.autor, conteudo: criado.conteudo, dataCriacao: new Date().toISOString(), respostas: [] },
      ]);
      setNome("");
      setTexto("");
      setAviso("✓ comentário publicado.");
    } catch {
      setAviso("⚠ não foi possível enviar agora.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className={styles.comentarios}>
      <p className="pc-eyebrow">
        comentários · <b>{String(itens.length).padStart(2, "0")}</b>
      </p>
      <h2 className={styles.comentariosTitulo}>O que você pensou?</h2>

      <div className={styles.conversa}>
        {itens.map((c) => (
          <article key={c.id}>
            <div className={styles.comentario}>
              <span className={styles.comentarioAvatar}>{iniciais(c.autor)}</span>
              <div className={styles.comentarioCorpo}>
                <p className={styles.comentarioMeta}>
                  <b>{c.autor}</b> <span>{dataCurta(c.dataCriacao)}</span>
                </p>
                <p className={styles.comentarioTexto}>{c.conteudo}</p>
              </div>
            </div>
            {(c.respostas?.length ?? 0) > 0 && (
              <div className={styles.respostas}>
                {c.respostas!.map((r) => (
                  <div key={r.id} className={`${styles.resposta} ${styles.comentario}`}>
                    <span className={styles.comentarioAvatar}>{iniciais(r.autor)}</span>
                    <div className={styles.comentarioCorpo}>
                      <p className={styles.comentarioMeta}>
                        <b>{r.autor}</b> <span>{dataCurta(r.dataCriacao)}</span>
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

      <form className={styles.form} onSubmit={enviar}>
        <p className={styles.formTitulo}>DEIXE UM COMENTÁRIO</p>
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
        <label>
          <span>comentário</span>
          <textarea
            rows={3}
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
            {enviando ? "Enviando…" : "Comentar"}
          </button>
          <span className={styles.aviso}>{aviso}</span>
        </div>
      </form>
    </section>
  );
}

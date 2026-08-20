"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Tag } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { buscarPreviewLink, criarTag, enviarImagem, salvarPost } from "./actions";
import { paraConteudo, novoBloco, type BlocoEditor, type TipoEditor } from "./blocos";
import styles from "./editor.module.css";

const TIPOS: { tipo: TipoEditor; label: string; placeholder: string; rows: number }[] = [
  { tipo: "paragrafo", label: "PARÁGRAFO", placeholder: "Escreva pensando junto, não pregando…", rows: 3 },
  { tipo: "subtitulo", label: "SUBTÍTULO", placeholder: "Um subtítulo em sentence case", rows: 1 },
  { tipo: "versiculo", label: "VERSÍCULO", placeholder: "O texto do versículo, sem aspas", rows: 2 },
  { tipo: "nota", label: "NOTA DE ESTUDO", placeholder: "O termo original, o contexto, o detalhe que se perde na tradução…", rows: 2 },
  { tipo: "aplicacao", label: "APLICAÇÃO", placeholder: "Um item prático por linha", rows: 3 },
  { tipo: "imagem", label: "IMAGEM", placeholder: "Texto alternativo da imagem", rows: 1 },
  { tipo: "link", label: "LINK", placeholder: "", rows: 1 },
];
const META = Object.fromEntries(TIPOS.map((t) => [t.tipo, t])) as Record<
  TipoEditor,
  (typeof TIPOS)[number]
>;
META.html = { tipo: "html", label: "HTML", placeholder: "", rows: 4 };

export function Editor({
  post,
  blocosIniciais,
  tags: tagsIniciais,
}: {
  post?: { id: string; slug: string; titulo: string; imagemCapa: string | null; status: 0 | 1; tagIds: string[] };
  blocosIniciais?: BlocoEditor[];
  tags: Tag[];
}) {
  const router = useRouter();
  // o estado inicial ocupa as keys 1..n (post novo tem 1 bloco padrão) — o contador começa depois
  const proximaKey = useRef((blocosIniciais?.length ?? 1) + 1);
  const [titulo, setTitulo] = useState(post?.titulo ?? "");
  const [capa, setCapa] = useState(post?.imagemCapa ?? "");
  const [tags, setTags] = useState(tagsIniciais);
  const [tagIds, setTagIds] = useState<string[]>(post?.tagIds ?? []);
  const [novaTag, setNovaTag] = useState("");
  const [blocos, setBlocos] = useState<BlocoEditor[]>(
    () => blocosIniciais?.map((b, i) => ({ ...b, key: i + 1 })) ?? [{ ...novoBloco("paragrafo"), key: 1 }],
  );
  const [status, setStatus] = useState<0 | 1>(post?.status ?? 0);
  const [salvo, setSalvo] = useState(!!post);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, startTransition] = useTransition();
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<number | null>(null);
  const [confirmaPublicar, setConfirmaPublicar] = useState(false);

  const sujou = () => setSalvo(false);

  function patch(i: number, p: Partial<BlocoEditor>) {
    sujou();
    setBlocos((bs) => bs.map((b, j) => (j === i ? { ...b, ...p } : b)));
  }
  function mover(de: number, para: number) {
    if (para < 0 || para >= blocos.length) return;
    sujou();
    setBlocos((bs) => {
      const novo = [...bs];
      const [b] = novo.splice(de, 1);
      novo.splice(para, 0, b);
      return novo;
    });
  }
  function adicionar(tipo: TipoEditor) {
    sujou();
    setBlocos((bs) => [...bs, { ...novoBloco(tipo), key: proximaKey.current++ }]);
  }

  function salvar(novoStatus: 0 | 1) {
    setErro(null);
    startTransition(async () => {
      const r = await salvarPost({
        id: post?.id,
        titulo,
        imagemCapa: capa || null,
        tagIds,
        conteudo: paraConteudo(blocos),
        status: novoStatus,
      });
      if (!r.ok) return setErro(r.erro);
      setStatus(novoStatus);
      setSalvo(true);
      if (!post && r.dados.slug) router.replace(`/escrivaninha/editor/${r.dados.slug}`);
    });
  }

  async function subirImagem(arquivo: File, aplicar: (path: string, url: string | null) => void) {
    setErro(null);
    const fd = new FormData();
    fd.set("arquivo", arquivo);
    const r = await enviarImagem(fd);
    if (!r.ok) return setErro(r.erro);
    aplicar(r.dados.path ?? "", r.dados.url ?? null);
    sujou();
  }

  function adicionarTag() {
    const nome = novaTag.trim();
    if (!nome) return;
    startTransition(async () => {
      const r = await criarTag(nome);
      if (!r.ok) return setErro(r.erro);
      setTags((ts) => (ts.some((t) => t.id === r.dados.id) ? ts : [...ts, r.dados]));
      setTagIds((ids) => (ids.includes(r.dados.id!) ? ids : [...ids, r.dados.id!]));
      setNovaTag("");
      sujou();
    });
  }

  const publicado = status === 1;

  return (
    <div className={styles.cols}>
      <section>
        <div className={styles.barra}>
          <span className={`${styles.badge} ${publicado ? styles.badgePublicado : ""}`}>
            {publicado ? "publicado" : "rascunho"}
          </span>
          {publicado && post && (
            <Link href={`/${post.slug}`} className={styles.verNoBlog}>
              ver no blog →
            </Link>
          )}
          <span className={styles.barraAcoes}>
            {publicado && (
              <button type="button" className={styles.btnGhost} disabled={pendente} onClick={() => salvar(0)}>
                voltar a rascunho
              </button>
            )}
            <button type="button" className={styles.btnGhost} disabled={pendente} onClick={() => salvar(status)}>
              {pendente ? "salvando…" : salvo ? "✓ salvo" : publicado ? "Salvar" : "Salvar rascunho"}
            </button>
            {!publicado && (
              <button
                type="button"
                className={styles.btnPrimario}
                disabled={pendente || !titulo.trim()}
                onClick={() => setConfirmaPublicar(true)}
              >
                Publicar
              </button>
            )}
          </span>
        </div>
        {erro && <p className={styles.erro}>{erro}</p>}

        <p className={styles.rotulo}>título</p>
        {/* textarea que quebra linha: título longo aparece inteiro (Enter vira espaço) */}
        <textarea
          className={styles.titulo}
          rows={1}
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value.replace(/\n/g, " "));
            sujou();
          }}
          placeholder="Elias dormiu antes de ouvir a voz"
        />

        <div className={styles.divisorConteudo}>
          <p className={styles.rotulo} style={{ margin: 0 }}>
            conteúdo · arraste <span className={styles.acento}>⠿</span> para reordenar
          </p>
          <span className={styles.contagem}>{String(blocos.length).padStart(2, "0")} blocos</span>
        </div>

        <div className={styles.blocos}>
          {blocos.map((b, i) => (
            <div
              key={b.key}
              className={styles.bloco}
              data-drag={arrastando === i ? "dragging" : sobre === i && arrastando !== null ? "over" : undefined}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                setArrastando(i);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                setSobre(i);
              }}
              onDrop={(e) => {
                e.preventDefault();
                if (arrastando !== null && arrastando !== i) mover(arrastando, i);
                setArrastando(null);
                setSobre(null);
              }}
              onDragEnd={() => {
                setArrastando(null);
                setSobre(null);
              }}
            >
              <div className={styles.blocoCabecalho}>
                <span className={styles.alca} title="Arrastar para reordenar">
                  ⠿
                </span>
                <span className={styles.blocoTipo}>{META[b.tipo].label}</span>
                <span className={styles.blocoAcoes}>
                  <button type="button" title="Mover para cima" onClick={() => mover(i, i - 1)}>↑</button>
                  <button type="button" title="Mover para baixo" onClick={() => mover(i, i + 1)}>↓</button>
                  <button
                    type="button"
                    title="Remover bloco"
                    onClick={() => {
                      sujou();
                      setBlocos((bs) => bs.filter((_, j) => j !== i));
                    }}
                  >
                    ×
                  </button>
                </span>
              </div>
              <div className={styles.blocoCorpo}>
                {b.tipo === "versiculo" && (
                  <input
                    className={styles.inputRef}
                    value={b.ref}
                    onChange={(e) => patch(i, { ref: e.target.value })}
                    placeholder="Referência — ex. 1 Reis 19:7"
                  />
                )}
                {b.tipo === "imagem" && (
                  <div className={styles.blocoImagem}>
                    {urlDaImagem(b.imagemUrl ?? b.imagemPath) ? (
                      <img src={urlDaImagem(b.imagemUrl ?? b.imagemPath)} alt="" />
                    ) : (
                      <span className={styles.imagemVazia}>imagem do post</span>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) subirImagem(f, (path, url) => patch(i, { imagemPath: path, imagemUrl: url }));
                      }}
                    />
                  </div>
                )}
                {b.tipo === "link" ? (
                  <div className={styles.blocoLink}>
                    <input
                      className={styles.inputRef}
                      value={b.linkUrl ?? ""}
                      onChange={(e) => patch(i, { linkUrl: e.target.value })}
                      onBlur={async () => {
                        if (!b.linkUrl || b.linkTitulo) return;
                        const r = await buscarPreviewLink(b.linkUrl);
                        if (r.ok)
                          patch(i, {
                            linkUrl: r.dados.url ?? b.linkUrl,
                            linkTitulo: r.dados.titulo,
                            linkDescricao: r.dados.descricao,
                            linkThumbnail: r.dados.thumbnail,
                            linkSiteName: r.dados.siteName,
                          });
                      }}
                      placeholder="URL do link — https://…"
                    />
                    {b.linkTitulo && (
                      <p className={styles.linkPreview}>
                        {b.linkSiteName && <span>{b.linkSiteName} · </span>}
                        {b.linkTitulo}
                      </p>
                    )}
                  </div>
                ) : (
                  <textarea
                    className={styles.ta}
                    data-bt={b.tipo}
                    rows={META[b.tipo].rows}
                    value={b.texto}
                    onChange={(e) => patch(i, { texto: e.target.value })}
                    placeholder={META[b.tipo].placeholder}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.adicionar}>
          <span className={styles.rotulo} style={{ margin: 0 }}>
            + adicionar
          </span>
          {TIPOS.map((t) => (
            <button key={t.tipo} type="button" className={styles.chip} onClick={() => adicionar(t.tipo)}>
              {t.label.toLowerCase()}
            </button>
          ))}
        </div>
      </section>

      <aside className={styles.aside}>
        <div className={styles.card}>
          <p className={styles.cardTitulo}>TAGS</p>
          <div className={styles.tagChips}>
            {tags.map((t) => {
              const ativa = tagIds.includes(t.id!);
              return (
                <button
                  key={t.id}
                  type="button"
                  className={`${styles.chip} ${ativa ? styles.chipAtiva : ""}`}
                  onClick={() => {
                    sujou();
                    setTagIds((ids) => (ativa ? ids.filter((x) => x !== t.id) : [...ids, t.id!]));
                  }}
                >
                  {t.nome}
                </button>
              );
            })}
          </div>
          <div className={styles.novaTag}>
            <input
              value={novaTag}
              onChange={(e) => setNovaTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && adicionarTag()}
              placeholder="nova tag…"
            />
            <button type="button" onClick={adicionarTag} disabled={pendente || !novaTag.trim()}>
              +
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitulo}>CAPA DO POST</p>
          {urlDaImagem(capa) ? (
            <img className={styles.capaPreview} src={urlDaImagem(capa)} alt="" />
          ) : (
            <span className={`${styles.imagemVazia} ${styles.capaVazia}`}>
              capa escolhida pelo autor
            </span>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) subirImagem(f, (path, url) => setCapa(url ?? path));
            }}
          />
        </div>
      </aside>

      <ConfirmDialog
        open={confirmaPublicar}
        title="Publicar esta meditação?"
        message="Ela entra no arquivo na hora. Dá para despublicar depois."
        confirmLabel="Publicar agora"
        cancelLabel="Ainda não"
        onCancel={() => setConfirmaPublicar(false)}
        onConfirm={() => {
          setConfirmaPublicar(false);
          salvar(1);
        }}
      />
    </div>
  );
}

"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, GripVertical, Plus, X } from "lucide-react";
import type { Etapa, Tag } from "@/lib/api";
import { MOODS, etapaCurta } from "@/lib/moods";
import { urlDaImagem } from "@/lib/imagens";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { CortadorImagem } from "@/components/ui/CortadorImagem";
import { buscarPreviewLink, criarTag, enviarImagem, excluirTag, salvarPost } from "./actions";
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

// ISO UTC → valor de <input type="datetime-local"> no fuso do navegador
const paraDatetimeLocal = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};

export function Editor({
  post,
  blocosIniciais,
  tags: tagsIniciais,
  etapas,
}: {
  post?: {
    id: string;
    slug: string;
    titulo: string;
    dek: string | null;
    imagemCapa: string | null;
    status: 0 | 1 | 2;
    tagIds: string[];
    moods: number[];
    etapaId: string | null;
    dataPublicacao: string | null;
  };
  blocosIniciais?: BlocoEditor[];
  tags: Tag[];
  etapas: Etapa[];
}) {
  const router = useRouter();
  // o estado inicial ocupa as keys 1..n (post novo tem 1 bloco padrão) — o contador começa depois
  const proximaKey = useRef((blocosIniciais?.length ?? 1) + 1);
  const [titulo, setTitulo] = useState(post?.titulo ?? "");
  const [dek, setDek] = useState(post?.dek ?? "");
  const [moods, setMoods] = useState<number[]>(post?.moods ?? []);
  const [etapaId, setEtapaId] = useState<string | null>(post?.etapaId ?? null);
  const [agendarPara, setAgendarPara] = useState(() =>
    post?.status === 2 && post.dataPublicacao ? paraDatetimeLocal(post.dataPublicacao) : "",
  );
  const [capa, setCapa] = useState(post?.imagemCapa ?? "");
  const [tags, setTags] = useState(tagsIniciais);
  const [tagIds, setTagIds] = useState<string[]>(post?.tagIds ?? []);
  const [novaTag, setNovaTag] = useState("");
  const [tagExcluir, setTagExcluir] = useState<Tag | null>(null);
  const [blocos, setBlocos] = useState<BlocoEditor[]>(
    () => blocosIniciais?.map((b, i) => ({ ...b, key: i + 1 })) ?? [{ ...novoBloco("paragrafo"), key: 1 }],
  );
  const [status, setStatus] = useState<0 | 1 | 2>(post?.status ?? 0);
  const [salvo, setSalvo] = useState(!!post);
  const [erro, setErro] = useState<string | null>(null);
  const [pendente, startTransition] = useTransition();
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<number | null>(null);
  // desfaz o clone que segue o mouse durante o drag
  const fantasma = useRef<(() => void) | null>(null);
  const [confirmaPublicar, setConfirmaPublicar] = useState(false);
  // upload adiado: a capa escolhida fica local (File + preview) e só sobe no salvar
  const [capaArquivo, setCapaArquivo] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState<string | null>(null);
  const [corte, setCorte] = useState<{ url: string; aplicar: (f: File) => void } | null>(null);

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

  async function subir(arquivo: File) {
    const fd = new FormData();
    fd.set("arquivo", arquivo);
    return enviarImagem(fd);
  }

  function salvar(novoStatus: 0 | 1 | 2) {
    setErro(null);
    if (novoStatus === 2 && !agendarPara)
      return setErro("Escolha data e hora do agendamento no painel ao lado.");
    startTransition(async () => {
      // as imagens pendentes sobem agora, só na hora de salvar
      let prontos = blocos;
      for (let i = 0; i < prontos.length; i++) {
        const b = prontos[i];
        if (b.tipo !== "imagem" || !b.arquivo) continue;
        const r = await subir(b.arquivo);
        if (!r.ok) return setErro(r.erro);
        prontos = prontos.map((x, j) =>
          j === i
            ? { ...x, imagemPath: r.dados.path, imagemUrl: r.dados.url, arquivo: undefined }
            : x,
        );
      }
      let capaFinal = capa;
      if (capaArquivo) {
        const r = await subir(capaArquivo);
        if (!r.ok) return setErro(r.erro);
        capaFinal = r.dados.url ?? r.dados.path ?? "";
        setCapa(capaFinal);
        setCapaArquivo(null);
        setCapaPreview(null);
      }
      setBlocos(prontos);

      const r = await salvarPost({
        id: post?.id,
        titulo,
        dek: dek.trim() || null,
        imagemCapa: capaFinal || null,
        tagIds,
        conteudo: paraConteudo(prontos),
        status: novoStatus,
        moods,
        etapaId,
        dataPublicacao: novoStatus === 2 ? new Date(agendarPara).toISOString() : null,
      });
      if (!r.ok) return setErro(r.erro);
      setStatus(novoStatus);
      setSalvo(true);
      if (!post && r.dados.id) router.replace(`/escrivaninha/editor/${r.dados.id}`);
    });
  }

  /** abre o cortador com o arquivo escolhido; `aplicar` recebe o webp recortado */
  function escolher(e: React.ChangeEvent<HTMLInputElement>, aplicar: (f: File) => void) {
    const f = e.target.files?.[0];
    e.target.value = ""; // permite escolher o mesmo arquivo de novo
    if (f) setCorte({ url: URL.createObjectURL(f), aplicar });
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
  const agendado = status === 2;

  return (
    <div className={styles.cols}>
      <section>
        <div className={styles.barra}>
          <Link href="/escrivaninha" className={styles.voltar}>
            <ArrowLeft size={12} /> meditações
          </Link>
          <span
            className={`${styles.badge} ${publicado ? styles.badgePublicado : ""} ${agendado ? styles.badgeAgendado : ""}`}
          >
            {publicado ? "publicado" : agendado ? "agendado" : "rascunho"}
          </span>
          {publicado && post && (
            <Link href={`/${post.slug}`} className={styles.verNoBlog}>
              ver no blog <ArrowRight size={12} />
            </Link>
          )}
          <span className={styles.barraAcoes}>
            {(publicado || agendado) && (
              <button type="button" className={styles.btnGhost} disabled={pendente} onClick={() => salvar(0)}>
                voltar a rascunho
              </button>
            )}
            <button type="button" className={styles.btnGhost} disabled={pendente} onClick={() => salvar(status)}>
              {pendente ? (
                "salvando…"
              ) : salvo ? (
                <>
                  <Check size={13} /> salvo
                </>
              ) : publicado || agendado ? (
                "Salvar"
              ) : (
                "Salvar rascunho"
              )}
            </button>
            {!publicado && !agendado && agendarPara && (
              <button
                type="button"
                className={styles.btnGhost}
                disabled={pendente || !titulo.trim()}
                onClick={() => salvar(2)}
              >
                Agendar
              </button>
            )}
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

        <p className={styles.rotulo} style={{ margin: "28px 0 10px" }}>
          dek
        </p>
        <textarea
          className={styles.dek}
          rows={2}
          maxLength={200}
          value={dek}
          onChange={(e) => {
            setDek(e.target.value);
            sujou();
          }}
          placeholder="Uma frase que resume a meditação sem entregar a conclusão."
        />

        <div className={styles.divisorConteudo}>
          <p className={styles.rotulo} style={{ margin: 0 }}>
            conteúdo · arraste <GripVertical size={12} className={styles.acento} /> para reordenar
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
                // some com o ghost lavado do navegador — um clone nítido do bloco segue o mouse
                const px = document.createElement("canvas");
                px.width = px.height = 1;
                e.dataTransfer.setDragImage(px, 0, 0);
                const el = e.currentTarget;
                const r = el.getBoundingClientRect();
                const dx = e.clientX - r.left;
                const dy = e.clientY - r.top;
                const clone = el.cloneNode(true) as HTMLElement;
                // cloneNode não leva o value atual dos campos controlados (file fica de fora: value é read-only)
                const campos = el.querySelectorAll<HTMLInputElement>("textarea, input:not([type=file])");
                clone
                  .querySelectorAll<HTMLInputElement>("textarea, input:not([type=file])")
                  .forEach((c, k) => (c.value = campos[k].value));
                clone.classList.add(styles.fantasma);
                clone.style.width = `${r.width}px`;
                clone.style.left = `${r.left}px`;
                clone.style.top = `${r.top}px`;
                document.body.appendChild(clone);
                const seguir = (ev: DragEvent) => {
                  clone.style.left = `${ev.clientX - dx}px`;
                  clone.style.top = `${ev.clientY - dy}px`;
                };
                document.addEventListener("dragover", seguir);
                fantasma.current = () => {
                  document.removeEventListener("dragover", seguir);
                  clone.remove();
                  fantasma.current = null;
                };
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
                fantasma.current?.();
                setArrastando(null);
                setSobre(null);
              }}
            >
              <div className={styles.blocoCabecalho}>
                <span className={styles.alca} title="Arrastar para reordenar">
                  <GripVertical size={14} />
                </span>
                <span className={styles.blocoTipo}>{META[b.tipo].label}</span>
                <span className={styles.blocoAcoes}>
                  <button type="button" title="Mover para cima" onClick={() => mover(i, i - 1)}>
                    <ArrowUp size={13} />
                  </button>
                  <button type="button" title="Mover para baixo" onClick={() => mover(i, i + 1)}>
                    <ArrowDown size={13} />
                  </button>
                  <button
                    type="button"
                    title="Remover bloco"
                    onClick={() => {
                      sujou();
                      setBlocos((bs) => bs.filter((_, j) => j !== i));
                    }}
                  >
                    <X size={13} />
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
                    {b.previewUrl || urlDaImagem(b.imagemUrl ?? b.imagemPath) ? (
                      <img src={b.previewUrl ?? urlDaImagem(b.imagemUrl ?? b.imagemPath)} alt="" />
                    ) : (
                      <span className={styles.imagemVazia}>imagem do post</span>
                    )}
                    <label className={styles.escolherArquivo}>
                      {b.previewUrl || b.imagemPath || b.imagemUrl ? "trocar imagem" : "escolher imagem"}
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={(e) =>
                          escolher(e, (f) =>
                            patch(i, {
                              arquivo: f,
                              previewUrl: URL.createObjectURL(f),
                              imagemPath: null,
                              imagemUrl: null,
                            }),
                          )
                        }
                      />
                    </label>
                    {b.arquivo && <span className={styles.pendenteUpload}>sobe ao salvar</span>}
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
            <Plus size={12} /> adicionar
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
                <span key={t.id} className={styles.chipGrupo}>
                  <button
                    type="button"
                    className={`${styles.chip} ${ativa ? styles.chipAtiva : ""}`}
                    onClick={() => {
                      sujou();
                      setTagIds((ids) => (ativa ? ids.filter((x) => x !== t.id) : [...ids, t.id!]));
                    }}
                  >
                    {t.nome}
                  </button>
                  <button
                    type="button"
                    className={styles.chipX}
                    title={`Excluir a tag ${t.nome}`}
                    aria-label={`Excluir a tag ${t.nome}`}
                    onClick={() => setTagExcluir(t)}
                  >
                    <X size={11} />
                  </button>
                </span>
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
              <Plus size={14} />
            </button>
          </div>
        </div>

        <div className={styles.card}>
          <p className={styles.cardTitulo}>ESTADO DE CHEGADA</p>
          <div className={styles.tagChips}>
            {MOODS.map((m) => {
              const ativo = moods.includes(m.valor);
              return (
                <button
                  key={m.valor}
                  type="button"
                  className={`${styles.chip} ${ativo ? styles.chipAtiva : ""}`}
                  onClick={() => {
                    sujou();
                    setMoods((ms) => (ativo ? ms.filter((v) => v !== m.valor) : [...ms, m.valor]));
                  }}
                >
                  {m.rotulo}
                </button>
              );
            })}
          </div>
        </div>

        {etapas.length > 0 && (
          <div className={styles.card}>
            <p className={styles.cardTitulo}>ETAPA DA TRILHA</p>
            <div className={styles.tagChips}>
              {etapas.map((e) => {
                const ativa = e.id === etapaId;
                return (
                  <button
                    key={e.id}
                    type="button"
                    className={`${styles.chip} ${ativa ? styles.chipAtiva : ""}`}
                    onClick={() => {
                      sujou();
                      setEtapaId(ativa ? null : e.id!);
                    }}
                  >
                    {etapaCurta(e.numero, e.titulo)}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!publicado && (
          <div className={styles.card}>
            <p className={styles.cardTitulo}>AGENDAMENTO</p>
            <input
              type="datetime-local"
              className={styles.agendarInput}
              value={agendarPara}
              onChange={(e) => {
                setAgendarPara(e.target.value);
                sujou();
              }}
              aria-label="Data e hora da publicação agendada"
            />
            <p className={styles.cardDica}>
              {agendado
                ? "salvar mantém o agendamento na data acima."
                : "com data e hora futuras, o botão “Agendar” publica sozinho na hora marcada."}
            </p>
          </div>
        )}

        <div className={styles.card}>
          <p className={styles.cardTitulo}>CAPA DO POST</p>
          {capaPreview || urlDaImagem(capa) ? (
            <img className={styles.capaPreview} src={capaPreview ?? urlDaImagem(capa)} alt="" />
          ) : (
            <span className={`${styles.imagemVazia} ${styles.capaVazia}`}>
              capa escolhida pelo autor
            </span>
          )}
          <label className={styles.escolherArquivo}>
            {capaPreview || capa ? "trocar capa" : "escolher capa"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) =>
                escolher(e, (f) => {
                  setCapaArquivo(f);
                  setCapaPreview(URL.createObjectURL(f));
                  sujou();
                })
              }
            />
          </label>
          {capaArquivo && <span className={styles.pendenteUpload}>sobe ao salvar</span>}
        </div>
      </aside>

      {corte && (
        <CortadorImagem
          url={corte.url}
          onCancelar={() => {
            URL.revokeObjectURL(corte.url);
            setCorte(null);
          }}
          onConfirmar={(f) => {
            corte.aplicar(f);
            URL.revokeObjectURL(corte.url);
            setCorte(null);
            sujou();
          }}
        />
      )}

      <ConfirmDialog
        open={!!tagExcluir}
        title={`Excluir a tag “${tagExcluir?.nome}”?`}
        message="Sai da lista para sempre. Se estiver vinculada a algum post, a API bloqueia e avisa."
        confirmLabel="Excluir"
        cancelLabel="Cancelar"
        onCancel={() => setTagExcluir(null)}
        onConfirm={() => {
          const t = tagExcluir!;
          setTagExcluir(null);
          startTransition(async () => {
            const r = await excluirTag(t.id!);
            if (!r.ok) return setErro(r.erro);
            setTags((ts) => ts.filter((x) => x.id !== t.id));
            setTagIds((ids) => ids.filter((x) => x !== t.id));
          });
        }}
      />

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

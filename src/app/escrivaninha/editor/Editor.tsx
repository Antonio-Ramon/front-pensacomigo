"use client";

import { useCallback, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, GripVertical, Plus, X } from "lucide-react";
import type { Etapa, Mood, StatusPost, Tag } from "@/lib/api";
import { MOODS, etapaCurta } from "@/lib/moods";
import { urlDaImagem } from "@/lib/imagens";
import { toast } from "@/lib/toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { CortadorImagem } from "@/components/ui/CortadorImagem";
import { buscarPreviewLink, criarTag, enviarImagem, excluirTag, salvarPost } from "./actions";
import { paraConteudo, novoBloco, type BlocoEditor, type TipoEditor } from "./blocos";
import { BarraFormato } from "./BarraFormato";
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
// título fixo do toast de erro: diz o que se tentou fazer; os erros da API vão nas linhas
const FALHA_AO_SALVAR: Record<StatusPost, string> = {
  Rascunho: "Não foi possível salvar o rascunho",
  Publicado: "Não foi possível publicar",
  Agendado: "Não foi possível agendar",
};

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
    status: StatusPost;
    tagIds: string[];
    moods: Mood[];
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
  const [moods, setMoods] = useState<Mood[]>(post?.moods ?? []);
  const [etapaId, setEtapaId] = useState<string | null>(post?.etapaId ?? null);
  const [agendarPara, setAgendarPara] = useState(() =>
    post?.status === "Agendado" && post.dataPublicacao ? paraDatetimeLocal(post.dataPublicacao) : "",
  );
  const [capa, setCapa] = useState(post?.imagemCapa ?? "");
  const [tags, setTags] = useState(tagsIniciais);
  const [tagIds, setTagIds] = useState<string[]>(post?.tagIds ?? []);
  const [novaTag, setNovaTag] = useState("");
  const [tagExcluir, setTagExcluir] = useState<Tag | null>(null);
  const [blocos, setBlocos] = useState<BlocoEditor[]>(
    () => blocosIniciais?.map((b, i) => ({ ...b, key: i + 1 })) ?? [{ ...novoBloco("paragrafo"), key: 1 }],
  );
  const [status, setStatus] = useState<StatusPost>(post?.status ?? "Rascunho");
  const [salvo, setSalvo] = useState(!!post);
  const [pendente, startTransition] = useTransition();
  const [arrastando, setArrastando] = useState<number | null>(null);
  const [sobre, setSobre] = useState<number | null>(null);
  // a lista dá acesso aos retângulos dos blocos para descobrir sobre qual o ponteiro está
  const listaRef = useRef<HTMLDivElement>(null);
  // desfaz o arrasto em curso: some com o clone e solta os listeners do documento
  const fantasma = useRef<(() => void) | null>(null);
  const [confirmaPublicar, setConfirmaPublicar] = useState(false);
  // upload adiado: a capa escolhida fica local (File + preview) e só sobe no salvar
  const [capaArquivo, setCapaArquivo] = useState<File | null>(null);
  const [capaPreview, setCapaPreview] = useState<string | null>(null);
  const [corte, setCorte] = useState<{ url: string; aplicar: (f: File) => void } | null>(null);

  const sujou = () => setSalvo(false);
  // a barra de formato precisa do elemento para mexer na seleção; a chave do bloco é estável
  const textareas = useRef<Record<number, HTMLTextAreaElement | null>>({});
  // identidade estável: é o que deixa o `memo` da BarraFormato valer alguma coisa
  const textoDoBloco = useCallback((i: number, texto: string) => {
    setSalvo(false);
    setBlocos((bs) => bs.map((b, j) => (j === i ? { ...b, texto } : b)));
  }, []);

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

  function salvar(novoStatus: StatusPost) {
    const falhou = (erro: unknown) =>
      toast.falhou(FALHA_AO_SALVAR[novoStatus], erro, () => salvar(novoStatus));
    if (novoStatus === "Agendado" && !agendarPara)
      return toast.aviso("Escolha data e hora do agendamento no painel ao lado.");
    startTransition(async () => {
      try {
        // as imagens pendentes sobem agora, só na hora de salvar
        let prontos = blocos;
        for (let i = 0; i < prontos.length; i++) {
          const b = prontos[i];
          if (b.tipo !== "imagem" || !b.arquivo) continue;
          const r = await subir(b.arquivo);
          if (!r.ok)
            return toast.falhou("Não foi possível enviar a imagem", r.erro, () =>
              salvar(novoStatus),
            );
          prontos = prontos.map((x, j) =>
            j === i
              ? { ...x, imagemPath: r.dados.path, imagemUrl: r.dados.url, arquivo: undefined }
              : x,
          );
        }
        let capaFinal = capa;
        if (capaArquivo) {
          const r = await subir(capaArquivo);
          if (!r.ok)
            return toast.falhou("Não foi possível enviar a capa", r.erro, () => salvar(novoStatus));
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
          dataPublicacao: novoStatus === "Agendado" ? new Date(agendarPara).toISOString() : null,
        });
        if (!r.ok) return falhou(r.erro);
        setStatus(novoStatus);
        setSalvo(true);
        toast.sucesso(
          novoStatus === "Publicado"
            ? "Meditação publicada"
            : novoStatus === "Agendado"
              ? "Agendada"
              : "Rascunho salvo",
          { rotulo: novoStatus === "Rascunho" ? "rascunho" : "publicado", desc: titulo },
        );
        if (!post && r.dados.id) router.replace(`/escrivaninha/editor/${r.dados.id}`);
      } catch (e) {
        falhou(e);
      }
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
      try {
        const r = await criarTag(nome);
        if (!r.ok) return toast.falhou("Não foi possível criar a tag", r.erro, adicionarTag);
        setTags((ts) => (ts.some((t) => t.id === r.dados.id) ? ts : [...ts, r.dados]));
        setTagIds((ids) => (ids.includes(r.dados.id!) ? ids : [...ids, r.dados.id!]));
        setNovaTag("");
        sujou();
        toast.sucesso("Tag criada", { rotulo: "tags", desc: r.dados.nome ?? undefined });
      } catch (e) {
        toast.falhou("Não foi possível criar a tag", e, adicionarTag);
      }
    });
  }

  /** exclusão confirmada da tag — isolada para o "tentar de novo" do toast repetir */
  function removerTag(t: Tag) {
    startTransition(async () => {
      try {
        const r = await excluirTag(t.id!);
        if (!r.ok)
          return toast.falhou("Não foi possível excluir a tag", r.erro, () => removerTag(t));
        setTags((ts) => ts.filter((x) => x.id !== t.id));
        setTagIds((ids) => ids.filter((x) => x !== t.id));
        toast.sucesso("Tag excluída", { rotulo: "tags", desc: t.nome ?? undefined });
      } catch (e) {
        toast.falhou("Não foi possível excluir a tag", e, () => removerTag(t));
      }
    });
  }

  /**
   * Arrasto próprio, por pointer events, em vez do drag-and-drop nativo: só a alça
   * inicia, o cursor fica sob nosso controle (o nativo troca para `move` sozinho, pelo
   * dropEffect) e não existe drag image do navegador — logo, nenhuma sombra em volta.
   */
  function iniciarArrasto(e: React.PointerEvent, i: number) {
    if (e.button !== 0) return;
    e.preventDefault();
    const el = (e.currentTarget as HTMLElement).closest<HTMLElement>(`.${styles.bloco}`);
    if (!el) return;
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
    // o cursor de arrasto vale para a página inteira enquanto o bloco viaja
    document.body.classList.add("arrastandoBloco");

    let alvo = i;
    const mover_ = (ev: PointerEvent) => {
      clone.style.left = `${ev.clientX - dx}px`;
      clone.style.top = `${ev.clientY - dy}px`;
      const irmaos = Array.from(listaRef.current?.children ?? []) as HTMLElement[];
      const sob = irmaos.findIndex((n) => {
        const b = n.getBoundingClientRect();
        return ev.clientY >= b.top && ev.clientY <= b.bottom;
      });
      alvo = sob === -1 ? i : sob;
      setSobre(alvo === i ? null : alvo);
    };
    const soltar = () => {
      fantasma.current?.();
      if (alvo !== i) mover(i, alvo);
      setArrastando(null);
      setSobre(null);
    };
    document.addEventListener("pointermove", mover_);
    document.addEventListener("pointerup", soltar);
    document.addEventListener("pointercancel", soltar);
    fantasma.current = () => {
      document.removeEventListener("pointermove", mover_);
      document.removeEventListener("pointerup", soltar);
      document.removeEventListener("pointercancel", soltar);
      document.body.classList.remove("arrastandoBloco");
      clone.remove();
      fantasma.current = null;
    };
    setArrastando(i);
  }

  const publicado = status === "Publicado";
  const agendado = status === "Agendado";

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
              <button type="button" className={styles.btnGhost} disabled={pendente} onClick={() => salvar("Rascunho")}>
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
                onClick={() => salvar("Agendado")}
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

        <div className={styles.blocos} ref={listaRef}>
          {blocos.map((b, i) => (
            <div
              key={b.key}
              className={styles.bloco}
              data-drag={arrastando === i ? "dragging" : sobre === i && arrastando !== null ? "over" : undefined}
            >
              <div className={styles.blocoCabecalho}>
                <span
                  className={styles.alca}
                  title="Arrastar para reordenar"
                  onPointerDown={(e) => iniciarArrasto(e, i)}
                >
                  <GripVertical size={14} />
                </span>
                <span className={styles.blocoTipo}>{META[b.tipo].label}</span>
                {b.tipo === "paragrafo" && (
                  <BarraFormato
                    textareas={textareas}
                    chave={b.key}
                    indice={i}
                    onChange={textoDoBloco}
                  />
                )}
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
                        // preview é opcional: se a action falhar, segue sem ela
                        const r = await buscarPreviewLink(b.linkUrl).catch(() => null);
                        if (r?.ok)
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
                    ref={(el) => {
                      textareas.current[b.key] = el;
                    }}
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
          removerTag(t);
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
          salvar("Publicado");
        }}
      />
    </div>
  );
}

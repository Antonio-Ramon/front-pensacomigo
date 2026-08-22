// Fila de toasts do design system (ui-reference/Toasts.dc.html).
// Store fora do React: qualquer client component chama `toast.*` sem provider.
// Regras já decididas no design: 5s de vida, 3 na tela, estado fixo fica até mudar.

export type TipoToast = "sucesso" | "erro" | "aviso" | "info";

export type Toast = {
  id: number;
  tipo: TipoToast;
  titulo: string;
  /** já normalizado em linhas — a API manda os erros num texto só, separados por "; " */
  desc: string[];
  /** etiqueta mono acima do título; cai no padrão do tipo quando ausente */
  rotulo?: string;
  /** no máximo uma ação, em mono com seta */
  acao?: string;
  aoAgir?: () => void;
  /** fica na tela até ser fechado — a linha pulsa em vez de esvaziar */
  fixo?: boolean;
  ms: number;
  saindo?: boolean;
};

type Opcoes = Partial<Pick<Toast, "rotulo" | "acao" | "aoAgir" | "fixo">> & {
  desc?: string | string[];
};

/** "O título é obrigatório.; O post precisa de um bloco." → uma linha por erro */
const emLinhas = (d?: string | string[]) =>
  (Array.isArray(d) ? d : (d ?? "").split(/;\s*/)).map((l) => l.trim()).filter(Boolean);

const MAX = 3;
const DURACAO = 5000;
const SAIDA = 220;

const ROTULO: Record<TipoToast, string> = {
  sucesso: "feito",
  erro: "falhou",
  aviso: "revisar",
  info: "aviso",
};

let itens: Toast[] = [];
let seq = 0;
const ouvintes = new Set<() => void>();
const timers = new Map<number, ReturnType<typeof setTimeout>>();
const inicios = new Map<number, number>();
const restantes = new Map<number, number>();

function notificar() {
  ouvintes.forEach((f) => f());
}

export function assinar(f: () => void) {
  ouvintes.add(f);
  return () => void ouvintes.delete(f);
}

export function lista() {
  return itens;
}

/** (re)arma o relógio de fechamento e marca de quando ele começou a correr */
function agendar(id: number, ms: number) {
  inicios.set(id, Date.now());
  timers.set(id, setTimeout(() => fechar(id), ms));
}

/** mouse sobre o toast: guarda o que falta para o leitor terminar de ler sem pressa */
function pausar(id: number) {
  const t = itens.find((x) => x.id === id);
  if (!t?.ms || !timers.has(id)) return;
  clearTimeout(timers.get(id));
  timers.delete(id);
  const gasto = Date.now() - (inicios.get(id) ?? 0);
  restantes.set(id, Math.max(0, (restantes.get(id) ?? t.ms) - gasto));
}

function retomar(id: number) {
  const t = itens.find((x) => x.id === id);
  if (!t?.ms || timers.has(id)) return;
  agendar(id, restantes.get(id) ?? t.ms);
}

function fechar(id: number) {
  clearTimeout(timers.get(id));
  timers.delete(id);
  restantes.delete(id);
  inicios.delete(id);
  itens = itens.map((t) => (t.id === id ? { ...t, saindo: true } : t));
  notificar();
  setTimeout(() => {
    itens = itens.filter((t) => t.id !== id);
    notificar();
  }, SAIDA);
}

function abrir(tipo: TipoToast, titulo: string, o: Opcoes = {}) {
  const id = ++seq;
  const ms = o.fixo ? 0 : DURACAO;
  const fila = [...itens.filter((t) => !t.saindo), { ...o, id, tipo, titulo, ms, desc: emLinhas(o.desc) }];
  // três na tela (regra 05), mas o estado fixo não é candidato à saída: uma rajada
  // de erros não pode expulsar o "sem conexão" que explica todos eles
  while (fila.length > MAX) {
    const i = fila.findIndex((t) => !t.fixo);
    if (i < 0) break;
    fila.splice(i, 1);
  }
  itens = fila;
  notificar();
  if (ms) agendar(id, ms);
  return id;
}

// só `estado` devolve o id: os outros somem sozinhos e um retorno não-void
// quebraria os `startTransition(() => toast.x(...))` espalhados pelo admin
export const toast = {
  sucesso: (titulo: string, o?: Opcoes) => void abrir("sucesso", titulo, o),
  erro: (titulo: string, o?: Opcoes) => void abrir("erro", titulo, o),
  aviso: (titulo: string, o?: Opcoes) => void abrir("aviso", titulo, o),
  info: (titulo: string, o?: Opcoes) => void abrir("info", titulo, o),
  /** estado que muda por fora (offline, processando): sem relógio; devolve o id para fechar */
  estado: (titulo: string, o?: Opcoes) => abrir("info", titulo, { ...o, fixo: true }),
  /**
   * Ação que falhou: título fixo do que se tentou fazer, os erros da API listados
   * abaixo (um por linha) e, quando dá para repetir, "tentar de novo" no rodapé.
   */
  falhou: (titulo: string, erro: unknown, aoTentar?: () => void) =>
    void abrir("erro", titulo, {
      desc: erro instanceof Error ? erro.message : String(erro ?? ""),
      acao: aoTentar && "tentar de novo →",
      aoAgir: aoTentar,
    }),
  fechar,
  pausar,
  retomar,
  rotuloPadrao: (t: TipoToast) => ROTULO[t],
};

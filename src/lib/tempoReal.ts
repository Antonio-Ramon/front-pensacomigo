import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { API_PUBLICA } from "./navegador";

/**
 * Uma conexão por aba, compartilhada por todos os componentes que escutam. Cada um abrindo a
 * sua abriria 3 WebSockets na página do post (comentários, curtidas, visualizações) para
 * receber os mesmos eventos.
 *
 * As strings ("Entrar", "ComentarioCriado", …) atravessam a fronteira sem compilador nenhum
 * vigiando: elas nascem no `TempoRealHub` e nos `SendAsync` do backend.
 *
 * A conexão nunca é parada: ela vive enquanto a aba viver. Isso também apaga a corrida do
 * `stop()` no meio do `negotiate` ("connection was stopped during negotiation", que aparecia
 * a cada remontagem do efeito em StrictMode) — o que entra e sai agora é ouvinte e grupo.
 */
let conexao: Promise<HubConnection> | null = null;

/** Grupos em que esta aba entrou. O reconnect gera outro ConnectionId, e o servidor não
 *  recoloca ninguém em grupo nenhum — quem reentra é o cliente. */
const gruposAtivos = new Set<string>();
const aoReconectar = new Set<() => void>();

function obter() {
  if (!conexao) {
    const c = new HubConnectionBuilder()
      .withUrl(`${API_PUBLICA}/hubs/tempo-real`)
      .withAutomaticReconnect()
      .build();

    c.onreconnected(() => {
      gruposAtivos.forEach((id) => c.invoke("Entrar", id).catch(() => {}));
      // Não basta reentrar: o que aconteceu durante a queda não vira evento nenhum.
      aoReconectar.forEach((f) => f());
    });

    conexao = c.start().then(() => c);
  }
  return conexao;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- cada evento tem um payload
// diferente e `unknown[]` recusaria um `setTotal(n: number)` no ponto da chamada.
type Ouvinte = (...args: any[]) => void;

function assinar(eventos: Record<string, Ouvinte>) {
  // Sem realtime a página continua funcionando com o GET — por isso o catch vazio.
  obter()
    .then((c) => Object.entries(eventos).forEach(([nome, acao]) => c.on(nome, acao)))
    .catch(() => {});

  // Cleanup de efeito não pode devolver Promise — daí o corpo em bloco.
  return () => {
    obter()
      .then((c) => Object.entries(eventos).forEach(([nome, acao]) => c.off(nome, acao)))
      .catch(() => {});
  };
}

/**
 * Escuta eventos do grupo `post:{id}` enquanto o componente viver. Devolve o cleanup do
 * `useEffect`: sem ele, trocar de post deixa o ouvinte antigo pendurado.
 */
export function ouvirPost(postId: string, eventos: Record<string, Ouvinte>, refazerGet?: () => void) {
  const desassinar = assinar(eventos);
  gruposAtivos.add(postId);
  obter().then((c) => c.invoke("Entrar", postId)).catch(() => {});
  if (refazerGet) aoReconectar.add(refazerGet);

  return () => {
    desassinar();
    gruposAtivos.delete(postId);
    if (refazerGet) aoReconectar.delete(refazerGet);
    obter().then((c) => c.invoke("Sair", postId)).catch(() => {});
  };
}

/**
 * Escuta eventos que não pertencem a post nenhum — post publicado/removido vão em
 * `Clients.All`, porque quem está no feed não abriu post algum e não está em grupo.
 */
export function ouvirGeral(eventos: Record<string, Ouvinte>) {
  return assinar(eventos);
}

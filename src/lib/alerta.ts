// ponytail: ainda sem toasts — erro de server action vira alert() para não derrubar a tela.
// Quando os toasts chegarem, trocar só aqui.
export function alertaErro(e: unknown) {
  alert(e instanceof Error ? e.message : "Algo deu errado. Tente de novo.");
}

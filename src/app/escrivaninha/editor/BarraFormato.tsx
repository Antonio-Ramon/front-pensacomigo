"use client";

import { memo, type RefObject } from "react";
import { Bold, Code, Italic, List, ListOrdered, Quote, Strikethrough } from "lucide-react";
import styles from "./editor.module.css";

// Barra do bloco de parágrafo: mexe nos MARCADORES do textarea (ver marcacao.ts), não em
// HTML. Por isso não precisa de contenteditable — o textarea continua sendo a verdade.
//
// `memo` com props estáveis (nada de arrow function vinda do pai): o Editor inteiro
// re-renderiza a cada tecla, e sete ícones SVG por bloco de parágrafo pesam na digitação.

const INLINE = [
  { Icone: Bold, marca: "*", titulo: "Negrito" },
  { Icone: Italic, marca: "_", titulo: "Itálico" },
  { Icone: Strikethrough, marca: "~", titulo: "Tachado" },
  { Icone: Code, marca: "`", titulo: "Código" },
] as const;

const POR_LINHA = [
  { Icone: ListOrdered, titulo: "Lista numerada", teste: /^\d+[.)] /, prefixo: (i: number) => `${i + 1}. ` },
  { Icone: List, titulo: "Lista", teste: /^- /, prefixo: () => "- " },
  { Icone: Quote, titulo: "Citação", teste: /^>\s?/, prefixo: () => "> " },
] as const;

/** qualquer prefixo de linha que a barra saiba pôr — tirar um é trocar por outro */
const PREFIXO = /^(?:- |\d+[.)] |>\s?)/;

export const BarraFormato = memo(function BarraFormato({
  textareas,
  chave,
  indice,
  onChange,
}: {
  textareas: RefObject<Record<number, HTMLTextAreaElement | null>>;
  chave: number;
  indice: number;
  onChange: (indice: number, texto: string) => void;
}) {
  const ta = () => textareas.current[chave];
  function trocar(el: HTMLTextAreaElement, texto: string, ini: number, fim: number) {
    onChange(indice, texto);
    // o valor só chega ao DOM no próximo render; a seleção volta depois dele
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(ini, fim);
    });
  }

  function inline(marca: string) {
    const el = ta();
    if (!el) return;
    const { value, selectionStart: a, selectionEnd: b } = el;
    const dentro = value.slice(a, b);
    if (value.slice(a - 1, a) === marca && value.slice(b, b + 1) === marca)
      return trocar(el, value.slice(0, a - 1) + dentro + value.slice(b + 1), a - 1, b - 1);
    trocar(el, value.slice(0, a) + marca + dentro + marca + value.slice(b), a + 1, b + 1);
  }

  function porLinha(teste: RegExp, prefixo: (i: number) => string) {
    const el = ta();
    if (!el) return;
    const { value, selectionStart: a, selectionEnd: b } = el;
    const ini = value.lastIndexOf("\n", a - 1) + 1;
    const quebra = value.indexOf("\n", b);
    const fim = quebra < 0 ? value.length : quebra;
    const linhas = value.slice(ini, fim).split("\n");
    const jaEsta = linhas.every((l) => teste.test(l));
    const novas = linhas
      .map((l) => l.replace(PREFIXO, ""))
      .map((l, i) => (jaEsta ? l : prefixo(i) + l))
      .join("\n");
    trocar(el, value.slice(0, ini) + novas + value.slice(fim), ini, ini + novas.length);
  }

  return (
    // mousedown segurado: sem isso o textarea perde o foco e a seleção some antes do clique
    <span className={styles.barraFormato} onMouseDown={(e) => e.preventDefault()}>
      {INLINE.map(({ Icone, marca, titulo }) => (
        <button key={marca} type="button" title={titulo} onClick={() => inline(marca)}>
          <Icone size={13} />
        </button>
      ))}
      <i className={styles.barraSep} />
      {POR_LINHA.map(({ Icone, titulo, teste, prefixo }) => (
        <button key={titulo} type="button" title={titulo} onClick={() => porLinha(teste, prefixo)}>
          <Icone size={13} />
        </button>
      ))}
    </span>
  );
});

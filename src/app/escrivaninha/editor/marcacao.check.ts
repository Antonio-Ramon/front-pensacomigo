// Autoteste da marcação. Rodar: node --experimental-strip-types src/app/escrivaninha/editor/marcacao.check.ts
import assert from "node:assert/strict";
import { deHtml, ehMarcavel, paraHtml } from "./marcacao.ts";

const eq = (texto: string, html: string) => {
  assert.equal(paraHtml(texto), html, `paraHtml(${JSON.stringify(texto)})`);
  assert.equal(deHtml(html), texto, `deHtml(${JSON.stringify(html)})`);
};

eq("Um texto simples.", "<p>Um texto simples.</p>");
eq("Uma linha\nlogo abaixo da outra", "<p>Uma linha<br>logo abaixo da outra</p>");
eq("Primeiro.\n\nSegundo.", "<p>Primeiro.</p><p>Segundo.</p>");
eq("Fé *não* é _acordo_ ~comercial~.", "<p>Fé <strong>não</strong> é <em>acordo</em> <s>comercial</s>.</p>");
eq("Roda `npm run build` aí.", "<p>Roda <code>npm run build</code> aí.</p>");
eq("> Até quando, SENHOR?", "<blockquote>Até quando, SENHOR?</blockquote>");
eq("- um\n- dois", "<ul><li>um</li><li>dois</li></ul>");
eq("1. um\n2. dois", "<ol><li>um</li><li>dois</li></ol>");
eq(
  "Antes.\n\n> Citado *com* ênfase.\n\n- item\n\nDepois.",
  "<p>Antes.</p><blockquote>Citado <strong>com</strong> ênfase.</blockquote><ul><li>item</li></ul><p>Depois.</p>",
);

// o marcador dentro de `código` é texto, não formatação
assert.equal(paraHtml("veja `a * b` agora"), "<p>veja <code>a * b</code> agora</p>");
// < e & do usuário viram entidade — nada de tag inventada
assert.equal(paraHtml("1 < 2 & 3"), "<p>1 &lt; 2 &amp; 3</p>");
// marcador solto ou com espaço não formata nada
assert.equal(paraHtml("2 * 3 = 6"), "<p>2 * 3 = 6</p>");

// HTML que não cabe no bloco de parágrafo continua caindo no fallback "html"
assert.equal(ehMarcavel("<p>ok</p><ul><li>x</li></ul>"), true);
assert.equal(ehMarcavel('<h2>t</h2><p>ok</p>'), false);
assert.equal(ehMarcavel('<div class="verse"><div class="r">Sl 13</div><q>x</q></div>'), false);
assert.equal(ehMarcavel(""), false);

console.log("marcacao: ok");

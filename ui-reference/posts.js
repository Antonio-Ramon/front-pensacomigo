// Dados compartilhados do protótipo — Home, Arquivo e Post leem daqui.
export const AUTHORS = {
  antonio: { name: 'Antonio', initials: 'AR', full: 'Antonio Ribeiro', bio: 'Desenvolvedor e adventista. Escreve os textos de estudo do Pensa Comigo. Gosta de texto original e de perguntas que não têm resposta rápida.' },
  jessica: { name: 'Jéssica', initials: 'JR', full: 'Jéssica Ribeiro', bio: 'Psicóloga. Escreve as meditações de chão-da-vida do Pensa Comigo — as que começam na terça-feira e terminam no texto.' },
};

export const STAGES = [
  { number: '01', title: 'A pergunta', description: 'Onde a dúvida é dita em voz alta, sem pedir desculpas.', refs: ['Habacuque 1:2', 'Salmos 13:1', 'Jó 23:3'] },
  { number: '02', title: 'A busca', description: 'Estudo, contexto e a disciplina de não aceitar respostas fáceis.', refs: ['Atos 17:11', 'Provérbios 2:4', 'Jeremias 29:13'] },
  { number: '03', title: 'O encontro', description: 'Quando o texto para de ser assunto e vira endereço.', refs: ['Lucas 24:32', 'João 20:28', 'Êxodo 3:14'] },
  { number: '04', title: 'O descanso', description: 'A fé que sobra depois que a emoção passa — e sustenta a semana.', refs: ['Salmos 23:2', 'Isaías 30:15', 'Hebreus 4:9'] },
];

export const MOODS = {
  cansado: { label: 'cansado', cmd: 'abrir --estado=cansado', slug: 'mateus-11-28', cite: 'Mateus 11:28', text: '“Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.”' },
  duvida: { label: 'em dúvida', cmd: 'abrir --estado=duvida', slug: 'marcos-9-24', cite: 'Marcos 9:24', text: '“Eu creio! Ajuda-me na minha falta de fé.”' },
  medo: { label: 'com medo', cmd: 'abrir --estado=medo', slug: 'isaias-41-10', cite: 'Isaías 41:10', text: '“Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.”' },
  grato: { label: 'grato', cmd: 'abrir --estado=grato', slug: 'salmos-103-2', cite: 'Salmos 103:2', text: '“Bendize, ó minha alma, ao Senhor, e não te esqueças de nenhum de seus benefícios.”' },
  luto: { label: 'em luto', cmd: 'abrir --estado=luto', slug: 'salmos-34-18', cite: 'Salmos 34:18', text: '“Perto está o Senhor dos que têm o coração quebrantado.”' },
};

export const POSTS = [
  {
    slug: 'elias-dormiu-antes-de-ouvir-a-voz',
    date: '14 ago 2026', title: 'Elias dormiu antes de ouvir a voz',
    dek: 'Antes da brisa suave, Deus mandou o profeta comer e descansar. Um estudo sobre por que o cuidado com o corpo vem antes da revelação.',
    tags: ['1 Reis 19', 'descanso'], mood: ['cansado', 'luto'], stage: '04', author: 'antonio', readMin: 6,
    caption: 'Foto: o deserto de Berseba ao entardecer',
    sections: [
      { id: 'sec-1', label: 'A resposta de Deus não é um sermão' },
      { id: 'sec-2', label: 'A ordem importa mais do que parece' },
      { id: 'sec-3', label: 'Para a sua semana' },
    ],
    body: `
  <p>Elias acabou de vencer o maior confronto público da sua carreira profética. No capítulo 18, fogo desce do céu diante de centenas de testemunhas. No capítulo 19, ele está sentado debaixo de um arbusto no deserto, pedindo para morrer.</p>
  <p>Nove versículos separam o auge da queda. É um dado que a maioria das pregações sobre esse texto prefere não mencionar.</p>
  <div class="verse"><div class="r">1 Reis 19:4</div><q>“Basta; toma agora, ó Senhor, a minha alma, pois não sou melhor do que meus pais.”</q></div>
  <h2 id="sec-1">A resposta de Deus não é um sermão</h2>
  <p>Aqui está a parte desconcertante. Diante de um profeta em colapso, Deus não repreende, não cita o milagre recente como prova de que Elias deveria confiar mais, não pergunta onde foi parar a fé dele.</p>
  <p>Manda um anjo com pão e água. E deixa ele dormir. <mark>Duas vezes.</mark></p>
  <div class="verse"><div class="r">1 Reis 19:7</div><q>“Levanta-te e come, porque o caminho te será longo demais.”</q></div>
  <div class="aside"><b>nota de estudo</b>O verbo hebraico usado para o toque do anjo (נָגַע, <em>naga</em>) é o mesmo empregado em contextos de contato físico gentil. Não é uma sacudida para acordar — é um toque.</div>
  <figure><div class="ph">imagem no meio do post · escolhida pelo autor</div><figcaption>O monte Horebe, destino dos quarenta dias</figcaption></figure>
  <h2 id="sec-2">A ordem importa mais do que parece</h2>
  <p>Só <strong>depois</strong> de duas refeições e dois períodos de sono é que a narrativa avança para o monte Horebe. E é lá, quarenta dias depois, que vêm o vento, o terremoto, o fogo — e finalmente a voz mansa e delicada.</p>
  <p>A revelação chega no fim da sequência, não no começo. O cuidado com o corpo não é uma etapa preliminar irrelevante: é metade do capítulo.</p>
  <h2 id="sec-3">Para a sua semana</h2>
  <p>Se você tem orado por direção e não tem ouvido nada, vale fazer uma pergunta nada mística antes de qualquer outra: você dormiu? Você comeu? Você parou?</p>
  <p>Às vezes o próximo passo de obediência é ir para a cama.</p>`,
    apply: [
      'Verifique quantas horas você realmente dormiu nesta semana',
      'Faça uma refeição sem tela e sem pressa hoje',
      'Antes de cobrar direção de Deus, pergunte se você deu ao corpo o que ele pediu',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 128 },
      { label: 'Orei por isso', count: 46 },
      { label: 'Vou reler', count: 19 },
    ],
    comments: [
      { author: 'Marina', date: '15 ago 2026', body: 'Li isso num dia em que eu tinha dormido quatro horas. Doeu na medida certa.', replies: [{ author: 'Antonio', date: '15 ago 2026', body: 'Boa pergunta implícita aí — o versículo 7 responde em parte.' }] },
      { author: 'Caio', date: '14 ago 2026', body: 'Nunca tinha reparado que a revelação vem depois das duas refeições. Muda o capítulo inteiro.', replies: [] },
    ],
  },
  {
    slug: 'tome-nao-foi-o-incredulo-da-historia',
    date: '11 ago 2026', title: 'Tomé não foi o incrédulo da história',
    dek: 'Ele foi o único que pediu evidência — e recebeu. O que o texto revela sobre a resposta de Jesus a quem precisa ver para crer.',
    tags: ['João 20', 'dúvida'], mood: ['duvida'], stage: '01', author: 'antonio', readMin: 5,
    caption: 'Foto: mãos abertas contra a luz',
    sections: [
      { id: 'sec-1', label: 'O pedido que os outros não fizeram' },
      { id: 'sec-2', label: 'Jesus não muda de assunto' },
      { id: 'sec-3', label: 'Para a sua semana' },
    ],
    body: `
  <p>O apelido pegou: Tomé, o incrédulo. Mas releia a cena. Os outros dez discípulos só creram <em>depois</em> de ver Jesus ressuscitado — Tomé apenas pediu o mesmo tratamento que todos já tinham recebido.</p>
  <div class="verse"><div class="r">João 20:25</div><q>“Se eu não vir nas suas mãos o sinal dos cravos… de maneira nenhuma crerei.”</q></div>
  <h2 id="sec-1">O pedido que os outros não fizeram</h2>
  <p>Tomé não estava na sala na primeira aparição. A dúvida dele não nasce de rebeldia; nasce de ausência. Ele perdeu a evidência que fundou a fé dos colegas e se recusou a viver de testemunho de segunda mão.</p>
  <div class="aside"><b>nota de estudo</b>No grego, Jesus não chama Tomé de ἄπιστος (incrédulo) como acusação — o convite do v. 27 é literalmente “não te tornes incrédulo, mas crente”. É direção, não rótulo.</div>
  <h2 id="sec-2">Jesus não muda de assunto</h2>
  <p>Oito dias depois, Jesus aparece de novo — e a primeira coisa que faz é atender o pedido, nos termos exatos em que foi feito. <mark>Põe as mãos à disposição.</mark></p>
  <p>A resposta à dúvida sincera, no texto, nunca é vergonha. É evidência. E é de Tomé, o “incrédulo”, que sai a confissão cristológica mais alta do evangelho: “Senhor meu, e Deus meu”.</p>
  <h2 id="sec-3">Para a sua semana</h2>
  <p>Se a sua fé está em fase de pedir para ver, você não está desqualificado. Está em João 20. Faça o pedido por escrito — e fique na sala até a resposta.</p>`,
    apply: [
      'Escreva a dúvida que você tem vergonha de dizer em voz alta',
      'Procure a resposta no texto antes de procurar em opiniões',
      'Volte à comunidade — a segunda aparição aconteceu com Tomé presente',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 94 },
      { label: 'Orei por isso', count: 31 },
      { label: 'Vou reler', count: 27 },
    ],
    comments: [
      { author: 'Débora', date: '12 ago 2026', body: 'A distinção entre rótulo e direção no versículo 27 me destravou uma culpa antiga.', replies: [] },
    ],
  },
  {
    slug: 'quando-a-resposta-demora',
    date: '7 ago 2026', title: 'Quando a resposta demora',
    dek: 'O silêncio de Deus não é ausência. Uma leitura de Habacuque para quem está no intervalo entre a oração e a resposta.',
    tags: ['Habacuque 2', 'espera'], mood: ['medo', 'cansado'], stage: '02', author: 'jessica', readMin: 5,
    caption: 'Foto: torre de vigia ao amanhecer',
    sections: [
      { id: 'sec-1', label: 'A reclamação que virou Escritura' },
      { id: 'sec-2', label: 'A resposta tem hora marcada' },
      { id: 'sec-3', label: 'Para a sua semana' },
    ],
    body: `
  <p>Habacuque abre o livro reclamando com Deus — e a reclamação foi canonizada. “Até quando, Senhor, clamarei eu, e tu não me escutarás?” não é um deslize do profeta. É o versículo 2 do capítulo 1.</p>
  <h2 id="sec-1">A reclamação que virou Escritura</h2>
  <p>Isso já diz algo: o intervalo entre a oração e a resposta é matéria bíblica. Deus não edita a espera para fora da história. Ele a documenta.</p>
  <div class="verse"><div class="r">Habacuque 2:1</div><q>“Sobre a minha torre de vigia me colocarei… para ver o que ele me dirá.”</q></div>
  <p>O gesto do capítulo 2 é o centro do livro: depois de reclamar, o profeta não vai embora. Sobe na torre. Reclamar e esperar no mesmo lugar — as duas coisas, juntas — é a definição habacuquiana de fé.</p>
  <h2 id="sec-2">A resposta tem hora marcada</h2>
  <div class="verse"><div class="r">Habacuque 2:3</div><q>“A visão é ainda para o tempo determinado… se tardar, espera-o, porque certamente virá.”</q></div>
  <p>Note a lógica estranha do versículo: <mark>“se tardar, espera — porque virá”</mark>. A demora não é evidência contra a promessa; está dentro do prazo dela.</p>
  <h2 id="sec-3">Para a sua semana</h2>
  <p>Você não precisa escolher entre honestidade e esperança. Habacuque não escolheu. Diga a Deus exatamente o que está sentindo — e depois suba na torre.</p>`,
    apply: [
      'Escreva a oração que ainda não foi respondida, com data',
      'Defina a sua “torre”: o horário fixo em que você volta ao assunto com Deus',
      'Releia a lista de respostas antigas antes de julgar o silêncio atual',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 76 },
      { label: 'Orei por isso', count: 58 },
      { label: 'Vou reler', count: 12 },
    ],
    comments: [
      { author: 'Rafael', date: '8 ago 2026', body: '“A demora está dentro do prazo da promessa” vai ficar comigo por um bom tempo.', replies: [] },
    ],
  },
  {
    slug: 'o-pao-de-cada-dia-era-so-de-um-dia',
    date: '4 ago 2026', title: 'O pão de cada dia era só de um dia',
    dek: 'O maná apodrecia se guardado. Sobre a economia estranha da provisão diária e o que ela ensina sobre ansiedade.',
    tags: ['Êxodo 16', 'gratidão'], mood: ['grato'], stage: '03', author: 'jessica', readMin: 4,
    caption: 'Foto: pão sobre mesa de madeira, manhã',
    sections: [
      { id: 'sec-1', label: 'Um sistema desenhado para dar errado no estoque' },
      { id: 'sec-2', label: 'Para a sua semana' },
    ],
    body: `
  <p>O maná tinha uma propriedade curiosa: não estocava. Quem recolhia a mais, “criava bichos e cheirava mal”. O sistema inteiro foi desenhado para funcionar só um dia por vez.</p>
  <div class="verse"><div class="r">Êxodo 16:4</div><q>“O povo sairá e colherá diariamente a porção para cada dia, para que eu o prove se anda em minha lei, ou não.”</q></div>
  <h2 id="sec-1">Um sistema desenhado para dar errado no estoque</h2>
  <p>Repare no propósito declarado: a provisão diária era um teste — não de esforço, mas de confiança. A pergunta do deserto era: você consegue dormir com a despensa vazia sabendo de quem é a manhã?</p>
  <div class="aside"><b>nota de estudo</b>É desse capítulo que Jesus tira a frase do Pai Nosso: “o pão nosso <em>de cada dia</em>”. A oração é uma citação da economia do maná.</div>
  <p><mark>A ansiedade é, muitas vezes, a tentativa de colher hoje o maná de amanhã.</mark> E o texto diz o que acontece com maná colhido fora do dia.</p>
  <h2 id="sec-2">Para a sua semana</h2>
  <p>Gratidão, em Êxodo 16, não é sentimento — é aritmética: contar o que chegou hoje e chamar de suficiente. Amanhã tem colheita de novo.</p>`,
    apply: [
      'Liste três provisões que chegaram esta semana sem você controlar',
      'Identifique um “estoque” que é ansiedade disfarçada de prudência',
      'Ore o Pai Nosso devagar, parando na palavra “hoje”',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 63 },
      { label: 'Orei por isso', count: 22 },
      { label: 'Vou reler', count: 15 },
    ],
    comments: [],
  },
  {
    slug: 'jesus-chorou-sabendo-o-final',
    date: '31 jul 2026', title: 'Jesus chorou sabendo o final',
    dek: 'Ele ia ressuscitar Lázaro em minutos e ainda assim chorou. Uma nota sobre luto que não precisa ser abreviado por teologia.',
    tags: ['João 11', 'luto'], mood: ['luto', 'medo'], stage: '01', author: 'jessica', readMin: 5,
    caption: 'Foto: entrada de tumba em Betânia',
    sections: [
      { id: 'sec-1', label: 'O versículo mais curto não é o mais raso' },
      { id: 'sec-2', label: 'Teologia não é analgésico' },
      { id: 'sec-3', label: 'Para a sua semana' },
    ],
    body: `
  <p>Jesus chega a Betânia sabendo o que vai fazer. Ele mesmo disse aos discípulos, dois dias antes: “vou despertá-lo”. O final feliz já estava decidido — e mesmo assim, diante da tumba, ele chora.</p>
  <div class="verse"><div class="r">João 11:35</div><q>“Jesus chorou.”</q></div>
  <h2 id="sec-1">O versículo mais curto não é o mais raso</h2>
  <p>Se a ressurreição iminente tornasse o choro desnecessário, este seria o momento de demonstrar isso. Em vez disso, o evangelho registra o choro sem constrangimento — e os presentes leem a cena corretamente: “vede como o amava”.</p>
  <div class="aside"><b>nota de estudo</b>O verbo do v. 33, ἐμβριμάομαι (<em>embrimaomai</em>), carrega indignação — um bufar de cavalo, literalmente. Jesus não está apenas triste diante da morte; está indignado com ela.</div>
  <h2 id="sec-2">Teologia não é analgésico</h2>
  <p>Marta recebe a doutrina (“teu irmão ressuscitará”) e responde com a doutrina certa. Jesus não corrige nada — mas também não encerra o funeral com ela. <mark>A verdade sobre o futuro não cancela a dor do presente.</mark></p>
  <p>Quem usa esperança para apressar o luto dos outros está fazendo o que Jesus, podendo, não fez.</p>
  <h2 id="sec-3">Para a sua semana</h2>
  <p>Se você está de luto: chorar não é falta de fé — é o versículo 35. Se você acompanha alguém de luto: chegue, chore junto, e guarde a teologia para quando ela for pedida.</p>`,
    apply: [
      'Não abrevie o luto de ninguém com um versículo esta semana',
      'Se a perda é sua, marque um tempo para chorar sem culpa',
      'Releia João 11 inteiro, notando quanto tempo Jesus passa ouvindo',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 141 },
      { label: 'Orei por isso', count: 67 },
      { label: 'Vou reler', count: 33 },
    ],
    comments: [
      { author: 'Helena', date: '2 ago 2026', body: 'Perdi meu pai em maio. Esse texto foi o primeiro que não tentou me apressar.', replies: [{ author: 'Jéssica', date: '2 ago 2026', body: 'Sinto muito, Helena. Sem pressa — o v. 35 continua lá.' }] },
    ],
  },
  {
    slug: 'raizes-junto-as-aguas',
    date: '28 jul 2026', title: 'Raízes junto às águas',
    dek: 'O Salmo 1 não promete ausência de seca. Promete raiz. A diferença entre as duas coisas muda como você lê o resto do saltério.',
    tags: ['Salmos 1', 'firmeza'], mood: ['duvida', 'grato'], stage: '04', author: 'antonio', readMin: 4,
    caption: 'Foto: árvore à beira de ribeiro, verão seco',
    sections: [
      { id: 'sec-1', label: 'O que a árvore não recebe' },
      { id: 'sec-2', label: 'Para a sua semana' },
    ],
    body: `
  <p>O Salmo 1 abre o saltério com uma imagem agrícola: o justo é “como árvore plantada junto a ribeiros de águas”. Lemos rápido e entendemos errado — como se a promessa fosse clima bom.</p>
  <div class="verse"><div class="r">Salmos 1:3</div><q>“Será como a árvore plantada junto a ribeiros de águas, a qual dá o seu fruto na estação própria, e cujas folhas não caem.”</q></div>
  <h2 id="sec-1">O que a árvore não recebe</h2>
  <p>Repare no que o versículo <em>não</em> diz: não promete chuva, não promete estação boa, não promete ausência de calor. Jeremias 17, que retoma a mesma imagem, é explícito: o calor <em>vem</em>, o ano de sequidão <em>vem</em>.</p>
  <p>A promessa é de localização, não de clima. <mark>A árvore não é poupada da seca — é plantada perto da água.</mark></p>
  <div class="aside"><b>nota de estudo</b>O verbo hebraico שָׁתוּל (<em>shatul</em>, “plantada”) indica transplante intencional — não uma árvore que nasceu ali por acaso, mas uma que foi posta ali por alguém.</div>
  <h2 id="sec-2">Para a sua semana</h2>
  <p>“Dá o seu fruto na estação própria” admite que existem estações sem fruto — e que elas não são fracasso. A pergunta do salmo não é “como está o clima da sua vida?”, é “onde estão as suas raízes?”.</p>`,
    apply: [
      'Nomeie a estação atual da sua vida sem eufemismo',
      'Identifique o seu “ribeiro”: a prática diária que mantém a raiz perto da água',
      'Pare de medir a fé pelo fruto do mês — meça pela localização da raiz',
    ],
    reactions: [
      { label: 'Isso me ajudou', count: 87 },
      { label: 'Orei por isso', count: 29 },
      { label: 'Vou reler', count: 41 },
    ],
    comments: [
      { author: 'Otávio', date: '29 jul 2026', body: 'A nota sobre o shatul — transplante intencional — muda o salmo inteiro pra mim.', replies: [] },
    ],
  },
];

export function findPost(slug) {
  const i = POSTS.findIndex(p => p.slug === slug);
  return { post: POSTS[i >= 0 ? i : 0], index: i >= 0 ? i : 0 };
}

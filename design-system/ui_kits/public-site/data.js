// Public data + placeholder image helper for the public-site kit.
function ph(seed, w = 800, h = 450) {
  // deterministic warm placeholder block (no external image needed)
  return null; // components fall back to accent-wash block when image is null
}

const PC_POSTS = [
  { id: 1, title: 'O silêncio também é uma resposta', tags: ['Fé', 'Silêncio'], author: 'Antonio', date: '12 jul 2026', readTime: '8 min',
    excerpt: 'A gente aprende a orar pedindo. Mas e quando a única oração possível é ficar quieto? Pensa comigo sobre o peso — e o alívio — do silêncio.' },
  { id: 2, title: 'A dúvida não é o oposto da fé', tags: ['Dúvida', 'Graça'], author: 'Jéssica', date: '05 jul 2026', readTime: '6 min',
    excerpt: 'Passei anos achando que duvidar era falhar. Talvez a dúvida seja só a fé fazendo perguntas honestas — e recusando respostas fáceis.' },
  { id: 3, title: 'Graça para quem chega tarde', tags: ['Graça'], author: 'Antonio', date: '28 jun 2026', readTime: '5 min',
    excerpt: 'A parábola dos trabalhadores da vinha me incomoda. E é justamente por isso que ela tem tanto a me ensinar sobre justiça e generosidade.' },
  { id: 4, title: 'Orar quando não há palavras', tags: ['Oração', 'Silêncio'], author: 'Jéssica', date: '20 jun 2026', readTime: '7 min',
    excerpt: 'Há dias em que a oração é só um suspiro. Descobri que Deus lê suspiros — e que isso basta.' },
  { id: 5, title: 'O que a impaciência me ensinou', tags: ['Fé'], author: 'Antonio', date: '14 jun 2026', readTime: '4 min',
    excerpt: 'Esperar nunca foi meu forte. Mas a espera tem uma pedagogia própria, lenta e teimosa, que só entendi olhando pra trás.' },
  { id: 6, title: 'Comunidade não é plateia', tags: ['Graça', 'Dúvida'], author: 'Jéssica', date: '07 jun 2026', readTime: '6 min',
    excerpt: 'É fácil confundir presença com pertencimento. Pensa comigo sobre a diferença entre assistir a uma fé e vivê-la junto.' },
];

const PC_TAGS = ['Fé', 'Graça', 'Dúvida', 'Silêncio', 'Oração'];

Object.assign(window, { PC_POSTS, PC_TAGS });

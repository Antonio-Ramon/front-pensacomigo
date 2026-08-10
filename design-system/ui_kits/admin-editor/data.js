// Admin post-list + block-editor data.
const ADMIN_POSTS = [
  { id: 1, title: 'O silêncio também é uma resposta', status: 'published', date: '12 jul 2026', views: 2417, likes: 214 },
  { id: 2, title: 'A dúvida não é o oposto da fé', status: 'published', date: '05 jul 2026', views: 1809, likes: 176 },
  { id: 3, title: 'Graça para quem chega tarde', status: 'draft', date: '—', views: 0, likes: 0 },
  { id: 4, title: 'Orar quando não há palavras', status: 'published', date: '20 jun 2026', views: 3102, likes: 288 },
];

const INITIAL_BLOCKS = [
  { id: 'b1', type: 'text', html: 'A gente aprende a orar pedindo. Desde cedo nos ensinam a lista: agradecer, confessar, pedir. Mas há um tipo de oração que ninguém ensina — a que acontece quando não sobra nenhuma palavra.' },
  { id: 'b2', type: 'image', alt: 'Uma janela ao amanhecer' },
  { id: 'b3', type: 'text', html: 'Elias, depois do fogo e do vento, encontra Deus num "cicio tranquilo e suave". Não no espetáculo — no sussurro.' },
  { id: 'b4', type: 'link', url: 'https://youtube.com', title: 'A oração contemplativa — uma introdução', description: 'Um ensaio em vídeo sobre a tradição do silêncio.', domain: 'youtube.com' },
];

Object.assign(window, { ADMIN_POSTS, INITIAL_BLOCKS });

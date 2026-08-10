# UI Kit — Área pública (leitores)

Recreation of the Pensa Comigo public blog. Composes the DS primitives (PostCard,
TagFilter, MetaLine, Comment, LinkPreview, Card, Button, Tag, Avatar, IconButton).

## Files
- `index.html` — interactive entry. Home ⇄ Post navigation (click a card / "Ler a meditação").
- `Chrome.jsx` — sticky `SiteHeader` (wordmark + centered nav + search) and `SiteFooter`.
- `HomeScreen.jsx` — two-column hero + `SectionHeading` + `TagFilter` + 3-col post grid.
- `PostScreen.jsx` — article (blocks incl. quote + inline `LinkPreview`), like/view counters,
  comments with one reply level + form, sticky sidebar (author bio, related, tags, share).
- `data.js` — sample posts + tags (Portuguese, brand voice).

## Notes
- Cover images are placeholder wash blocks — drop real 16:9 imagery in.
- Reading column capped at `--measure` (680px). Sidebar becomes end-of-page on mobile
  (collapse the grid to one column below ~900px).
- Reference: `uploads/9e7a13b430f761a461ef84c77775c08f.webp`.

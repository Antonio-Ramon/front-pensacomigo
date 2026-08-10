# UI Kit — Área administrativa (Antonio & Jéssica)

Recreation of the admin post editor + posts list.

## Files
- `index.html` — interactive entry. Starts on the **editor** (the central component);
  Cancelar/× goes to the posts list; "Nova meditação" / pencil returns to the editor.
- `PostEditorScreen.jsx` — two-column editor: big title field + block editor (left),
  metadata sidebar (slug, resumo, tags chips, data, cover drag-drop, autor) (right),
  header with Cancelar (secondary) + Publicar (primary) and a "rascunho salvo" indicator.
- `BlockEditor.jsx` — **the central component**: reorderable list of text/image/link blocks.
  - Hover drag handle (left) + action menu (duplicate / remove, right).
  - `+` inserter between blocks opens a 3-type picker (Texto / Imagem / Link).
  - Text block: floating dark toolbar (style select, B/I/U, link, quote, lists, code).
  - Image block: drag-and-drop upload area (crop/zoom/alt described).
  - Link block: uses the `LinkPreview` primitive.
- `PostsListScreen.jsx` — list with status badge (rascunho/publicado), date, view & like
  counters, edit/delete actions.
- `data.js` — sample posts + initial blocks.

## Notes
- Drag reorder + rich-text formatting are cosmetic (visual recreation, not wired).
- Reference: `uploads/f7ca5f5916439f69b5112e4d5cf4205d.webp`.
- Not built (mentioned in brief, candidates for a follow-up): comment moderation queue,
  image crop/zoom interaction, tag autocomplete dropdown.

import type { Bloco } from "@/lib/api";
import { urlDaImagem } from "@/lib/imagens";

// HTML dos blocos de texto é sanitizado na escrita pelo backend (#18) — o front confia.
export function Prose({ conteudo }: { conteudo?: Bloco[] | null }) {
  return (
    <div className="prose">
      {(conteudo ?? []).map((b) => {
        if (b.tipo === 0) {
          return <div key={b.id} dangerouslySetInnerHTML={{ __html: b.html ?? "" }} />;
        }
        if (b.tipo === 1) {
          const src = urlDaImagem(b.imagemUrl ?? b.imagemPath);
          if (!src) return null;
          return (
            <figure key={b.id}>
              <img
                src={src}
                alt={b.alt ?? ""}
                loading="lazy"
                style={b.aspectRatio ? { aspectRatio: b.aspectRatio, objectFit: "cover" } : undefined}
              />
            </figure>
          );
        }
        if (b.tipo === 2 && b.linkUrl) {
          return (
            <a key={b.id} href={b.linkUrl} className="linkCard" target="_blank" rel="noopener noreferrer">
              {b.linkThumbnail && <img src={b.linkThumbnail} alt="" loading="lazy" />}
              <span className="lc-corpo">
                {b.linkSiteName && <span className="lc-site">{b.linkSiteName}</span>}
                <span className="lc-titulo">{b.linkTitulo ?? b.linkUrl}</span>
                {b.linkDescricao && <p className="lc-desc">{b.linkDescricao}</p>}
              </span>
            </a>
          );
        }
        return null;
      })}
    </div>
  );
}

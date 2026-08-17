import React from 'react';

/**
 * The reading column. Serif 300 at 18.5px/1.78, drop cap on the first paragraph,
 * and styling for the h2 / mark / verse / aside / figure markup an article body contains.
 * In-post images: <figure><img src="…"><figcaption>…</figcaption></figure>.
 * Pass `html` for stored article HTML, or children for composed content.
 */
const CSS = `
.pc-prose{max-width:var(--measure);font-family:var(--font-display);font-size:var(--fs-prose);line-height:var(--lh-prose);font-weight:var(--w-light);color:var(--ink)}
.pc-prose p{margin:0 0 24px}
.pc-prose>p:first-of-type::first-letter{float:left;font-size:3.15em;line-height:.86;font-weight:400;padding:6px 12px 0 0;color:var(--primary)}
.pc-prose h2{font-size:1.36em;font-weight:500;margin:44px 0 16px;letter-spacing:-.015em;line-height:1.25;scroll-margin-top:80px}
.pc-prose strong{font-weight:600}
.pc-prose em{font-style:italic}
.pc-prose a{color:var(--primary);text-decoration:underline;text-underline-offset:3px}
.pc-prose a:hover{color:var(--accent)}
.pc-prose mark{background:var(--mark);color:inherit;padding:1px 2px}
.pc-prose .verse{margin:32px 0;background:var(--surface);border:1px solid var(--line);border-radius:var(--radius-md);padding:22px 24px}
.pc-prose .verse .r{font-family:var(--font-mono);font-size:10.5px;color:var(--accent);letter-spacing:.08em;margin-bottom:12px}
.pc-prose .verse .r::before{content:"> ";color:var(--faint)}
.pc-prose .verse q{font-size:1.06em;line-height:1.5;quotes:none;display:block}
.pc-prose .aside{margin:32px 0;border-left:2px solid var(--accent);padding:2px 0 2px 20px;font-family:var(--font-ui);font-size:.79em;line-height:1.65;color:var(--soft)}
.pc-prose .aside b{font-family:var(--font-mono);font-size:.86em;letter-spacing:.08em;color:var(--accent);display:block;margin-bottom:6px;font-weight:500}
.pc-prose figure{margin:32px 0}
.pc-prose figure img{display:block;width:100%;border:1px solid var(--line)}
.pc-prose figure .ph{height:220px;border:1px solid var(--line);background:repeating-linear-gradient(45deg,var(--bg-alt) 0 10px,transparent 10px 22px);display:grid;place-items:center;font-family:var(--font-mono);font-size:10.5px;letter-spacing:.08em;color:var(--faint)}
.pc-prose figcaption{font-family:var(--font-mono);font-size:10.5px;color:var(--faint);margin-top:10px;letter-spacing:.04em}
`;

export function Prose({ html, children, fontSize, style, ...rest }) {
  return (
    <>
      <style>{CSS}</style>
      <div className="pc-prose" style={{ fontSize, ...style }}
        {...(html ? { dangerouslySetInnerHTML: { __html: html } } : {})} {...rest}>
        {html ? undefined : children}
      </div>
    </>
  );
}

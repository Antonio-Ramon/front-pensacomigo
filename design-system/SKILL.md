---
name: pensa-comigo-design
description: Use this skill to generate well-branded interfaces and assets for Pensa Comigo (blog cristão de meditações — "A fé que te obriga a pensar"), either for production or throwaway prototypes/mocks. Contains the three themes (papel, tinta, terra), tokens, components and blog templates.
user-invocable: true
---

Read readme.md within this skill, then explore tokens/, components/, guidelines/ and templates/.

Everything is themed. Set `<html data-theme="papel|tinta|terra">` and use only the
semantic variables (--bg, --surface, --ink, --soft, --faint, --primary, --accent, --line,
--mark, --glow). Never hardcode a hex.

Core of the brand: editorial, quiet, hairline-ruled. One 940px column on a warm page,
serif Newsreader for titles and reading (300–500 weight), Inter Tight for interface,
JetBrains Mono for eyebrows, scripture refs and the verse terminal. Square corners everywhere (border-radius:0 on buttons, inputs, chips, cards), 1px
borders instead of shadows, real author-chosen photos (cover + in-post figures) with striped mono-labelled placeholders when missing.
No gradients (except the single hero glow), no literal religious iconography, no emoji.

If creating visual artifacts, copy the assets you need out and write static HTML. If the
user invokes this skill with no other guidance, ask what they want to build.

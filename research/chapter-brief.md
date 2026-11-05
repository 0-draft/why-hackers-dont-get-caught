# Brief: writing layer chapters for tokumei

tokumei (~/tokumei) is a bilingual static Astro 7 site (English at `/`, Japanese at `/ja/`) that explains how attackers hide who they are, layer by layer, and which layer actually gave way in documented cases. Audience: defenders, students, curious engineers. The owner wants it researched to the bone, visually obvious for beginners and still worth reading for experts, and it must not look or read AI-generated.

Read first: `research/design.md` (visual system), `src/data/layers.ts` (the seven layers and their one-liners), `src/components/Fig.astro`, `src/components/Cite.astro`, the `.dg` figure classes at the end of `src/styles/global.css`, and your research file(s) in `research/`.

## Hard rules

- Concepts, not recipes. Explain how a mechanism works and how it fails. Never write setup steps, configuration, tool commands, or advice that reads as "how to stay hidden better". When you describe a weakness, describe it from the investigator's or defender's side.
- Every factual claim (a number, a date, a name, an event, a "study found") carries `<Cite id="..." />` right after it. Anything marked UNVERIFIED or DISPUTED in the research stays out unless you verify it yourself (WebFetch the source) or present it explicitly as disputed with both sides cited.
- Prefer primary sources: court filings, DOJ/Treasury/NCA/Europol statements, the project's own docs or spec, the original paper. Journalism only where no primary source exists.
- Same content in both languages: the EN and JA files of a chapter have the same sections in the same order, the same figures (same component, same props apart from `lang`), and the same `<Cite>` ids in the same places. A validator enforces this.
- English must contain no Japanese characters. Japanese is written natively, not translated word for word: plain だ・である調, short sentences, katakana only where the term is really used that way in Japanese security writing (Tor のガードリレー, ミキサー, フィンガープリント). Spaces around Latin words in Japanese text (`Tor の出口`).

## Files you own

- `src/content/layers/en/<slug>.mdx` and `src/content/layers/ja/<slug>.mdx` (replace the stubs). Frontmatter: `title` (the layer name plus a short descriptor is fine, e.g. "Network: hiding the address"), `summary` (one sentence), `layer: <slug>`.
- `src/data/sources/<slug>.json`: the sources this chapter cites, in first-citation order. Schema in `src/data/schema.ts` (`id` kebab-case and globally unique — prefix with the chapter slug if collision is likely, `title`, `publisher`, `date` YYYY[-MM[-DD]], `url`, `kind`: primary | report | press | reference).
- Figures: `src/components/fig/<Name>.astro`, each taking `lang: "en" | "ja"` and holding its own labels for both languages. Prefix figure names with something chapter-specific to avoid collisions with other writers.

Do not edit anything else (layouts, global CSS, other chapters, i18n). If you need a component-level change, describe it in your final reply.

## Writing

- 1,400 to 2,200 English words per chapter. Start with the problem the layer solves, from the person's point of view, in two or three sentences. Then 4 to 6 `##` sections. One idea per section.
- Use the three marks in prose when they help: `<span class="hl">` for "readable to this observer", `<span class="leak">` for "this points at the person". Do not overuse them.
- Each chapter should have a "Where it gives way" style section that ties back to real cases (mention them; the case page itself is generated from `src/data/cases.json`, owned by another writer — link with `/cases/#<case-id>` only for these ids: silk-road, sabu, hammond, eldo-kim, freedom-hosting, alphabay, silk-road-2, playpen, ferizi, guccifer2, welcome-to-video, twitter-2020, bitfinex, lapsus, wazawaka, lockbitsupp, incognito, dprk-laptop-farm, pc-remote. Japanese pages link to `/ja/cases/#<id>`).
- Close with a short "Common misconceptions" section (a list of 3 to 5 items: the misconception, then the correction).
- Write like a careful engineer explaining to a colleague. No hype, no "In today's digital world", no rhetorical questions as section openers, no "Let's dive in", no em-dash chains, no bold-word-then-colon lists everywhere.

## Figures (2 to 4 per chapter)

Every figure must explain a mechanism better than prose could. Wrap each in `<Fig caption="..." size="prose|wide">`. Use inline SVG with `class="dg"` and a `viewBox`, no width/height attributes, using only the `.dg` classes (ln, ln-1, dash, soft, box, box-soft, fill-ink, fill-bar, fill-hl, fill-leak, fill-paper, stroke-leak, t-s, t-l, t-2, t-leak, t-on-hl, t-on-ink, mono, b). Meaning is fixed: black fill = hidden from the observer in question, yellow (`fill-hl`) = readable to them, magenta (`fill-leak`, `stroke-leak`, `t-leak`) = points at the real person. No other colours, no gradients, no drop shadows, no icons or emoji. Real identifiers only from documentation ranges (192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24, `example`, `.example`) or from the cited sources.

- Lines stop at box edges; arrowheads never sit inside boxes. Text never overlaps lines or other text. Leave 12px+ padding inside boxes. Keep labels short; Japanese labels are often wider than English — size boxes for the longer one.
- SVG attributes must be kebab-case (`stroke-width`, `text-anchor`, `dominant-baseline`, `stroke-dasharray`); Astro does not convert camelCase. `{` inside SVG text must be written `{"{"}`.
- Width: design for a 680px-wide viewBox for `prose` figures and up to 1100px for `wide`. On phones the figure scrolls horizontally inside its frame; that is acceptable, but keep text at 12px+ in viewBox units.
- An interactive figure is welcome when interaction is the point (e.g. stepping through peeling layers, toggling an observer). Use a plain `<script>` in the component, no framework, state reflected in `aria-pressed`, keyboard operable, respects `prefers-reduced-motion`.

## Verify before you finish

Another writer may be building at the same time, so never write to `dist/`. Run:

1. `cd ~/tokumei && pnpm exec astro build --outDir "$TMPDIR/<your-name>-dist"` — must succeed.
2. Look at your pages: start `pnpm exec astro preview --outDir "$TMPDIR/<your-name>-dist" --port <your port> --host 127.0.0.1` in the background, then screenshot with a small Node script using `./node_modules/@playwright/test/index.mjs` (`chromium.launch()`), at 1280px and 412px wide, for `/layers/<slug>/` and `/ja/layers/<slug>/`, and `locator('figure.fig').screenshot()` per figure. Read the PNGs and fix what looks wrong (overlaps, clipped labels, figures that do not explain anything). Chromium may need the sandbox disabled to launch. Stop the preview server when done.
3. `pnpm exec biome check src/components/fig` must pass (run `pnpm exec biome check --write` on your own files to format).

Final reply: per chapter, the section outline, the figures and what each shows, the number of sources (and how many primary), and any claim you dropped because you could not verify it.

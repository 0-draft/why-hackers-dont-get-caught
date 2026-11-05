# why-hackers-dont-get-caught

[日本語](README.ja.md)

Why hackers don’t get caught: how attackers hide who they are, layer by layer, why so many who are identified stay out of reach, and the single layer that gave away the ones who were caught. A bilingual (English, Japanese) visual explainer with a source on every claim.

## What is in it

- **Who can see what**: an interactive figure on the home page. Pick a route (direct, VPN, Tor, VPN then Tor, Tor with a personal login) and one or more observers (local network, ISP, VPN provider, Tor relays, the website, a global watcher). The record shows what each observer can read, and a verdict says whether they can tie the person to the activity alone or by comparing timing. It runs on a small tested model in `src/lib/vantage.ts`.
- **Seven layers**: behavior, identity, device, network, infrastructure, money, attribution. Each chapter covers what the layer hides, how it works, how it gives way, and common misconceptions, with drawn figures.
- **Case files**: documented cases drawn as a matrix of the layers each person relied on and the one investigators got through first. Disputed accounts are labelled as such.

The site explains mechanisms and failure modes. It is not a setup guide and carries no operational advice.

## Design

The visual language is a redacted record. Three marks carry all the meaning: a black bar (hidden from this observer), a highlighter (readable to them) and magenta (points at the real person). See [research/design.md](research/design.md).

## Develop

Requires Node 24 and pnpm 12.

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # static site in dist/
```

| Command | What it checks |
| --- | --- |
| `pnpm lint` | Biome (format + lint) |
| `pnpm lint:md` | markdownlint |
| `pnpm check` | `astro check` (TypeScript) |
| `pnpm test` | Vitest: the observer model, i18n, MDX parity helper |
| `pnpm validate:data` | every citation resolves, every source is cited, EN/JA chapters have the same sections, figures and citations, no Japanese left in English |
| `pnpm check:size` | page-weight budget on `dist/` |
| `pnpm test:e2e` | Playwright on desktop and mobile: every page loads, axe (WCAG 2.1 AA) passes, no horizontal scroll, figure behaviour, language switch |

## Layout

| Path | What |
| --- | --- |
| `src/content/layers/{en,ja}/*.mdx` | the seven chapters |
| `src/data/sources/*.json` | sources, one file per page |
| `src/data/cases.json` | case files |
| `src/components/fig/` | chapter figures (inline SVG) |
| `src/lib/vantage.ts` | observer model behind the home-page figure |
| `research/` | research notes the chapters were written from |

## CI

`ci.yml` runs Biome, markdownlint, astro check, Vitest with coverage, the data validator, `pnpm audit`, the build with a size budget, Playwright + axe, an offline internal link check, and actionlint + zizmor on the workflows. `codeql.yml` scans JavaScript/TypeScript and the workflows. `claude-review.yml` reviews pull requests for what CI cannot see (claims vs sources, scope, EN/JA meaning, figures); it needs a `CLAUDE_CODE_OAUTH_TOKEN` secret. `sources.yml` checks every source URL weekly and keeps one issue open for dead ones. Dependabot updates npm packages and actions weekly.

Every push to `main` that passes CI is built with the GitHub Pages base path (`BASE_PATH=/why-hackers-dont-get-caught/`), checked so that every internal link carries that base, and deployed to <https://0-draft.github.io/why-hackers-dont-get-caught/>.

## Corrections

Open an issue with the page and the source that contradicts it.

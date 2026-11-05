// Data integrity for why-hackers-dont-get-caught. Runs in CI and fails on the first class of
// problem a reader would notice: a citation that points nowhere, a source no
// page cites, English and Japanese chapters that drifted apart, Japanese text
// left in English, or a link to a case that does not exist.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { LAYER_SLUGS } from "../src/data/layers.ts";
import { BASICS_SLUGS, caseFileSchema, ESSAY_SLUGS, sourceFileSchema } from "../src/data/schema.ts";
import { extractShape, hasJapanese, parseFrontmatter } from "./lib/mdx-shape.ts";

const root = new URL("..", import.meta.url).pathname;
// Every MDX page that exists in both languages: the seven layers and the essays.
const PAGES = [
  ...LAYER_SLUGS.map((slug) => ({ slug, dir: "src/content/layers", key: "layer" })),
  ...ESSAY_SLUGS.map((slug) => ({ slug, dir: "src/content/essays", key: "essay" })),
  ...BASICS_SLUGS.map((slug) => ({ slug, dir: "src/content/basics", key: "basics" })),
];
const errors: string[] = [];
const err = (m: string) => errors.push(m);

// ---- sources ----
const srcDir = join(root, "src/data/sources");
const sourceOwner = new Map<string, string>();
const urlOwner = new Map<string, string>();
for (const f of readdirSync(srcDir).filter((x) => x.endsWith(".json"))) {
  const page = f.replace(/\.json$/, "");
  const parsed = sourceFileSchema.safeParse(JSON.parse(readFileSync(join(srcDir, f), "utf8")));
  if (!parsed.success) {
    err(`sources/${f}: ${parsed.error.message}`);
    continue;
  }
  if (page !== "cases" && !PAGES.some((x) => x.slug === page)) err(`sources/${f}: no page named "${page}"`);
  for (const s of parsed.data) {
    if (sourceOwner.has(s.id)) err(`source id "${s.id}" is defined in both ${sourceOwner.get(s.id)} and ${page}`);
    sourceOwner.set(s.id, page);
    // One document, one id: a page cites another page's source by its id
    // rather than listing the same URL again.
    const key = s.url.replace(/\/+$/, "").replace(/^http:/, "https:");
    if (urlOwner.has(key))
      err(`source "${s.id}" (${page}) repeats the URL of "${urlOwner.get(key)}"; cite that id instead`);
    else urlOwner.set(key, `${s.id}`);
    if (s.url.startsWith("http://") && !/^http:\/\/(www\.)?diversify-project\.eu/.test(s.url))
      err(`source "${s.id}" uses http:// — use https:// if the site supports it`);
  }
}
const cited = new Map<string, Set<string>>(); // source id -> pages citing it

// ---- cases ----
const casesRaw = JSON.parse(readFileSync(join(root, "src/data/cases.json"), "utf8"));
const cases = caseFileSchema.safeParse(casesRaw);
const caseIds = new Set<string>();
if (!cases.success) err(`cases.json: ${cases.error.message}`);
else {
  for (const c of cases.data) {
    if (caseIds.has(c.id)) err(`case "${c.id}" appears twice`);
    caseIds.add(c.id);
    for (const s of c.sources) {
      if (!sourceOwner.has(s)) err(`case "${c.id}" cites unknown source "${s}"`);
      (cited.get(s) ?? cited.set(s, new Set()).get(s)!).add("cases");
    }
    for (const field of ["name", "alias", "mechanism", "outcome", "disputed", "background"] as const) {
      const v = c[field];
      if (v && hasJapanese(v.en)) err(`case "${c.id}".${field}.en contains Japanese`);
      if (v && v.en === v.ja && field !== "alias")
        err(`case "${c.id}".${field}: ja is identical to en (untranslated?)`);
    }
  }
}

// ---- chapters and essays ----
for (const { slug, dir, key } of PAGES) {
  const contentDir = join(root, dir);
  const shapes = {} as Record<"en" | "ja", ReturnType<typeof extractShape>>;
  for (const lang of ["en", "ja"] as const) {
    const file = join(contentDir, lang, `${slug}.mdx`);
    let body: string;
    try {
      body = readFileSync(file, "utf8");
    } catch {
      // Essays may not exist yet; layer chapters must.
      if (key === "layer" || existsSync(join(contentDir, lang === "en" ? "ja" : "en", `${slug}.mdx`)))
        err(`missing ${lang}/${slug}.mdx`);
      continue;
    }
    const fm = parseFrontmatter(body);
    if (fm[key] !== slug) err(`${lang}/${slug}.mdx: frontmatter ${key} is "${fm[key]}"`);
    const shape = extractShape(body);
    shapes[lang] = shape;
    if (lang === "en" && hasJapanese(body)) {
      const line = body.split("\n").findIndex((l) => hasJapanese(l)) + 1;
      err(`en/${slug}.mdx:${line} contains Japanese`);
    }
    for (const id of shape.cites) {
      if (!sourceOwner.has(id)) err(`${lang}/${slug}.mdx cites unknown source "${id}"`);
      (cited.get(id) ?? cited.set(id, new Set()).get(id)!).add(slug);
    }
    for (const id of shape.caseLinks) {
      if (!caseIds.has(id)) err(`${lang}/${slug}.mdx links to unknown case "#${id}"`);
    }
    for (const href of shape.langLinks) {
      if (lang === "en" && href.startsWith("/ja/")) err(`en/${slug}.mdx links into Japanese pages: ${href}`);
      if (lang === "ja" && href.startsWith("/") && !href.startsWith("/ja/"))
        err(`ja/${slug}.mdx links to an English page: ${href}`);
    }
  }
  const { en, ja } = shapes;
  if (!en || !ja) continue;
  const same = (a: unknown[], b: unknown[]) => JSON.stringify(a) === JSON.stringify(b);
  if (!same(en.cites, ja.cites))
    err(`${slug}: citations differ between en and ja\n  en: ${en.cites.join(" ")}\n  ja: ${ja.cites.join(" ")}`);
  if (!same(en.components, ja.components))
    err(
      `${slug}: components differ between en and ja\n  en: ${en.components.join(" ")}\n  ja: ${ja.components.join(" ")}`,
    );
  if (en.h2 !== ja.h2) err(`${slug}: en has ${en.h2} sections, ja has ${ja.h2}`);
  if (!same(en.caseLinks, ja.caseLinks)) err(`${slug}: case links differ between en and ja`);
}

// ---- every source is cited by its own page ----
for (const [id, page] of sourceOwner) {
  const by = cited.get(id);
  if (!by) err(`source "${id}" (${page}.json) is never cited`);
  else if (!by.has(page)) err(`source "${id}" lives in ${page}.json but only ${[...by].join(", ")} cite it`);
}

if (errors.length) {
  console.error(`validate-data: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`- ${e}`);
  process.exit(1);
}
console.log(
  `validate-data: ok (${sourceOwner.size} sources, ${caseIds.size} cases, ${PAGES.length} pages x 2 languages)`,
);

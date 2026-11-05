// After a build with BASE_PATH set, every root-relative href/src must carry
// the base; one that does not would 404 on GitHub Pages.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = (process.env.BASE_PATH ?? "/").replace(/\/$/, "");
if (!base) {
  console.log("check-base: BASE_PATH unset, nothing to check");
  process.exit(0);
}
const dist = new URL("../dist", import.meta.url).pathname;
const walk = (d: string): string[] =>
  readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));

const bad: string[] = [];
let n = 0;
for (const f of walk(dist).filter((x) => x.endsWith(".html"))) {
  const html = readFileSync(f, "utf8");
  for (const m of html.matchAll(/\b(?:href|src)="(\/[^"]*)"/g)) {
    n++;
    const url = m[1]!;
    if (url.startsWith("//")) continue;
    if (url !== base && !url.startsWith(`${base}/`)) bad.push(`${f.replace(dist, "")}: ${url}`);
  }
}
if (bad.length) {
  console.error(`check-base: ${bad.length} link(s) missing ${base}`);
  for (const b of bad.slice(0, 50)) console.error(`  ${b}`);
  process.exit(1);
}
console.log(`check-base: ${n} root-relative links, all under ${base}/`);

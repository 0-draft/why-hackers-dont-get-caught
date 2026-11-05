// Page-weight budget. The site is text and SVG; if the JavaScript or an HTML
// page grows past these numbers, something heavy slipped in.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";

const dist = new URL("../dist", import.meta.url).pathname;
const BUDGET = { jsTotalGz: 40 * 1024, htmlPageGz: 60 * 1024, cssTotalGz: 30 * 1024 };

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const files = walk(dist);
const gz = (p: string) => gzipSync(readFileSync(p)).length;
// Bundled assets only: public/fonts is loaded lazily by Japanese pages.
const bundled = files.filter((f) => !f.includes("/fonts/"));
const sum = (ext: string) => bundled.filter((f) => f.endsWith(ext)).reduce((n, f) => n + gz(f), 0);
const fails: string[] = [];

const js = sum(".js");
const css = sum(".css");
if (js > BUDGET.jsTotalGz) fails.push(`JS total ${js} B gz > ${BUDGET.jsTotalGz}`);
if (css > BUDGET.cssTotalGz) fails.push(`CSS total ${css} B gz > ${BUDGET.cssTotalGz}`);
let biggest = ["", 0] as [string, number];
for (const f of files.filter((x) => x.endsWith(".html"))) {
  const n = gz(f);
  if (n > biggest[1]) biggest = [f.replace(dist, ""), n];
  if (n > BUDGET.htmlPageGz) fails.push(`${f.replace(dist, "")} ${n} B gz > ${BUDGET.htmlPageGz}`);
}
console.log(`JS ${js} B gz, CSS ${css} B gz, largest page ${biggest[0]} ${biggest[1]} B gz`);
if (fails.length) {
  for (const f of fails) console.error(`over budget: ${f}`);
  process.exit(1);
}

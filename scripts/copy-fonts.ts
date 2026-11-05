// Japanese pages need LINE Seed JP; English pages do not. The font's CSS is
// ~200 KB gzipped (hundreds of unicode-range blocks), so bundling it would put
// it in front of every page. Instead, copy it to public/fonts and let the
// Japanese layout load it without blocking render.

import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const pkg = join(root, "node_modules/@fontsource/line-seed-jp");
const out = join(root, "public/fonts/line-seed-jp");
const WEIGHTS = [400, 700, 800];

rmSync(out, { recursive: true, force: true });
mkdirSync(join(out, "files"), { recursive: true });

let css = "";
let files = 0;
for (const w of WEIGHTS) {
  const src = readFileSync(join(pkg, `${w}.css`), "utf8")
    // woff2 only: every browser that runs this site supports it.
    .replace(/,\s*url\([^)]*\.woff\) format\('woff'\)/g, "");
  for (const m of src.matchAll(/url\(\.\/files\/([^)]+\.woff2)\)/g)) {
    copyFileSync(join(pkg, "files", m[1]!), join(out, "files", m[1]!));
    files++;
  }
  css += src;
}
writeFileSync(join(out, "line-seed-jp.css"), css);
console.log(`copy-fonts: ${files} files, ${(css.length / 1024).toFixed(0)} KB css`);

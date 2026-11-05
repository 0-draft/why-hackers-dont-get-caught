// Minimal static server for the built site, used by the Playwright suite.
// `astro preview` allows one server per project, which collides with any
// other preview already running; this has no such state.

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname;
const port = Number(process.env.PORT ?? 4377);
const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

function resolve(urlPath: string): string | null {
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0]!)).replace(/^(\.\.[/\\])+/, "");
  let p = join(root, clean);
  if (!p.startsWith(root)) return null;
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  else if (!existsSync(p) && existsSync(`${p}.html`)) p = `${p}.html`;
  return existsSync(p) ? p : null;
}

createServer((req, res) => {
  const path = req.url ?? "/";
  // Directory URLs without a trailing slash redirect, like a real static host.
  const dir = join(root, path.split("?")[0]!);
  if (!path.endsWith("/") && existsSync(dir) && statSync(dir).isDirectory()) {
    res.writeHead(301, { location: `${path}/` }).end();
    return;
  }
  const file = resolve(path);
  if (!file) {
    res.writeHead(404, { "content-type": TYPES[".html"]! });
    createReadStream(join(root, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`serving dist on http://127.0.0.1:${port}`));

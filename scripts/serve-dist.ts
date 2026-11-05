// Minimal static server for the built site, used by the Playwright suite.
// `astro preview` allows one server per project, which collides with any
// other preview already running; this has no such state.

import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, relative, resolve as resolvePath, sep } from "node:path";

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

/**
 * Map a request path to a file inside dist/, or null. The path is decoded,
 * normalised and then checked to stay under root before anything touches the
 * filesystem, so `..` and encoded tricks cannot escape.
 */
function inRoot(urlPath: string): string | null {
  let decoded: string;
  try {
    decoded = decodeURIComponent(urlPath.split("?")[0]!.split("#")[0]!);
  } catch {
    return null;
  }
  if (decoded.includes("\0")) return null;
  const p = resolvePath(root, `.${normalize(`/${decoded}`)}`);
  return p === root.replace(/\/$/, "") || p.startsWith(root) ? p : null;
}

function fileFor(p: string): string | null {
  if (existsSync(p) && statSync(p).isDirectory()) p = join(p, "index.html");
  else if (!existsSync(p) && existsSync(`${p}.html`)) p = `${p}.html`;
  return existsSync(p) && statSync(p).isFile() ? p : null;
}

createServer((req, res) => {
  const url = req.url ?? "/";
  const p = inRoot(url);
  if (!p) {
    res.writeHead(400).end();
    return;
  }
  // Directory URLs without a trailing slash redirect, like a real static host.
  // The target is rebuilt from the vetted filesystem path, never from the raw URL.
  if (!url.split("?")[0]!.endsWith("/") && existsSync(p) && statSync(p).isDirectory()) {
    const rel = relative(root, p).split(sep).map(encodeURIComponent).join("/");
    res.writeHead(301, { location: `/${rel}/` }).end();
    return;
  }
  const file = fileFor(p);
  if (!file) {
    res.writeHead(404, { "content-type": TYPES[".html"]! });
    createReadStream(join(root, "404.html")).pipe(res);
    return;
  }
  res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
}).listen(port, "127.0.0.1", () => console.log(`serving dist on http://127.0.0.1:${port}`));

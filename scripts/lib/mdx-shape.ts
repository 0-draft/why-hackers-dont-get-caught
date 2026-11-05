// Structural fingerprint of an MDX chapter, used to keep en/ja in step.

const JA = /[぀-ヿ㐀-䶿一-鿿ｦ-ﾟ]/;

export function hasJapanese(s: string): boolean {
  return JA.test(s);
}

export function parseFrontmatter(src: string): Record<string, string> {
  const m = /^---\n([\s\S]*?)\n---/.exec(src);
  const out: Record<string, string> = {};
  if (!m) return out;
  for (const line of m[1]!.split("\n")) {
    const kv = /^(\w+):\s*(.*)$/.exec(line);
    if (kv) out[kv[1]!] = kv[2]!.replace(/^["']|["']$/g, "");
  }
  return out;
}

export interface Shape {
  /** Cite ids in order of appearance. */
  cites: string[];
  /** Capitalised JSX components in order (Cite excluded), with their non-lang props. */
  components: string[];
  /** Number of ## sections. */
  h2: number;
  /** Case ids linked as /cases/#id or /ja/cases/#id. */
  caseLinks: string[];
  /** Site-internal hrefs. */
  langLinks: string[];
}

export function extractShape(src: string): Shape {
  const body = src.replace(/^---\n[\s\S]*?\n---/, "");
  const noCode = body.replace(/```[\s\S]*?```/g, "");
  const cites = [...noCode.matchAll(/<Cite\s+id=["']([^"']+)["']/g)].map((m) => m[1]!);
  const components = [...noCode.matchAll(/<([A-Z][A-Za-z0-9]*)\b([^>]*)>/g)]
    .filter((m) => m[1] !== "Cite")
    .map((m) => {
      const props = [...m[2]!.matchAll(/(\w+)=(?:"[^"]*"|\{[^}]*\})/g)]
        .map((p) => p[0])
        .filter((p) => !/^(lang|caption|alt|title|label)=/.test(p));
      return [m[1], ...props].join(" ");
    });
  const h2 = (noCode.match(/^## /gm) ?? []).length;
  const hrefs = [
    ...[...noCode.matchAll(/\]\((\/[^)\s]*)\)/g)].map((m) => m[1]!),
    ...[...noCode.matchAll(/href=["'](\/[^"']*)["']/g)].map((m) => m[1]!),
  ];
  const caseLinks = hrefs.map((h) => /^(?:\/ja)?\/cases\/#([a-z0-9-]+)$/.exec(h)?.[1]).filter((x): x is string => !!x);
  return { cites, components, h2, caseLinks, langLinks: hrefs };
}

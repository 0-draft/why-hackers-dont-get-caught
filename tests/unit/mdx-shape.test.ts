import { describe, expect, it } from "vitest";
import { extractShape, hasJapanese, parseFrontmatter } from "../../scripts/lib/mdx-shape.ts";

const en = `---
title: "Network"
summary: "x"
layer: network
---

import Fig from "../../../components/Fig.astro";

## One

Text<Cite id="a" /> and<Cite id="b" />. See [the case](/cases/#silk-road).

<Fig caption="An onion" size="wide">
  <OnionPeel lang="en" steps={3} />
</Fig>

\`\`\`text
<Cite id="ignored" />
\`\`\`

## Two
`;

describe("mdx-shape", () => {
  it("reads frontmatter", () => {
    expect(parseFrontmatter(en)).toMatchObject({ title: "Network", layer: "network" });
  });
  it("extracts citations, components, sections and case links", () => {
    const s = extractShape(en);
    expect(s.cites).toEqual(["a", "b"]);
    expect(s.components).toEqual(['Fig size="wide"', "OnionPeel steps={3}"]);
    expect(s.h2).toBe(2);
    expect(s.caseLinks).toEqual(["silk-road"]);
  });
  it("treats the Japanese version with the same structure as equal", () => {
    const ja = en
      .replace('caption="An onion"', 'caption="玉ねぎ"')
      .replace('lang="en"', 'lang="ja"')
      .replace("/cases/", "/ja/cases/")
      .replace("Text", "本文");
    const a = extractShape(en);
    const b = extractShape(ja);
    expect(b.cites).toEqual(a.cites);
    expect(b.components).toEqual(a.components);
    expect(b.caseLinks).toEqual(a.caseLinks);
  });
  it("detects Japanese", () => {
    expect(hasJapanese("Tor の出口")).toBe(true);
    expect(hasJapanese("Tor exit — “quoted”")).toBe(false);
  });
});

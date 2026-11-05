import { describe, expect, it } from "vitest";
import { dict, langFromPath, localePath, stripLocale } from "../../src/i18n/ui.ts";

describe("i18n", () => {
  it("has the same keys in both languages", () => {
    expect(Object.keys(dict.ja).sort()).toEqual(Object.keys(dict.en).sort());
  });
  it("keeps English free of Japanese characters", () => {
    for (const [k, v] of Object.entries(dict.en)) {
      if (k === "nav.lang") continue;
      expect(/[぀-ヿ一-鿿]/.test(v), k).toBe(false);
    }
  });
  it("maps paths between languages", () => {
    expect(localePath("en", "/cases/")).toBe("/cases/");
    expect(localePath("ja", "/cases/")).toBe("/ja/cases/");
    expect(localePath("ja", "/")).toBe("/ja/");
    expect(stripLocale("/ja/cases/")).toBe("/cases/");
    expect(stripLocale("/ja")).toBe("/");
    expect(langFromPath("/ja/layers/network/")).toBe("ja");
    expect(langFromPath("/japan/")).toBe("en");
  });
});

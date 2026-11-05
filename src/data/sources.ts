import { type Source, sourceFileSchema } from "./schema.ts";

// Each page owns one source file: src/data/sources/<page>.json. Ids are global
// so any page may cite any source; the page that lists it is its owner.
const files = import.meta.glob<Source[]>("./sources/*.json", { eager: true, import: "default" });

export const SOURCES_BY_PAGE: Record<string, Source[]> = {};
export const SOURCES: Record<string, Source & { page: string; n: number }> = {};

for (const [path, list] of Object.entries(files)) {
  const page = path.replace(/^.*\/(.+)\.json$/, "$1");
  const parsed = sourceFileSchema.parse(list);
  SOURCES_BY_PAGE[page] = parsed;
  parsed.forEach((s, i) => {
    SOURCES[s.id] = { ...s, page, n: i + 1 };
  });
}

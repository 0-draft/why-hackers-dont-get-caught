import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { layerFrontmatter } from "./data/schema.ts";

const layers = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/layers" }),
  schema: layerFrontmatter,
});

export const collections = { layers };

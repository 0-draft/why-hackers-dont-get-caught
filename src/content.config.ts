import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { essayFrontmatter, layerFrontmatter } from "./data/schema.ts";

const layers = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/layers" }),
  schema: layerFrontmatter,
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/essays" }),
  schema: essayFrontmatter,
});

export const collections = { layers, essays };

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { basicsFrontmatter, essayFrontmatter, layerFrontmatter } from "./data/schema.ts";

const layers = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/layers" }),
  schema: layerFrontmatter,
});

const essays = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/essays" }),
  schema: essayFrontmatter,
});

const basics = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/basics" }),
  schema: basicsFrontmatter,
});

export const collections = { layers, essays, basics };

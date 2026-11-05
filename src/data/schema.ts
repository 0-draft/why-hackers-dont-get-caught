import { z } from "zod";
import { FAILURE_KINDS, LAYER_SLUGS } from "./layers.ts";

const text = z.object({ en: z.string().min(1), ja: z.string().min(1) });

export const sourceSchema = z.object({
  /** Globally unique, kebab-case. Cited in MDX as <Cite id="..." />. */
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  title: z.string().min(1),
  publisher: z.string().min(1),
  /** YYYY, YYYY-MM or YYYY-MM-DD */
  date: z.string().regex(/^\d{4}(-\d{2}(-\d{2})?)?$/),
  url: z.url(),
  /** Primary = court filing, government statement, original paper or project docs. */
  kind: z.enum(["primary", "report", "press", "reference"]),
});
export type Source = z.infer<typeof sourceSchema>;
export const sourceFileSchema = z.array(sourceSchema).min(1);

export const caseSchema = z.object({
  id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
  name: text,
  /** Short alias, e.g. a handle or the operation name. */
  alias: text.optional(),
  year: z.number().int().min(1990).max(2100),
  used: z.array(z.enum(FAILURE_KINDS)).min(1),
  failed: z.enum(FAILURE_KINDS),
  mechanism: text,
  outcome: text,
  /** Set when the account of the failure is contested; explains by whom. */
  disputed: text.optional(),
  sources: z.array(z.string()).min(1),
});
export type Case = z.infer<typeof caseSchema>;
export const caseFileSchema = z.array(caseSchema).min(1);

export const ESSAY_SLUGS = ["out-of-reach"] as const;
export type EssaySlug = (typeof ESSAY_SLUGS)[number];

export const essayFrontmatter = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  essay: z.enum(ESSAY_SLUGS),
});

export const layerFrontmatter = z.object({
  title: z.string().min(1),
  /** One sentence shown under the title and in <meta name="description">. */
  summary: z.string().min(1),
  layer: z.enum(LAYER_SLUGS),
});

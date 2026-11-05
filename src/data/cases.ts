import raw from "./cases.json";
import { type Case, caseFileSchema } from "./schema.ts";

export const CASES: Case[] = caseFileSchema.parse(raw).toSorted((a, b) => a.year - b.year || a.id.localeCompare(b.id));

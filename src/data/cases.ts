import raw from "./cases.json";
import { type Case, caseFileSchema } from "./schema.ts";

export const CASES: Case[] = caseFileSchema.parse(raw).toSorted((a, b) => a.year - b.year || a.id.localeCompare(b.id));

/** A YYYY, YYYY-MM or YYYY-MM-DD date as a fractional year, mid-month or mid-year when unspecified. */
export function toYear(d: string): number {
  const [y = 0, m, dd] = d.split("-").map(Number);
  return y + ((m ?? 7) - 1) / 12 + ((dd ?? 15) - 1) / 365;
}

/** Years from the slip to the arrest or charge, for every case whose slip is dated. */
export const SLIP_GAPS: number[] = CASES.flatMap((c) =>
  c.timeline?.slip ? [toYear(c.timeline.caught) - toYear(c.timeline.slip)] : [],
);

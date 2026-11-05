// HTML for the observer figure. One code path serves the server render (so
// the figure is complete without JavaScript) and every client update.

import {
  FIELD_LABEL,
  FIELDS,
  HOPS,
  type Hop,
  type Lang,
  layersOn,
  OBSERVER_LABEL,
  type Observer,
  ROUTES,
  SCENARIO_LABEL,
  SCENARIO_NOTE,
  SCENARIOS,
  type VantageState,
  VERDICT_LABEL,
  VERDICT_NOTE,
  verdict,
  view,
} from "./vantage.ts";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export interface Labels {
  route: string;
  observers: string;
  record: string;
  notOnRoute: string;
  hidden: string;
  visible: string;
  leak: string;
  person: string;
  layers: (n: number) => string;
  pickHint: string;
}

export const LABELS: Record<Lang, Labels> = {
  en: {
    route: "Route",
    observers: "Observers",
    record: "What they can read",
    notOnRoute: "not on this route",
    hidden: "hidden",
    visible: "readable",
    leak: "points at the person",
    person: "Person",
    layers: (n) => `${n} ${n === 1 ? "layer" : "layers"} of encryption`,
    pickHint: "Pick an observer on the route above.",
  },
  ja: {
    route: "経路",
    observers: "観測者",
    record: "読めるもの",
    notOnRoute: "この経路にはいない",
    hidden: "見えない",
    visible: "読める",
    leak: "本人を指す",
    person: "本人",
    layers: (n) => `暗号化 ${n} 層`,
    pickHint: "上の経路から観測者を選ぶ。",
  },
};

export function scenarioTabs(lang: Lang, s: VantageState): string {
  return SCENARIOS.map(
    (id) =>
      `<button type="button" class="sc" data-scenario="${id}" aria-pressed="${id === s.scenario}">${esc(SCENARIO_LABEL[id][lang])}</button>`,
  ).join("");
}

/** The route row: person, then every hop; hops off the route stay in place but are struck out. */
export function routeRow(lang: Lang, s: VantageState): string {
  const L = LABELS[lang];
  const route = ROUTES[s.scenario];
  const cells: string[] = [
    `<li class="node person"><span class="dot" aria-hidden="true"></span><span class="nm">${esc(L.person)}</span></li>`,
  ];
  let prev: Hop | "person" = "person";
  for (const hop of HOPS) {
    const on = route.includes(hop);
    if (on) {
      const n = layersOn(s.scenario, prev);
      const pressed = s.observers.includes(hop);
      cells.push(
        `<li class="node on${pressed ? " picked" : ""}" data-hop="${hop}">` +
          `<span class="wire" style="--n:${n}" aria-hidden="true"></span>` +
          `<span class="wire-n" title="${esc(L.layers(n))}"><span class="sr">${esc(L.layers(n))}</span><span aria-hidden="true">${n}</span></span>` +
          `<button type="button" class="obs" data-observer="${hop}" aria-pressed="${pressed}">` +
          `<span class="dot" aria-hidden="true"></span><span class="nm">${esc(OBSERVER_LABEL[hop][lang])}</span></button></li>`,
      );
      prev = hop;
    } else {
      cells.push(
        `<li class="node off" data-hop="${hop}"><span class="wire pass" aria-hidden="true"></span>` +
          `<span class="dot" aria-hidden="true"></span><span class="nm"><s>${esc(OBSERVER_LABEL[hop][lang])}</s><span class="sr"> (${esc(L.notOnRoute)})</span></span></li>`,
      );
    }
  }
  return cells.join("");
}

export function globalToggle(lang: Lang, s: VantageState): string {
  const pressed = s.observers.includes("global");
  return `<button type="button" class="obs global" data-observer="global" aria-pressed="${pressed}"><span class="dot" aria-hidden="true"></span>${esc(OBSERVER_LABEL.global[lang])}</button>`;
}

function cell(lang: Lang, o: Observer, f: (typeof FIELDS)[number], s: VantageState): string {
  const L = LABELS[lang];
  const rec = view(s.scenario, o);
  if (!rec) return `<td>${esc(L.notOnRoute)}</td>`;
  const c = rec[f];
  const key = `${o}:${f}`;
  if (c.state === "hidden") {
    const text = c.text[lang];
    const w = Math.max(4, Math.min(11, (text || "xxxxxxxx").length * 0.62));
    return `<td data-k="${key}" data-s="hidden"><span class="bar" style="width:${w.toFixed(1)}em">&nbsp;</span><span class="sr">${esc(L.hidden)}${text ? `: ${esc(text)}` : ""}</span></td>`;
  }
  const cls = c.state === "leak" ? "leak" : "hl";
  const lit = /^[0-9a-z_.:\s()-]+$/i.test(c.text.en) && /[0-9_.]/.test(c.text.en) ? " mono" : "";
  return `<td data-k="${key}" data-s="${c.state}"><span class="${cls}${lit}">${esc(c.text[lang])}</span>${c.state === "leak" ? `<span class="sr"> (${esc(L.leak)})</span>` : ""}</td>`;
}

export function recordTable(lang: Lang, s: VantageState): string {
  const L = LABELS[lang];
  const obs = s.observers.filter((o) => o === "global" || ROUTES[s.scenario].includes(o as Hop));
  if (obs.length === 0) return `<p class="empty">${esc(L.pickHint)}</p>`;
  const head = obs.map((o) => `<th scope="col">${esc(OBSERVER_LABEL[o][lang])}</th>`).join("");
  const rows = FIELDS.map(
    (f) => `<tr><th scope="row">${esc(FIELD_LABEL[f][lang])}</th>${obs.map((o) => cell(lang, o, f, s)).join("")}</tr>`,
  ).join("");
  return `<table><caption class="sr">${esc(L.record)}</caption><thead><tr><td></td>${head}</tr></thead><tbody>${rows}</tbody></table>`;
}

export function verdictBlock(lang: Lang, s: VantageState): string {
  const v = verdict(s.scenario, s.observers);
  return `<p class="v-label" data-verdict="${v}">${esc(VERDICT_LABEL[v][lang])}</p><p class="v-note">${esc(VERDICT_NOTE[v][lang])}</p>`;
}

export function scenarioNote(lang: Lang, s: VantageState): string {
  return esc(SCENARIO_NOTE[s.scenario][lang]);
}

export const LANGS = ["en", "ja"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

// The site may be served from a sub-path (GitHub Pages project sites live at
// /<repo>/). BASE is "" at the root, or "/<repo>" without a trailing slash.
const BASE = (import.meta.env?.BASE_URL ?? "/").replace(/\/$/, "");

/** Prefix a root-relative path with the deploy base. */
export function withBase(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${BASE}${p}`;
}

/** Remove the deploy base from a pathname read from Astro.url. */
export function stripBase(path: string): string {
  return BASE && path.startsWith(BASE) ? path.slice(BASE.length) || "/" : path;
}

// English lives at the root, Japanese under /ja/.
export function localePath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return withBase(lang === DEFAULT_LANG ? p : `/${lang}${p === "/" ? "/" : p}`);
}

export function stripLocale(path: string): string {
  return stripBase(path).replace(/^\/ja(?=\/|$)/, "") || "/";
}

export function langFromPath(path: string): Lang {
  return /^\/ja(\/|$)/.test(stripBase(path)) ? "ja" : "en";
}

export const dict = {
  en: {
    "site.name": "Why hackers don’t get caught",
    "site.desc":
      "How attackers hide who they are, layer by layer, and the single layer that gives each of them away. A visual explainer with sources.",
    "nav.skip": "Skip to content",
    "nav.layers": "How they hide",
    "nav.cases": "When caught",
    "nav.reach": "Why not caught",
    "nav.sources": "Sources",
    "nav.about": "About",
    "nav.lang": "日本語",
    "nav.langLabel": "Read this page in Japanese",
    "nav.theme": "Switch theme",
    "home.h1a": "Why don’t hackers get caught?",
    "home.h1b": "Some are never found. Many are found, and out of reach.",
    "home.lede":
      "Hiding who you are online is done in layers: a network route, a clean machine, a made-up name, laundered money. Each layer hides one thing from one observer. The people who are caught usually lost one of those layers, often not the one they worried about, or stepped within reach. This site takes the layers apart and looks at both kinds of ending.",
    "home.outcomesTitle": "Three endings",
    "out.none.t": "Never identified",
    "out.none.d": "Every layer held, or nobody could afford to look that hard. These endings leave no case file.",
    "out.reach.t": "Identified, out of reach",
    "out.reach.d":
      "Named in an indictment, sanctioned, a bounty on their head, and living where no court will hand them over.",
    "out.reach.link": "Why they stay out of reach",
    "out.caught.t": "Caught",
    "out.caught.d": "One layer gave way, or they travelled within reach. The case files show which.",
    "out.caught.link": "Case files",
    "out.name": "Name",
    "home.ledgerTitle": "Named, never arrested",
    "home.ledgerLede":
      "Ten US indictments of people hacking for or on behalf of a state, 2014 to 2025. Every square is a named defendant.",
    "home.ledgerMore": "Why they stay out of reach",
    "home.vantageTitle": "How they hide: who can see what",
    "home.layersTitle": "The layers they hide behind",
    "home.layersLede":
      "Ordered from the person outward. Each layer hides something different, and each one has a characteristic way of failing.",
    "home.hides": "Hides",
    "home.breaks": "Gives way through",
    "home.casesTitle": "When they are caught",
    "home.casesLede":
      "Documented arrests, each with the layers the person relied on and the one investigators got through first. The failure is rarely in the layer people worry about.",
    "home.casesAll": "All cases",
    "vantage.route": "Route",
    "vantage.observers": "Observers (pick one, or several to see what they learn by comparing notes)",
    "vantage.record": "What the selected observer can read",
    "vantage.combined": "Selected together",
    "vantage.notOnRoute": "Not on this route",
    "vantage.legendHidden": "hidden",
    "vantage.legendVisible": "readable",
    "vantage.legendLeak": "points at the person",
    "vantage.legendWire": "one line per layer of encryption on that link",
    "vantage.assume":
      "Assumptions: the website uses HTTPS; every operator logs what passes through but breaks no encryption. Addresses are from documentation ranges.",
    "vantage.person": "Person",
    "layer.hides": "What it hides",
    "layer.breaks": "How it gives way",
    "layer.cases": "Cases that failed here",
    "layer.noCases": "No case in the collection failed at this layer first.",
    "layer.sources": "Sources",
    "layer.prev": "Closer to the person",
    "layer.next": "Further out",
    "cases.title": "Case files",
    "cases.lede":
      "Each row is one documented case. Outlined cells are layers the person relied on. The filled cell is the one investigators got through first. Sorted by year.",
    "cases.used": "relied on",
    "cases.failed": "gave way",
    "cases.mechanism": "What happened",
    "cases.outcome": "Outcome",
    "cases.disputed": "Disputed",
    "cases.sources": "Sources",
    "sources.title": "Sources",
    "sources.lede":
      "Every source cited anywhere on the site, grouped by the page that cites it. Court filings and official statements first where they exist.",
    "about.title": "About this site",
    fig: "Fig.",
    "foot.note":
      "An explainer about mechanisms and failure modes. It describes how anonymity works and how it fails; it is not a guide to setting anything up.",
    "foot.repo": "Source on GitHub",
  },
  ja: {
    "site.name": "Why hackers don’t get caught",
    "site.desc": "攻撃者はどうやって正体を隠すのか。レイヤーごとに分解し、実際にどの層で破れたかを出典つきで図解する。",
    "nav.skip": "本文へ移動",
    "nav.layers": "隠れ方",
    "nav.cases": "捕まった事例",
    "nav.reach": "捕まらない理由",
    "nav.sources": "出典",
    "nav.about": "このサイトについて",
    "nav.lang": "English",
    "nav.langLabel": "このページを英語で読む",
    "nav.theme": "テーマを切り替える",
    "home.h1a": "なぜハッカーは捕まらないのか。",
    "home.h1b": "見つからないか、見つかっても手が届かない。",
    "home.lede":
      "ネットで正体を隠す手口は、層を重ねてできている。通信経路、まっさらな端末、作り物の名前、洗浄したお金。どの層も、ある観測者から一つのことを隠しているにすぎない。捕まった者はたいてい、そのうちの一枚を失っている。それも本人が気にしていた層とは限らない。あるいは、手の届く場所へ自分から出てきている。このサイトは層を一枚ずつ分解し、二通りの結末を見ていく。",
    "home.outcomesTitle": "三通りの結末",
    "out.none.t": "特定されない",
    "out.none.d": "どの層も持ちこたえたか、そこまで調べる手間をかけられなかった。この結末は事例として記録に残らない。",
    "out.reach.t": "特定されても届かない",
    "out.reach.d": "起訴され、制裁され、懸賞金までかけられても、身柄を引き渡さない国にいる。",
    "out.reach.link": "手が届かない理由",
    "out.caught.t": "捕まる",
    "out.caught.d": "一枚の層が破れたか、手の届く場所へ出てきた。どちらだったかは事例ページにある。",
    "out.caught.link": "事例",
    "out.name": "名前",
    "home.ledgerTitle": "名指しされても、捕まらない",
    "home.ledgerLede":
      "国家のために、あるいは国家の後ろ盾でハッキングした人物を米国が起訴した 10 件 (2014〜2025 年)。マス 1 つが、名指しされた被告 1 人。",
    "home.ledgerMore": "手が届かない理由",
    "home.vantageTitle": "どう隠れるか: 誰に何が見えているか",
    "home.layersTitle": "身を隠す層",
    "home.layersLede": "本人に近い側から外側へ並べた。層ごとに隠すものが違い、破れ方にも癖がある。",
    "home.hides": "隠すもの",
    "home.breaks": "破れ方",
    "home.casesTitle": "捕まるとき",
    "home.casesLede":
      "公的記録のある逮捕・特定の事例を、本人が頼っていた層と、捜査側が最初に突破した層で並べた。破れるのは、たいてい本人が気にしていた層ではない。",
    "home.casesAll": "すべての事例",
    "vantage.route": "経路",
    "vantage.observers": "観測者 (1 者でも、複数選んで手持ちを突き合わせた場合でも)",
    "vantage.record": "選んだ観測者に読めるもの",
    "vantage.combined": "まとめて選択中",
    "vantage.notOnRoute": "この経路にはいない",
    "vantage.legendHidden": "見えない",
    "vantage.legendVisible": "読める",
    "vantage.legendLeak": "本人を指す",
    "vantage.legendWire": "線の本数 = その区間の暗号化の層数",
    "vantage.assume":
      "前提: サイトは HTTPS。各事業者は通過するものを記録するが、暗号は破らない。アドレスはドキュメント用の範囲から取った例。",
    "vantage.person": "本人",
    "layer.hides": "隠すもの",
    "layer.breaks": "破れ方",
    "layer.cases": "この層で破れた事例",
    "layer.noCases": "収録事例のうち、この層が最初に破れたものはない。",
    "layer.sources": "出典",
    "layer.prev": "本人寄りの層",
    "layer.next": "外側の層",
    "cases.title": "事例",
    "cases.lede":
      "1 行が 1 事例。枠だけのマスは本人が頼っていた層、塗りつぶしたマスは捜査側が最初に突破した層。年代順。",
    "cases.used": "頼っていた",
    "cases.failed": "破れた",
    "cases.mechanism": "何が起きたか",
    "cases.outcome": "結末",
    "cases.disputed": "異論あり",
    "cases.sources": "出典",
    "sources.title": "出典",
    "sources.lede":
      "サイト内で引用したすべての出典を、引用したページごとにまとめた。裁判資料や公式発表がある場合はそれを優先している。",
    "about.title": "このサイトについて",
    fig: "図",
    "foot.note":
      "仕組みと破れ方の解説サイト。匿名性がどう成り立ち、どう崩れるかを説明するもので、何かを構築する手順書ではない。",
    "foot.repo": "GitHub のソース",
  },
} as const;

export type Key = keyof (typeof dict)["en"];

export function useT(lang: Lang) {
  return (key: Key): string => dict[lang][key] ?? dict.en[key];
}

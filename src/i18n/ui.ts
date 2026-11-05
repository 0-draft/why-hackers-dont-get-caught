export const LANGS = ["en", "ja"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";

// English lives at the root, Japanese under /ja/.
export function localePath(lang: Lang, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return lang === DEFAULT_LANG ? p : `/${lang}${p === "/" ? "/" : p}`;
}

export function stripLocale(path: string): string {
  return path.replace(/^\/ja(?=\/|$)/, "") || "/";
}

export function langFromPath(path: string): Lang {
  return /^\/ja(\/|$)/.test(path) ? "ja" : "en";
}

export const dict = {
  en: {
    "site.name": "weakest layer",
    "site.desc":
      "How attackers hide who they are, layer by layer, and the single layer that gives each of them away. A visual explainer with sources.",
    "nav.skip": "Skip to content",
    "nav.layers": "Layers",
    "nav.cases": "Cases",
    "nav.sources": "Sources",
    "nav.about": "About",
    "nav.lang": "日本語",
    "nav.langLabel": "Read this page in Japanese",
    "nav.theme": "Switch theme",
    "home.h1a": "Anonymity is a chain.",
    "home.h1b": "It breaks at one link.",
    "home.lede":
      "People who attack networks hide behind several layers at once: a network route, a clean machine, a made-up name, laundered money. Each layer hides one thing from one observer. Investigators do not have to break them all. They look for the one that gave way.",
    "home.vantageTitle": "Who can see what",
    "home.layersTitle": "The layers",
    "home.layersLede":
      "Ordered from the person outward. Each layer hides something different, and each one has a characteristic way of failing.",
    "home.hides": "Hides",
    "home.breaks": "Gives way through",
    "home.casesTitle": "Where it actually broke",
    "home.casesLede":
      "Documented cases, each with the layers the person relied on and the one that failed. Most failures are not in the layer people worry about.",
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
    "site.name": "weakest layer",
    "site.desc": "攻撃者はどうやって正体を隠すのか。レイヤーごとに分解し、実際にどの層で破れたかを出典つきで図解する。",
    "nav.skip": "本文へ移動",
    "nav.layers": "レイヤー",
    "nav.cases": "事例",
    "nav.sources": "出典",
    "nav.about": "このサイトについて",
    "nav.lang": "English",
    "nav.langLabel": "このページを英語で読む",
    "nav.theme": "テーマを切り替える",
    "home.h1a": "匿名性は鎖でできている。",
    "home.h1b": "切れるのは、いつも一番弱い輪だ。",
    "home.lede":
      "ネットワークを攻撃する人間は、いくつもの層を同時に重ねて身を隠す。通信経路、まっさらな端末、作り物の名前、洗浄したお金。どの層も、ある観測者から、ある一つのことを隠しているにすぎない。捜査する側は全部を破る必要はない。破れた一枚を探せばいい。",
    "home.vantageTitle": "誰に何が見えているか",
    "home.layersTitle": "レイヤー",
    "home.layersLede": "本人に近い側から外側へ並べた。層ごとに隠すものが違い、破れ方にも癖がある。",
    "home.hides": "隠すもの",
    "home.breaks": "破れ方",
    "home.casesTitle": "実際にどこで破れたか",
    "home.casesLede":
      "公的記録のある事例を、本人が頼っていた層と、最初に破れた層で並べた。破れるのは、たいてい本人が気にしていた層ではない。",
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

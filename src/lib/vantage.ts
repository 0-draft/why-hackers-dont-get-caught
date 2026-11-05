// The observer model behind the home-page figure.
//
// A person reaches a website through a route of hops. Every hop is run by
// someone who can observe the traffic passing through it. For each observer we
// record what they can read about five things: who sent it (source address),
// where it goes (destination), what it says (content), when and how much
// (timing), and which account is logged in. The verdict answers the only
// question that matters: can the observers, alone or together, tie the person
// to the activity?
//
// Assumptions, stated in the figure's caption: the website uses HTTPS, the VPN
// and every Tor relay are honest-but-curious (they log what they can see but
// do not break crypto), and "real address" means the person's home connection.

export type Lang = "en" | "ja";
export type Text = Record<Lang, string>;

export const SCENARIOS = ["direct", "vpn", "tor", "vpnTor", "torLogin"] as const;
export type Scenario = (typeof SCENARIOS)[number];

export const HOPS = ["wifi", "isp", "vpn", "guard", "middle", "exit", "site"] as const;
export type Hop = (typeof HOPS)[number];
/** `global` is not on the route: it watches every link at once. */
export type Observer = Hop | "global";
export const OBSERVERS: readonly Observer[] = [...HOPS, "global"];

export const FIELDS = ["src", "dst", "content", "timing", "account"] as const;
export type Field = (typeof FIELDS)[number];

/**
 * - `hidden`: the observer cannot read it.
 * - `visible`: readable, but it does not point at the person.
 * - `leak`: readable and it points straight at the person.
 */
export type State = "hidden" | "visible" | "leak";
export interface Cell {
  state: State;
  text: Text;
}
export type Record_ = Record<Field, Cell>;

export const ROUTES: Record<Scenario, readonly Hop[]> = {
  direct: ["wifi", "isp", "site"],
  vpn: ["wifi", "isp", "vpn", "site"],
  tor: ["wifi", "isp", "guard", "middle", "exit", "site"],
  vpnTor: ["wifi", "isp", "vpn", "guard", "middle", "exit", "site"],
  torLogin: ["wifi", "isp", "guard", "middle", "exit", "site"],
};

export const SCENARIO_LABEL: Record<Scenario, Text> = {
  direct: { en: "Direct", ja: "直接" },
  vpn: { en: "VPN", ja: "VPN" },
  tor: { en: "Tor", ja: "Tor" },
  vpnTor: { en: "VPN, then Tor", ja: "VPN → Tor" },
  torLogin: { en: "Tor, logged in", ja: "Tor + 本人ログイン" },
};

export const SCENARIO_NOTE: Record<Scenario, Text> = {
  direct: {
    en: "No anonymity tool. HTTPS hides the page content, nothing else.",
    ja: "匿名化なし。HTTPS が隠すのはページの中身だけ。",
  },
  vpn: {
    en: "One hop. The VPN provider sees both ends, so you are trusting one company not to log.",
    ja: "1 ホップ。VPN 事業者は両端が見えるので、ログを取らないという 1 社の約束を信じることになる。",
  },
  tor: {
    en: "Three relays. No single relay sees both who you are and where you go.",
    ja: "3 つのリレー。誰か (送信元) と行き先の両方を知るリレーは 1 つもない。",
  },
  vpnTor: {
    en: "The ISP sees a VPN instead of Tor; the guard sees the VPN instead of you. The VPN now holds the real address.",
    ja: "ISP には Tor ではなく VPN が見え、ガードには本人ではなく VPN が見える。本当のアドレスは VPN が握る。",
  },
  torLogin: {
    en: "Same Tor route, but the person signs in to an account in their own name. The network layer did its job; the identity layer did not.",
    ja: "経路は同じ Tor。ただし本人名義のアカウントにログインした。ネットワーク層は守れていても、ID 層で破れる。",
  },
};

export const OBSERVER_LABEL: Record<Observer, Text> = {
  wifi: { en: "Local network", ja: "ローカル網" },
  isp: { en: "ISP", ja: "ISP" },
  vpn: { en: "VPN provider", ja: "VPN 事業者" },
  guard: { en: "Tor guard", ja: "Tor ガード" },
  middle: { en: "Tor middle", ja: "Tor 中継" },
  exit: { en: "Tor exit", ja: "Tor 出口" },
  site: { en: "Website", ja: "Web サイト" },
  global: { en: "Global watcher", ja: "全経路の監視者" },
};

export const FIELD_LABEL: Record<Field, Text> = {
  src: { en: "Sender address", ja: "送信元アドレス" },
  dst: { en: "Destination", ja: "宛先" },
  content: { en: "Content", ja: "中身" },
  timing: { en: "Timing and volume", ja: "時刻と量" },
  account: { en: "Account", ja: "アカウント" },
};

// Literals shown in the record. They are illustrative documentation addresses
// (RFC 5737 / RFC 3849 ranges) so nothing on the page names a real host.
const REAL_IP = "198.51.100.23";
const VPN_IP = "203.0.113.80";
const GUARD_IP = "192.0.2.14";
const MIDDLE_IP = "192.0.2.77";
const EXIT_IP = "192.0.2.201";
const SITE = "forum.example";

const t = (en: string, ja: string = en): Text => ({ en, ja });
const hidden = (en = "", ja = ""): Cell => ({ state: "hidden", text: t(en, ja || en) });
const visible = (en: string, ja?: string): Cell => ({ state: "visible", text: t(en, ja ?? en) });
const leak = (en: string, ja?: string): Cell => ({ state: "leak", text: t(en, ja ?? en) });

/** What the hop just before `hop` looks like to `hop`. */
function prevAddress(route: readonly Hop[], hop: Hop): Cell {
  const i = route.indexOf(hop);
  const before = route.slice(0, i).filter((h) => h !== "wifi" && h !== "isp");
  const prev = before.at(-1);
  if (prev === undefined) return leak(REAL_IP, `${REAL_IP}`);
  return visible(addressOf(prev));
}

/** What the hop just after `hop` looks like to `hop`. */
function nextAddress(route: readonly Hop[], hop: Hop): Cell {
  const next = route.slice(route.indexOf(hop) + 1).find((h) => h !== "wifi" && h !== "isp");
  if (next === undefined || next === "site") return visible(SITE);
  if (next === "vpn") return visible(`${VPN_IP} (VPN)`);
  if (next === "guard") return visible(`${GUARD_IP} (Tor)`);
  return visible(addressOf(next));
}

function addressOf(hop: Hop): string {
  switch (hop) {
    case "vpn":
      return VPN_IP;
    case "guard":
      return GUARD_IP;
    case "middle":
      return MIDDLE_IP;
    case "exit":
      return EXIT_IP;
    default:
      return REAL_IP;
  }
}

const NO_ACCOUNT = hidden();
const TLS = hidden("encrypted", "暗号化");

/** The record one observer can read in one scenario, or null if not on the route. */
export function view(scenario: Scenario, observer: Observer): Record_ | null {
  const route = ROUTES[scenario];
  const loggedIn = scenario === "torLogin";

  if (observer === "global") {
    // Watches every link but breaks no encryption. It sees the real address
    // enter the network and, at the far side, the destination, and can match
    // the two by timing even though no single link shows both.
    return {
      src: leak(REAL_IP),
      dst: visible(SITE),
      content: TLS,
      timing: visible("both ends", "入口と出口の両方"),
      account: NO_ACCOUNT,
    };
  }
  if (!route.includes(observer)) return null;

  switch (observer) {
    case "wifi":
    case "isp":
      return {
        src: leak(REAL_IP),
        dst: nextAddress(route, "isp"),
        content: TLS,
        timing: visible("entry side", "入口側"),
        account: NO_ACCOUNT,
      };
    case "vpn":
      return {
        src: leak(REAL_IP),
        dst: nextAddress(route, "vpn"),
        content: TLS,
        timing: visible("both sides of the VPN", "VPN の前後"),
        account: NO_ACCOUNT,
      };
    case "guard":
      return {
        src: prevAddress(route, "guard"),
        dst: visible(`${MIDDLE_IP} (relay)`, `${MIDDLE_IP} (リレー)`),
        content: hidden("3 layers of encryption", "3 重の暗号化"),
        timing: visible("entry side", "入口側"),
        account: NO_ACCOUNT,
      };
    case "middle":
      return {
        src: visible(`${GUARD_IP} (relay)`, `${GUARD_IP} (リレー)`),
        dst: visible(`${EXIT_IP} (relay)`, `${EXIT_IP} (リレー)`),
        content: hidden("2 layers of encryption", "2 重の暗号化"),
        timing: visible("relay only", "中継のみ"),
        account: NO_ACCOUNT,
      };
    case "exit":
      return {
        src: visible(`${MIDDLE_IP} (relay)`, `${MIDDLE_IP} (リレー)`),
        dst: visible(SITE),
        content: TLS,
        timing: visible("exit side", "出口側"),
        account: NO_ACCOUNT,
      };
    case "site": {
      const lastHop = route.at(-2)!;
      const src = lastHop === "isp" ? leak(REAL_IP) : visible(addressOf(lastHop));
      return {
        src,
        dst: visible(SITE),
        content: visible("posts, pages read", "投稿・閲覧したページ"),
        timing: visible("exit side", "出口側"),
        account: loggedIn ? leak("taro.yamada (real name)", "taro.yamada (本名)") : visible("anon_4471"),
      };
    }
  }
}

/**
 * A global watcher sees links, not insides. Its knowledge is the entry link
 * (what the ISP sees) plus the link into the website, kept apart: it can only
 * join them by timing, unless one link already shows both ends.
 */
function globalHalves(scenario: Scenario): (Record_ | null)[] {
  const route = ROUTES[scenario];
  const entry = view(scenario, "isp");
  if (route.at(-2) === "isp") return [entry];
  const intoSite: Record_ = {
    src: visible(addressOf(route.at(-2)!)),
    dst: visible(SITE),
    content: TLS,
    timing: visible("exit side", "出口側"),
    account: NO_ACCOUNT,
  };
  return [entry, intoSite];
}

export type Verdict = "linked" | "correlatable" | "unlinked";

/** Does this record name the person (a leak) or the activity (destination or content)? */
function knows(rec: Record_) {
  const who = FIELDS.some((f) => rec[f].state === "leak");
  const what = rec.content.state !== "hidden" || (rec.dst.state === "visible" && rec.dst.text.en.includes(SITE));
  const timing = rec.timing.state !== "hidden";
  return { who, what, timing };
}

/**
 * The verdict for a set of observers sharing what they saw.
 *
 * - linked: one observer alone sees both who and what.
 * - correlatable: no single observer does, but one sees who, another sees
 *   what, and both see timing, so they can match the flows end to end
 *   (traffic correlation). This is the attack Tor does not claim to stop.
 * - unlinked: otherwise.
 */
export function verdict(scenario: Scenario, observers: readonly Observer[]): Verdict {
  const recs = observers.flatMap((o) => (o === "global" ? globalHalves(scenario) : [view(scenario, o)]));
  const k = recs.filter((r): r is Record_ => r !== null).map(knows);
  if (k.some((x) => x.who && x.what)) return "linked";
  const whoSide = k.some((x) => x.who && x.timing);
  const whatSide = k.some((x) => x.what && x.timing);
  if (whoSide && whatSide) return "correlatable";
  return "unlinked";
}

export const VERDICT_LABEL: Record<Verdict, Text> = {
  linked: { en: "Identified", ja: "特定される" },
  correlatable: { en: "Linkable by timing", ja: "タイミングで突き合わせ可能" },
  unlinked: { en: "Not linkable", ja: "結びつかない" },
};

export const VERDICT_NOTE: Record<Verdict, Text> = {
  linked: {
    en: "At least one of the selected observers sees both who the person is and what they did.",
    ja: "選んだ観測者のうち少なくとも 1 者が、本人が誰かと何をしたかの両方を見ている。",
  },
  correlatable: {
    en: "No one sees both, but together they hold the sender at one end and the destination at the other. Matching packet timing and volume joins the two.",
    ja: "両方を見る者はいない。だが片方は入口で送信元を、もう片方は出口で宛先を握っている。通信の時刻と量を突き合わせれば一本につながる。",
  },
  unlinked: {
    en: "Nothing the selected observers hold connects the sender to the destination.",
    ja: "選んだ観測者の手持ちを合わせても、送信元と宛先は結びつかない。",
  },
};

/**
 * How many layers of encryption wrap the traffic on the link that leaves
 * `from` on this route. HTTPS is always one. A VPN adds one until the VPN
 * server. Tor wraps three layers before the guard and each relay removes one.
 */
export function layersOn(scenario: Scenario, from: Hop | "person"): number {
  const route: readonly (Hop | "person")[] = ["person", ...ROUTES[scenario]];
  const i = route.indexOf(from);
  if (i < 0 || i >= route.length - 1) return 0;
  const after = (h: Hop) => {
    const j = route.indexOf(h);
    return j >= 0 && i >= j;
  };
  let n = 1; // HTTPS
  if (route.includes("vpn") && !after("vpn")) n += 1;
  if (route.includes("guard")) {
    if (!after("guard")) n += 3;
    else if (!after("middle")) n += 2;
    else if (!after("exit")) n += 1;
  }
  return n;
}

export interface VantageState {
  scenario: Scenario;
  observers: Observer[];
}

export const DEFAULT_STATE: VantageState = { scenario: "tor", observers: ["guard"] };

/** `#v=tor:guard,exit` <-> state. Unknown parts are dropped, not guessed. */
export function parseState(hash: string): VantageState | null {
  const m = /(?:^|[#&])v=([A-Za-z]+)(?::([a-z,]*))?/.exec(hash);
  if (!m) return null;
  const scenario = SCENARIOS.find((s) => s === m[1]);
  if (!scenario) return null;
  const observers = (m[2] ?? "")
    .split(",")
    .filter((o): o is Observer => (OBSERVERS as readonly string[]).includes(o))
    .filter((o) => o === "global" || ROUTES[scenario].includes(o as Hop));
  return { scenario, observers: [...new Set(observers)] };
}

export function formatState(s: VantageState): string {
  return `v=${s.scenario}:${s.observers.join(",")}`;
}

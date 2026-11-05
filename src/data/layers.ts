import type { Lang } from "../i18n/ui.ts";

type Text = Record<Lang, string>;

export const LAYER_SLUGS = [
  "behavior",
  "identity",
  "device",
  "network",
  "infrastructure",
  "money",
  "attribution",
] as const;
export type LayerSlug = (typeof LAYER_SLUGS)[number];

/** Case files may also fail on people: informants, undercover officers, seized servers. */
export const FAILURE_KINDS = [...LAYER_SLUGS, "people"] as const;
export type FailureKind = (typeof FAILURE_KINDS)[number];

export interface LayerMeta {
  name: Text;
  /** What this layer hides, in one line. */
  hides: Text;
  /** The typical way it gives way, in one line. */
  breaks: Text;
}

// Strata run from the person outward: habits sit closest to the human, the
// analyst's attribution work sits furthest away.
export const LAYERS: Record<FailureKind, LayerMeta> = {
  behavior: {
    name: { en: "Behavior", ja: "行動" },
    hides: { en: "Habits, hours, language, the way someone talks", ja: "習慣・活動時間・言語・話し方" },
    breaks: { en: "One careless sentence or an activity clock", ja: "うっかりの一言、活動時間の偏り" },
  },
  identity: {
    name: { en: "Identity", ja: "ID・ペルソナ" },
    hides: {
      en: "Which handles, emails and accounts belong to one person",
      ja: "どのハンドル・メール・アカウントが同一人物か",
    },
    breaks: {
      en: "A reused handle, email, phone number or writing style",
      ja: "ハンドル・メール・電話番号・文体の使い回し",
    },
  },
  device: {
    name: { en: "Device", ja: "端末" },
    hides: { en: "The machine, its settings and the files it produces", ja: "端末そのもの、設定、生み出すファイル" },
    breaks: {
      en: "A fingerprint, metadata, or an exploit that phones home",
      ja: "フィンガープリント、メタデータ、本当の IP を送り返すエクスプロイト",
    },
  },
  network: {
    name: { en: "Network", ja: "ネットワーク" },
    hides: { en: "The real IP address and who talks to whom", ja: "本当の IP アドレスと、誰が誰と通信しているか" },
    breaks: {
      en: "One connection without the tunnel, or timing correlation",
      ja: "トンネルなしの 1 回の接続、タイミング相関",
    },
  },
  infrastructure: {
    name: { en: "Infrastructure", ja: "インフラ" },
    hides: {
      en: "Servers, domains and command channels and who pays for them",
      ja: "サーバ・ドメイン・C2 と、その契約者",
    },
    breaks: {
      en: "Seized servers, registration records, reuse across operations",
      ja: "押収されたサーバ、登録情報、作戦間の使い回し",
    },
  },
  money: {
    name: { en: "Money", ja: "お金" },
    hides: { en: "Where payments come from and where profits go", ja: "支払いの出どころと、利益の行き先" },
    breaks: {
      en: "A public ledger meeting an exchange that knows the customer",
      ja: "公開台帳と、本人確認済みの取引所が出会う点",
    },
  },
  attribution: {
    name: { en: "Attribution", ja: "帰属・偽旗" },
    hides: { en: "Which group or state is behind an operation", ja: "どの集団・国家が背後にいるか" },
    breaks: { en: "Overlap in code, tools, infrastructure and mistakes", ja: "コード・ツール・インフラ・ミスの重なり" },
  },
  people: {
    name: { en: "People", ja: "人" },
    hides: { en: "Partners, buyers and staff who know the truth", ja: "真実を知る仲間・客・スタッフ" },
    breaks: {
      en: "An informant, an undercover officer, a partner who cooperates",
      ja: "情報提供者、潜入捜査官、協力に転じた仲間",
    },
  },
};

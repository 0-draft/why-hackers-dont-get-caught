# weakest-layer

[English](README.md)

攻撃者はどうやって正体を隠すのか。層ごとに分解し、それぞれの事例で実際にどの層が破れたかを図解する。英語と日本語のバイリンガルで、すべての主張に出典を付けている。

## 中身

- **誰に何が見えるか**: トップページのインタラクティブな図。経路 (直接、VPN、Tor、VPN → Tor、Tor + 本人ログイン) と観測者 (ローカル網、ISP、VPN 事業者、Tor リレー、Web サイト、全経路の監視者) を選ぶと、各観測者に読める情報が表示され、単独で、あるいはタイミングの突き合わせで本人と行為を結びつけられるかが判定される。中身は `src/lib/vantage.ts` のテスト付きの小さなモデル。
- **7 つのレイヤー**: 行動、ID・ペルソナ、端末、ネットワーク、インフラ、お金、帰属・偽旗。各章で、その層が隠すもの、仕組み、破れ方、よくある誤解を図とともに説明する。
- **事例**: 公的記録のある事例を、本人が頼っていた層と、捜査側が最初に突破した層のマトリクスで示す。経緯に争いがあるものはそう明記している。

扱うのは仕組みと破れ方だけで、構築手順や運用上の助言は載せない。

## デザイン

視覚言語は「黒塗りされた記録」。意味を持つ記号は 3 つだけで、黒いバーはその観測者から見えないもの、マーカーは見えるもの、マゼンタは本人を指すもの。詳しくは [research/design.md](research/design.md)。

## 開発

Node 24 と pnpm 12 が必要。

```sh
pnpm install
pnpm dev            # http://localhost:4321
pnpm build          # dist/ に静的サイトを出力
```

| コマンド | 検査内容 |
| --- | --- |
| `pnpm lint` | Biome (整形 + lint) |
| `pnpm lint:md` | markdownlint |
| `pnpm check` | `astro check` (TypeScript) |
| `pnpm test` | Vitest: 観測者モデル、i18n、MDX の対訳検査ヘルパー |
| `pnpm validate:data` | 出典参照がすべて解決すること、出典がすべて引用されていること、英日の章で節・図・出典が揃っていること、英語に日本語が残っていないこと |
| `pnpm check:size` | `dist/` のページ容量の予算 |
| `pnpm test:e2e` | デスクトップとモバイルの Playwright: 全ページの表示、axe (WCAG 2.1 AA)、横スクロールなし、図の挙動、言語切り替え |

## 構成

| パス | 内容 |
| --- | --- |
| `src/content/layers/{en,ja}/*.mdx` | 7 つの章 |
| `src/data/sources/*.json` | 出典 (ページごとに 1 ファイル) |
| `src/data/cases.json` | 事例 |
| `src/components/fig/` | 章の図 (インライン SVG) |
| `src/lib/vantage.ts` | トップページの図を動かす観測者モデル |
| `research/` | 章の元になった調査メモ |

## CI

`ci.yml` は Biome、markdownlint、astro check、カバレッジ付き Vitest、データ検証、`pnpm audit`、容量予算付きビルド、Playwright + axe、オフラインの内部リンク検査、ワークフローへの actionlint + zizmor を実行する。`codeql.yml` は JavaScript/TypeScript とワークフローを解析する。`claude-review.yml` は CI では拾えないもの (出典と主張の一致、扱う範囲、英日の意味のずれ、図) を PR ごとにレビューする。`CLAUDE_CODE_OAUTH_TOKEN` シークレットが必要。`sources.yml` は毎週すべての出典 URL を確認し、リンク切れを 1 つの issue にまとめる。Dependabot が npm パッケージとアクションを毎週更新する。

`CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ACCOUNT_ID` が設定されていれば、`main` から Cloudflare Pages にデプロイする。未設定ならデプロイはスキップされる。

## 訂正

該当ページと、反証する出典を添えて issue を立ててほしい。

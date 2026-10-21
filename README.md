# PUBLIC下線合同会社 コーポレートサイト

[PUBLIC下線合同会社](https://satellitex.github.io/homepage/) の公式サイトです。ITコンサルティング・ブロックチェーン開発の事業内容、実績、会社概要、お問い合わせ窓口を掲載しています。

- 公開URL: https://satellitex.github.io/homepage/

## 技術スタック

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript — `output: "export"` による静的サイト
- [Tailwind CSS 3](https://tailwindcss.com/) — 社名「下線」を暗闇を走る「一本の光の線」として表現するダークテーマのデザインシステム（[app/globals.css](app/globals.css)）
- [Motion](https://motion.dev/)（`motion/react`）— スクロール連動・ヘッダーなどのアニメーション
- [Lenis](https://lenis.darkroom.engineering/) — 慣性スムーススクロール（[components/fx/smooth-scroll.tsx](components/fx/smooth-scroll.tsx)）
- WebGL — ヒーローの光の地平線（[components/fx/hero-canvas.tsx](components/fx/hero-canvas.tsx)）
- [lucide-react](https://lucide.dev/) アイコン
- お問い合わせフォームは [FormSubmit](https://formsubmit.co/) 経由でメール送信（サーバ不要）

## 開発

Node.js は [.nvmrc](.nvmrc) の `22.23.4`、pnpm は `package.json` の `10.12.1` を使用します。Node.js 22.23.4 は eMudhra の侵害中間 CA 鍵を拒否する修正版です（[公式リリース](https://github.com/nodejs/node/releases/tag/v22.23.4)）。

```bash
nvm install
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev        # http://localhost:3000
```

`engines.node` と `.npmrc` で未対応の Node による依存導入を拒否し、開発・ビルド・プレビューの開始時にも実バージョンを確認します。22 系列の後続修正版は許可しますが、ローカルと GitHub Actions の既定値は `.nvmrc` に固定します。

### アニメーションと配慮

- 演出はすべて `prefers-reduced-motion: reduce`（OS の「視差効果を減らす」など）で止まり、最終状態で表示されます。
- アニメーション前の非表示状態は `html.js` 配下だけで効くため、JavaScript が無効でも本文はすべて読めます。
- 初回訪問時のイントロ演出は、同じセッション内では再生されません（`sessionStorage` の `intro-seen`）。

## ビルドとプレビュー

```bash
corepack pnpm build      # 静的ファイルを out/ に生成
corepack pnpm preview    # http://localhost:3000/homepage/ で out/ を配信
```

`pnpm preview` は GitHub Pages と同じ `/homepage` ベースパスを再現する確認用サーバ（[scripts/preview-server.js](scripts/preview-server.js)）を起動します。

### basePath について

GitHub Pages のプロジェクトページ配下（`/homepage`）で公開するため、本番ビルドでは `basePath` / `assetPrefix` に `/homepage` が付きます（[next.config.mjs](next.config.mjs)）。開発時（`pnpm dev`）は付きません。ベースパスを変更する場合は [lib/site.ts](lib/site.ts) の `basePath` と `siteUrl` も合わせて更新してください。

## ディレクトリ構成

```
app/            ページ (App Router)。トップ・お問い合わせ・プライバシーポリシー・利用規約など
components/     共有コンポーネント (ヘッダー・フッター・お問い合わせフォームなど)
components/home/ トップページの各セクション (ヒーロー・事業内容・実績など)
components/fx/  演出の部品 (文字分割・スポットライト・スムーススクロール・WebGL など)
lib/site.ts     会社情報・サイトURL (会社情報の変更はここ)
lib/content.ts  掲載コンテンツ (事業内容・実績・FAQ などの文言はここ)
lib/structured-data.ts  SEO 用の JSON-LD 定義
public/         静的アセット (OG画像・アイコン・llms.txt)
scripts/        プレビュー用サーバ
```

## デプロイ

`main` ブランチへ push すると GitHub Actions（[.github/workflows/pages.yaml](.github/workflows/pages.yaml)）がビルドし、GitHub Pages へ自動デプロイします。

Pull Request では同じ Node 固定とビルド検証だけを実行します。静的配信先のサーバ証明書を入れ替える対応は不要です。Node の CA 修正は、依存導入や `next/font/google` の取得を含むビルド中の HTTPS 通信に関係します。ブラウザからの FormSubmit 通信はブラウザ・OS 側の信頼ストアに従います。

### Vercel でビルドする場合

このリポジトリの公開先は GitHub Pages です。Vercel で利用する場合、`engines.node: ^22.23.4` で 22 系列を選びますが、Vercel の minor / patch 更新はサービス側で管理されます（[公式仕様](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)）。Install Command は `pnpm install --frozen-lockfile`、Build Command は `pnpm build` を使用し、Build Logs の `Node.js 22.23.4: eMudhra minimum version check passed.` または後続の 22 系列の出力を確認してください。未修正版の環境ではチェックが失敗します。

公開 URL の正常応答だけでは、ビルドに用いた Node の修正状態は確認できません。Vercel のビルドログへアクセスできない場合は、実行バージョンの確認が別途必要です。

## SEO / LLMO

- メタデータ・OGP: [app/layout.tsx](app/layout.tsx) と各ページの `metadata`
- 構造化データ (JSON-LD): [lib/structured-data.ts](lib/structured-data.ts)
- サイトマップ / robots: [app/sitemap.ts](app/sitemap.ts) / [app/robots.ts](app/robots.ts)
- LLM 向けサイト概要: [public/llms.txt](public/llms.txt)

コンテンツを更新した際は `llms.txt` と `sitemap.ts` の `lastModified` も忘れずに更新してください。

## Skill restore for new environments

If `skills-lock.json` exists, restore the same skills from the project root:

```bash
npx -y skills experimental_install
```

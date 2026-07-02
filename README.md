# PUBLIC下線合同会社 コーポレートサイト

[PUBLIC下線合同会社](https://satellitex.github.io/homepage/) の公式サイトです。ITコンサルティング・ブロックチェーン開発の事業内容、実績、会社概要、お問い合わせ窓口を掲載しています。

- 公開URL: https://satellitex.github.io/homepage/

## 技術スタック

- [Next.js 15](https://nextjs.org/) (App Router) + React 19 + TypeScript — `output: "export"` による静的サイト
- [Tailwind CSS 3](https://tailwindcss.com/) — 社名「下線」に由来する下線モチーフのデザインシステム（[app/globals.css](app/globals.css)）
- [shadcn/ui](https://ui.shadcn.com/) ベースの Button コンポーネント（[components/ui/button.tsx](components/ui/button.tsx)）
- [lucide-react](https://lucide.dev/) アイコン
- お問い合わせフォームは [FormSubmit](https://formsubmit.co/) 経由でメール送信（サーバ不要）

## 開発

```bash
pnpm install
pnpm dev        # http://localhost:3000
```

## ビルドとプレビュー

```bash
pnpm build      # 静的ファイルを out/ に生成
pnpm preview    # http://localhost:3000/homepage/ で out/ を配信
```

`pnpm preview` は GitHub Pages と同じ `/homepage` ベースパスを再現する確認用サーバ（[scripts/preview-server.js](scripts/preview-server.js)）を起動します。

### basePath について

GitHub Pages のプロジェクトページ配下（`/homepage`）で公開するため、本番ビルドでは `basePath` / `assetPrefix` に `/homepage` が付きます（[next.config.mjs](next.config.mjs)）。開発時（`pnpm dev`）は付きません。ベースパスを変更する場合は [lib/site.ts](lib/site.ts) の `basePath` と `siteUrl` も合わせて更新してください。

## ディレクトリ構成

```
app/            ページ (App Router)。トップ・お問い合わせ・プライバシーポリシー・利用規約など
components/     共有コンポーネント (ヘッダー・フッター・お問い合わせフォームなど)
components/ui/  shadcn/ui ベースの UI プリミティブ
lib/site.ts     会社情報・サイトURL (会社情報の変更はここ)
lib/content.ts  掲載コンテンツ (事業内容・実績・FAQ などの文言はここ)
lib/structured-data.ts  SEO 用の JSON-LD 定義
public/         静的アセット (OG画像・アイコン・llms.txt)
scripts/        プレビュー用サーバ
```

## デプロイ

`main` ブランチへ push すると GitHub Actions（[.github/workflows/pages.yaml](.github/workflows/pages.yaml)）がビルドし、GitHub Pages へ自動デプロイします。

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

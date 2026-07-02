// GitHub Pages (https://satellitex.github.io/homepage/) 向けの静的エクスポート設定。
// basePath を変える場合は lib/site.ts の basePath / siteUrl も合わせて更新する
const basePath = process.env.NODE_ENV === "production" ? "/homepage" : ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath,
  images: {
    // 静的エクスポートでは Next.js の画像最適化サーバが使えない
    unoptimized: true,
  },
}

export default nextConfig

export const siteUrl = "https://satellitex.github.io/homepage"

// next.config.mjs の basePath と揃える(静的アセットの直接参照用)
export const basePath = process.env.NODE_ENV === "production" ? "/homepage" : ""

export const company = {
  name: "PUBLIC下線合同会社",
  email: "public.company.sate@gmail.com",
  postalCode: "105-0013",
  address: "東京都港区浜松町二丁目2番15号 浜松町ダイヤビル2F",
  founded: "2021-01-18",
  foundedLabel: "2021年1月18日（令和3年）",
  representative: "山下 琢巳",
  description:
    "PUBLIC下線合同会社は、ITコンサルティングとブロックチェーン開発を軸に、戦略立案からシステム設計・開発・運用までを一気通貫で支援する東京都港区のテクノロジーファームです。",
} as const

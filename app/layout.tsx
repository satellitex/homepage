import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google"
import { JsonLd } from "@/components/json-ld"
import { CursorGlow } from "@/components/fx/cursor-glow"
import { LoopGate } from "@/components/fx/loop-gate"
import { ScrollProgress } from "@/components/fx/scroll-progress"
import { SmoothScroll } from "@/components/fx/smooth-scroll"
import { basePath, company, siteUrl } from "@/lib/site"
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data"
import "./globals.css"

// 欧文は Geist、和文は Noto Sans JP、ラベルは Geist Mono
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

// 可変フォントにして、太さごとに @font-face が増えないようにする(和文フォントは分割ファイルが多いため)
const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-jp",
  display: "swap",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

// 描画前に実行: JS 有効の印(アニメーション前の非表示状態は .js 配下だけで効かせる)と、
// 同じセッションで再訪したときにイントロ演出を省く印を付ける
const bootScript = `(function(){var d=document.documentElement;d.classList.add("js");try{if(sessionStorage.getItem("intro-seen"))d.classList.add("intro-seen")}catch(e){}})()`

export const viewport: Viewport = {
  themeColor: "#05070c",
  colorScheme: "dark",
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PUBLIC下線合同会社 | ITコンサルティング・ブロックチェーン開発",
    template: "%s | PUBLIC下線合同会社",
  },
  description:
    "PUBLIC下線合同会社は、ITコンサルティング・ブロックチェーン開発・Forward Deployed Engineeringを軸に、戦略立案からシステム設計・開発・運用まで一気通貫で支援します。東京都港区。代表は未踏スーパークリエータ認定・元ブロックチェーン企業CTO。",
  keywords: [
    "ITコンサルティング",
    "ブロックチェーン開発",
    "Web3開発",
    "スマートコントラクト開発",
    "Forward Deployed Engineering",
    "システム設計",
    "決済システム開発",
    "PUBLIC下線合同会社",
    "山下琢巳",
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  publisher: company.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PUBLIC下線合同会社 | ITコンサルティング・ブロックチェーン開発",
    description:
      "戦略立案からシステム設計・開発・運用まで、事業を貫く一本の線。ITコンサルティングとブロックチェーン開発の専門ファーム。",
    url: "/",
    type: "website",
    locale: "ja_JP",
    siteName: company.name,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PUBLIC下線合同会社 — ITコンサルティング・ブロックチェーン開発",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PUBLIC下線合同会社 | ITコンサルティング・ブロックチェーン開発",
    description:
      "戦略立案からシステム設計・開発・運用まで、事業を貫く一本の線。",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: `${basePath}/icon.svg`,
    apple: `${basePath}/apple-touch-icon.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${geist.variable} ${notoSansJp.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="font-sans antialiased">
        <SmoothScroll />
        <ScrollProgress />
        <CursorGlow />
        {children}
        <LoopGate />
        <div className="grain" aria-hidden="true" />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </body>
    </html>
  )
}

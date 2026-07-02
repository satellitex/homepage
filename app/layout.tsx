import type { Metadata } from "next"
import { Noto_Sans_JP, Shippori_Mincho, IBM_Plex_Mono } from "next/font/google"
import { basePath, company, siteUrl } from "@/lib/site"
import "./globals.css"

const shippori = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

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

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: company.name,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/og-image.png`,
  description: company.description,
  foundingDate: company.founded,
  email: company.email,
  sameAs: [company.xUrl],
  address: {
    "@type": "PostalAddress",
    postalCode: company.postalCode,
    addressRegion: "東京都",
    addressLocality: "港区",
    streetAddress: "浜松町二丁目2番15号 浜松町ダイヤビル2F",
    addressCountry: "JP",
  },
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}/#representative`,
    name: company.representative,
  },
  knowsAbout: [
    "ITコンサルティング",
    "ブロックチェーン開発",
    "スマートコントラクト",
    "Web3",
    "決済システム",
    "Forward Deployed Engineering",
  ],
}

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: company.name,
  url: `${siteUrl}/`,
  inLanguage: "ja",
  publisher: { "@id": `${siteUrl}/#organization` },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body
        className={`${shippori.variable} ${notoSansJp.variable} ${plexMono.variable} font-body antialiased`}
      >
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}.reveal-underline::after{transform:scaleX(1)}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}

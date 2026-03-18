import type { Metadata } from "next"
import { Manrope, Syne } from "next/font/google"
import "./globals.css"

const syne = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
})

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
})

export const metadata: Metadata = {
  title: "ITコンサルティング・ブロックチェーン開発 | PUBLIC下線合同会社",
  description:
    "PUBLIC下線合同会社は、ITコンサルティングとブロックチェーン開発を軸に、戦略設計から実装・運用まで一気通貫で支援します。",
  keywords: [
    "ITコンサルティング",
    "ブロックチェーン開発",
    "Web3開発",
    "システム設計",
    "PUBLIC下線合同会社",
  ],
  alternates: {
    canonical: "/it-consulting-blockchain-development",
  },
  openGraph: {
    title: "ITコンサルティング・ブロックチェーン開発 | PUBLIC下線合同会社",
    description:
      "戦略設計からシステム実装まで、事業成果に直結する技術支援を提供。",
    type: "website",
    locale: "ja_JP",
    siteName: "PUBLIC下線合同会社",
  },
  icons: {
    icon: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${syne.variable} ${manrope.variable} font-body antialiased`}>{children}</body>
    </html>
  )
}

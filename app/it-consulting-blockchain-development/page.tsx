import type { Metadata } from "next"
import HomePage from "../page"

// トップページと同一内容のキーワードLPのため、正規URLはトップに向ける
export const metadata: Metadata = {
  title: "ITコンサルティング・ブロックチェーン開発",
  description:
    "ITコンサルティング・ブロックチェーン開発なら PUBLIC下線合同会社。戦略立案からスマートコントラクト実装・運用まで一気通貫で支援します。",
  alternates: {
    canonical: "/",
  },
}

export default function KeywordLandingPage() {
  return <HomePage />
}

import type { Metadata } from "next"
import Link from "next/link"
import { company } from "@/lib/site"

export const metadata: Metadata = {
  title: "利用規約",
  description: "PUBLIC下線合同会社が提供する各種支援サービスの契約条件・責任範囲・成果物の取扱いに関する一般的な案内です。",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-baseline gap-2" aria-label="PUBLIC下線合同会社 トップページ">
            <span className="font-display text-xl font-semibold tracking-tight">
              PUBLIC<span className="name-underline">下線</span>
            </span>
            <span className="text-xs text-muted-foreground">合同会社</span>
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.35em] text-[#0057d9]">TERMS OF SERVICE</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          <span className="reveal-underline is-revealed">利用規約</span>
        </h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            {company.name}が提供する各種支援サービスの契約条件、責任範囲、成果物の取扱いは、
            個別契約書または発注書に定めるものとします。本ページは一般的な案内であり、最終条件は個別契約を優先します。
          </p>
          <p>
            サービス内容や契約条件に関する詳細は、
            <a href={`mailto:${company.email}`} className="nav-underline font-medium text-[#0057d9]">
              {company.email}
            </a>
            までお問い合わせください。
          </p>
        </div>
        <Link href="/" className="nav-underline mt-12 inline-block text-sm font-medium text-[#0057d9]">
          ← トップページへ戻る
        </Link>
      </main>

      <footer className="border-t border-border bg-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

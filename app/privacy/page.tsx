import type { Metadata } from "next"
import Link from "next/link"
import { company } from "@/lib/site"

const pageTitle = "プライバシーポリシー | PUBLIC下線合同会社"
const pageDescription =
  "PUBLIC下線合同会社のプライバシーポリシー。お問い合わせ時に取得した個人情報の利用目的と取扱いについて説明します。"

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: pageDescription,
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/privacy",
    type: "website",
    locale: "ja_JP",
    siteName: company.name,
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
}

export default function PrivacyPage() {
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
        <p className="font-mono text-xs tracking-[0.35em] text-[#0057d9]">PRIVACY POLICY</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          <span className="reveal-underline is-revealed">プライバシーポリシー</span>
        </h1>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>
            {company.name}は、お問い合わせ時に取得した氏名・連絡先・ご相談内容を、
            業務連絡および支援提案の目的で利用します。法令に基づく場合を除き、本人の同意なく第三者へ提供しません。
          </p>
          <p>
            個人情報の開示・訂正・削除のご相談は、
            <a href={`mailto:${company.email}`} className="nav-underline font-medium text-[#0057d9]">
              {company.email}
            </a>
            までご連絡ください。
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

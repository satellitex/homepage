import type { Metadata } from "next"
import Link from "next/link"
import { ContactForm } from "@/components/contact-form"
import { company } from "@/lib/site"

const pageTitle = "お問い合わせ | PUBLIC下線合同会社"
const pageDescription =
  "PUBLIC下線合同会社へのお問い合わせ窓口。ITコンサルティング・ブロックチェーン開発のご相談、お見積もり、技術顧問のご依頼はこちらから。メールまたはX（@public_sate）のDMで受け付けています。"

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/contact",
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
    title: pageTitle,
    description: pageDescription,
    images: ["/og-image.png"],
  },
}

export default function ContactPage() {
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

      <main className="container mx-auto max-w-5xl px-4 py-16">
        <p className="font-mono text-xs tracking-[0.35em] text-[#0057d9]">CONTACT</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          <span className="reveal-underline is-revealed">お問い合わせ</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          ITプロジェクトのご相談、お見積もり、技術顧問のご依頼など、お気軽にお問い合わせください。
        </p>
        <div className="mt-12">
          <ContactForm />
        </div>
        <Link href="/" className="nav-underline mt-16 inline-block text-sm font-medium text-[#0057d9]">
          ← トップページへ戻る
        </Link>
      </main>

      <footer className="border-t border-border bg-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

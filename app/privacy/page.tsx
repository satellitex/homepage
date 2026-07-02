import type { Metadata } from "next"
import { SubpageShell } from "@/components/subpage-shell"
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
    <SubpageShell label="PRIVACY POLICY" title="プライバシーポリシー">
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          {company.name}は、お問い合わせ時に取得した氏名・連絡先・ご相談内容を、
          業務連絡および支援提案の目的で利用します。法令に基づく場合を除き、本人の同意なく第三者へ提供しません。
        </p>
        <p>
          お問い合わせフォームの送信には外部サービス（FormSubmit）を利用しており、
          入力内容は同サービスを経由して当社宛のメールとして届きます。
        </p>
        <p>
          個人情報の開示・訂正・削除のご相談は、
          <a href={`mailto:${company.email}`} className="nav-underline font-medium text-line-blue">
            {company.email}
          </a>
          までご連絡ください。
        </p>
      </div>
    </SubpageShell>
  )
}

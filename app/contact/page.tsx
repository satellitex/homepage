import type { Metadata } from "next"
import { ContactForm } from "@/components/contact-form"
import { SubpageShell } from "@/components/subpage-shell"
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
    <SubpageShell label="CONTACT" title="お問い合わせ" className="max-w-5xl">
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        ITプロジェクトのご相談、お見積もり、技術顧問のご依頼など、お気軽にお問い合わせください。
      </p>
      <div className="mt-12">
        <ContactForm />
      </div>
    </SubpageShell>
  )
}

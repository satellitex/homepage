import type { Metadata } from "next"
import { SubpageShell } from "@/components/subpage-shell"
import { company } from "@/lib/site"

const pageTitle = "利用規約 | PUBLIC下線合同会社"
const pageDescription =
  "PUBLIC下線合同会社が提供する各種支援サービスの契約条件・責任範囲・成果物の取扱いに関する一般的な案内です。"

export const metadata: Metadata = {
  title: "利用規約",
  description: pageDescription,
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/terms",
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

export default function TermsPage() {
  return (
    <SubpageShell label="TERMS OF SERVICE" title="利用規約">
      <div className="mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
        <p>
          {company.name}が提供する各種支援サービスの契約条件、責任範囲、成果物の取扱いは、
          個別契約書または発注書に定めるものとします。本ページは一般的な案内であり、最終条件は個別契約を優先します。
        </p>
        <p>
          サービス内容や契約条件に関する詳細は、
          <a href={`mailto:${company.email}`} className="nav-underline font-medium text-line-blue">
            {company.email}
          </a>
          までお問い合わせください。
        </p>
      </div>
    </SubpageShell>
  )
}

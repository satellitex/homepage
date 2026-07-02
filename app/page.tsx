import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JsonLd } from "@/components/json-ld"
import { Reveal } from "@/components/reveal"
import { SiteLogo } from "@/components/site-header"
import {
  businessFields,
  faqs,
  heroStats,
  navItems,
  services,
  strengths,
  techSkills,
  works,
} from "@/lib/content"
import { company } from "@/lib/site"
import { faqJsonLd, personJsonLd, servicesJsonLd } from "@/lib/structured-data"
import { ArrowRight, ArrowUpRight, Mail, MapPin, Plus } from "lucide-react"

function SectionHeading({ no, en, title }: { no: string; en: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs tracking-[0.35em] text-line-blue">
        {no} <span aria-hidden="true">─</span> {en}
      </p>
      <h2 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        <span className="reveal-underline">{title}</span>
      </h2>
    </Reveal>
  )
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm"
      >
        本文へスキップ
      </a>

      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <SiteLogo />

          <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-underline text-foreground/80 hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild className="rounded-none bg-ink px-5 text-sm font-medium text-white hover:bg-ink-soft">
            <Link href="/contact">お問い合わせ</Link>
          </Button>
        </div>
      </header>

      <main id="main">
        {/* ヒーロー */}
        <section className="relative">
          <div className="ruled-paper pointer-events-none absolute inset-0" aria-hidden="true" />
          <p
            className="vertical-label pointer-events-none absolute right-8 top-28 hidden font-display text-sm text-foreground/30 xl:block"
            aria-hidden="true"
          >
            構想から実装まで、一気通貫。
          </p>
          <div className="container relative mx-auto px-4 pb-20 pt-24 sm:pb-28 sm:pt-32">
            <p className="animate-rise font-mono text-xs tracking-[0.35em] text-line-blue">
              IT CONSULTING &amp; BLOCKCHAIN DEVELOPMENT
            </p>
            <h1 className="animate-rise mt-8 font-display text-4xl font-semibold leading-[1.35] sm:text-6xl lg:text-7xl">
              事業を貫く、
              <br />
              <span className="draw-underline">一本の線</span>を引く。
            </h1>
            <p className="animate-rise mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg [animation-delay:150ms]">
              PUBLIC下線合同会社は、ITコンサルティングとブロックチェーン開発の専門ファームです。
              構想から設計・実装・運用まで、戦略と技術をひと続きの線で結び、
              大企業からスタートアップまでの事業を支援します。
            </p>
            <div className="animate-rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:250ms]">
              <Button
                asChild
                size="lg"
                className="group rounded-none bg-ink px-8 text-base font-medium text-white hover:bg-ink-soft"
              >
                <Link href="/contact">
                  プロジェクトの相談をする
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <a href="#services" className="nav-underline text-sm font-medium text-foreground/80">
                事業内容を見る
              </a>
            </div>

            <dl className="animate-rise mt-20 grid grid-cols-2 gap-px border border-border bg-border lg:grid-cols-4 [animation-delay:350ms]">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col bg-white p-6">
                  <dt className="order-last mt-2 text-xs leading-relaxed text-muted-foreground">{stat.label}</dt>
                  <dd className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 事業内容 */}
        <section id="services" className="border-t border-border bg-white">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="01" en="SERVICES" title="事業内容" />
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {services.map((service) => (
                <Reveal key={service.no} as="article" className="card-underline bg-white p-8 sm:p-10">
                  <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                    {service.no} <span aria-hidden="true">─</span> {service.en}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">{service.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{service.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 選ばれる理由 */}
        <section id="strengths" className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="02" en="WHY US" title="選ばれる理由" />
            <div className="grid gap-12 lg:grid-cols-3">
              {strengths.map((strength, index) => (
                <Reveal key={strength.title}>
                  <div className="brand-line h-[3px] w-12" aria-hidden="true" />
                  <p className="mt-5 font-mono text-xs tracking-[0.3em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold">{strength.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{strength.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 実績 */}
        <section id="works" className="border-t border-border bg-white">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="03" en="TRACK RECORD" title="実績" />
            <ol className="max-w-4xl">
              {works.map((work) => (
                <Reveal key={work.title} as="li" className="group border-b border-border py-8 first:border-t">
                  <div className="grid gap-3 sm:grid-cols-[10rem_1fr] sm:gap-8">
                    <p className="font-mono text-sm text-muted-foreground">{work.period}</p>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="font-display text-lg font-semibold sm:text-xl">{work.title}</h3>
                        <span className="border border-border px-2 py-0.5 text-xs text-muted-foreground">
                          {work.role}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">{work.detail}</p>
                      {work.link ? (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="nav-underline mt-3 inline-flex items-center gap-1 text-sm font-medium text-line-blue"
                        >
                          {work.linkLabel}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
            <p className="mt-8 max-w-4xl text-sm text-muted-foreground">
              このほか、複数のブロックチェーンスタートアップにてアドバイザー・開発支援を行っています。
            </p>
          </div>
        </section>

        {/* 会社概要 */}
        <section id="about" className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="04" en="COMPANY" title="会社概要" />
            <Reveal>
              <dl className="max-w-4xl">
                {[
                  { term: "商号", desc: company.name },
                  { term: "所在地", desc: `〒${company.postalCode} ${company.address}` },
                  { term: "設立", desc: company.foundedLabel },
                  { term: "代表者", desc: `代表社員 ${company.representative}` },
                  { term: "連絡先", desc: company.email },
                ].map((row) => (
                  <div
                    key={row.term}
                    className="grid gap-1 border-b border-border py-5 first:border-t sm:grid-cols-[10rem_1fr] sm:gap-8"
                  >
                    <dt className="text-sm font-medium text-muted-foreground">{row.term}</dt>
                    <dd className="text-sm sm:text-base">{row.desc}</dd>
                  </div>
                ))}
                <div className="grid gap-1 border-b border-border py-5 sm:grid-cols-[10rem_1fr] sm:gap-8">
                  <dt className="text-sm font-medium text-muted-foreground">事業内容</dt>
                  <dd>
                    <ul className="grid gap-2 text-sm sm:grid-cols-2 sm:text-base">
                      {businessFields.map((field) => (
                        <li key={field} className="flex gap-2">
                          <span className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-line-azure" aria-hidden="true" />
                          {field}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* 代表者紹介 */}
        <section id="profile" className="border-t border-border bg-white">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="05" en="REPRESENTATIVE" title="代表者紹介" />
            <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
              <Reveal>
                <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">代表社員</p>
                <h3 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                  <span className="marker-line">{company.representative}</span>
                </h3>
                <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  未踏スーパークリエータ。パブリックブロックチェーン企業のCTO、大手企業グループのコンサルティング、
                  Web3事業のプロジェクトマネジメントを経て、戦略と実装を一本の線で結ぶ支援を続けている。
                </p>
                <p className="mt-4 text-sm">
                  <a
                    href={company.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-underline inline-flex items-center gap-1.5 font-medium text-line-blue"
                  >
                    <span className="font-mono" aria-hidden="true">
                      𝕏
                    </span>
                    {company.xHandle}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {techSkills.map((skill) => (
                    <span key={skill} className="border border-border bg-background px-3 py-1 font-mono text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h4 className="border-b-2 border-ink pb-2 text-sm font-semibold tracking-wide">学歴</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>東京大学大学院 情報理工学系研究科 創造情報学専攻（修士課程）</li>
                    <li>会津大学 コンピュータ理工学部 コンピュータ理工学科（学士課程）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-ink pb-2 text-sm font-semibold tracking-wide">主要受賞歴</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>未踏スーパークリエータ認定（2018-2019）</li>
                    <li>ACM-ICPC World Finals 2016・2017 出場</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-ink pb-2 text-sm font-semibold tracking-wide">経歴ハイライト</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>Stake Technologies株式会社 CTO（2019-2021）</li>
                    <li>複数のブロックチェーンスタートアップでアドバイザー・開発支援</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-ink pb-2 text-sm font-semibold tracking-wide">事業運営</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <a
                        href="https://allinn.my.canva.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-underline inline-flex items-center gap-1 font-medium text-line-blue"
                      >
                        宿泊施設の運営
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-border">
          <div className="container mx-auto px-4 py-24">
            <SectionHeading no="06" en="FAQ" title="よくあるご質問" />
            <Reveal className="max-w-4xl">
              {faqs.map((faq) => (
                <details key={faq.q} className="group border-b border-border first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-medium sm:text-base [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <Plus
                      className="h-4 w-4 shrink-0 text-line-blue transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-6 text-sm leading-relaxed text-muted-foreground sm:text-base">{faq.a}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        {/* お問い合わせ */}
        <section id="contact" className="border-t border-border bg-ink text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.35em] text-line-azure">
                07 <span aria-hidden="true">─</span> CONTACT
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-snug sm:text-5xl">
                その構想に、
                <br />
                線を引きましょう。
              </h2>
              <p className="mt-6 leading-relaxed text-white/70">
                ITプロジェクトのご相談、お見積もり、技術顧問のご依頼など、お気軽にお問い合わせください。
                秘密保持契約（NDA）の締結にも対応します。
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-none bg-white px-8 text-base font-medium text-ink hover:bg-[#e8f6ff]"
                >
                  <Link href="/contact">
                    <Mail className="mr-1 h-4 w-4" />
                    お問い合わせフォームへ
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-none border-white/40 bg-transparent px-8 text-base font-medium text-white hover:bg-white/10 hover:text-white"
                >
                  <a href={company.xUrl} target="_blank" rel="noopener noreferrer">
                    XのDMで相談する
                  </a>
                </Button>
              </div>
              <div className="mt-12 space-y-2 border-t border-white/15 pt-8 text-sm text-white/60">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {company.email}
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-mono" aria-hidden="true">
                    𝕏
                  </span>
                  <a
                    href={company.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-underline hover:text-white"
                  >
                    {company.xHandle}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  〒{company.postalCode} {company.address}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-display text-lg font-semibold tracking-tight">
                PUBLIC<span className="name-underline">下線</span>
                <span className="ml-1 text-xs font-normal text-muted-foreground">合同会社</span>
              </p>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
                ITコンサルティング・ブロックチェーン開発。構想から実装まで、事業を貫く一本の線。
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground" aria-label="フッターナビゲーション">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="nav-underline hover:text-foreground">
                  {item.label}
                </a>
              ))}
              <Link href="/contact" className="nav-underline hover:text-foreground">
                お問い合わせ
              </Link>
              <Link href="/privacy" className="nav-underline hover:text-foreground">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="nav-underline hover:text-foreground">
                利用規約
              </Link>
            </nav>
          </div>
          <p className="mt-10 border-t border-border pt-6 text-xs text-muted-foreground">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
        </div>
      </footer>

      <JsonLd data={personJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={servicesJsonLd} />
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { company, siteUrl } from "@/lib/site"
import { ArrowRight, ArrowUpRight, Mail, MapPin, Plus } from "lucide-react"

const navItems = [
  { href: "#services", label: "事業内容" },
  { href: "#strengths", label: "選ばれる理由" },
  { href: "#works", label: "実績" },
  { href: "#about", label: "会社概要" },
  { href: "#profile", label: "代表者紹介" },
  { href: "#faq", label: "FAQ" },
]

const heroStats = [
  { value: "2021", label: "設立 / 東京・浜松町" },
  { value: "未踏", label: "スーパークリエータ認定（IPA）" },
  { value: "ICPC", label: "World Finals 2016・2017 出場" },
  { value: "20億円", label: "再興したWeb3事業の売上規模" },
]

const services = [
  {
    no: "01",
    title: "ITコンサルティング",
    en: "IT CONSULTING",
    body: "経営課題を技術の言葉に翻訳し、実行可能なIT戦略へ落とし込みます。企業戦略立案・システム構築支援まで、意思決定の初手から伴走します。",
  },
  {
    no: "02",
    title: "ブロックチェーン・Web3開発",
    en: "BLOCKCHAIN / WEB3",
    body: "スマートコントラクト開発、RWA、決済システムまで。パブリックチェーンのCTO経験に裏打ちされた、事業に耐えるWeb3実装を提供します。",
  },
  {
    no: "03",
    title: "Forward Deployed Engineering",
    en: "FORWARD DEPLOYED ENGINEERING",
    body: "顧客の現場に深く入り込み、AI・ソフトウェアのカスタマイズから実装・運用までを短期間で一気通貫支援。要件定義書を待たず、現場で動くものを届けます。",
  },
  {
    no: "04",
    title: "システム設計・開発",
    en: "SYSTEM DESIGN & DEVELOPMENT",
    body: "ソフトウェア・ハードウェアの企画・開発・設計、Webアプリケーション開発。堅牢で拡張性の高いアーキテクチャを、保守・運用まで見据えて構築します。",
  },
]

const strengths = [
  {
    title: "大企業の基準を知る実行力",
    body: "国内大手企業の子会社ブロックチェーンプロジェクトのコンサルティング、売上20億円規模のWeb3事業再興など、企業水準の品質・統制が求められる現場での実績があります。",
  },
  {
    title: "経営と技術、両方の言語",
    body: "パブリックブロックチェーン企業のCTO、プロジェクトマネージャー、技術顧問。戦略の意思決定からコードレビューまで、階層を跨いで同じ精度で対話できます。",
  },
  {
    title: "構想から運用までの一本線",
    body: "コンサルティング会社と開発会社に分断されがちな工程を、一つのチームで貫きます。戦略・設計・実装・運用の間で情報が失われません。",
  },
]

const works = [
  {
    period: "2024 – 2025",
    title: "大手企業グループ ブロックチェーンプロジェクト",
    role: "コンサルティング",
    detail: "国内大手企業の子会社によるブロックチェーンプロジェクトのコンサルティングを担当。",
  },
  {
    period: "2024",
    title: "株式会社Apas Port「RWAプロジェクト」",
    role: "技術顧問",
    detail: "現実世界の事業をオンチェーンに拡張するRWAプロジェクトの技術顧問に就任。",
    link: "https://prtimes.jp/main/html/rd/p/000000008.000125767.html",
    linkLabel: "PR TIMES 掲載記事",
  },
  {
    period: "2024",
    title: "AOTAKE Project 2024",
    role: "メンター",
    detail: "会津・秋田地域のスタートアップ人材支援プロジェクトにメンターとして参画。",
    link: "https://aizu-startups-foundation.com/aotake/2024",
    linkLabel: "AOTAKE Project 2024",
  },
  {
    period: "2023 – 2024",
    title: "TOKI スマートコントラクト開発",
    role: "ソフトウェアエンジニア",
    detail: "クロスチェーン領域におけるスマートコントラクトの受託ソフトウェア開発。",
  },
  {
    period: "2022 – 2023",
    title: "国内企業向けWeb3プロジェクトの再興",
    role: "プロジェクトマネージャー",
    detail: "停滞していたWeb3プロジェクトを立て直し、売上20億円を達成。",
  },
  {
    period: "2019 – 2021",
    title: "Stake Technologies株式会社",
    role: "CTO",
    detail: "パブリックブロックチェーン開発企業の最高技術責任者として開発を牽引。",
  },
]

const businessFields = [
  "ソフトウェア・ハードウェアの企画・開発・設計",
  "ITコンサルティング業務",
  "Forward Deployed Engineering",
  "企業戦略立案・システム構築支援",
  "ブロックチェーン技術開発",
  "決済システム開発",
  "Webアプリケーション開発",
]

const techSkills = ["Rust", "Go", "TypeScript", "C/C++", "Python", "React", "Docker", "Blockchain"]

const faqs = [
  {
    q: "どのような業務を依頼できますか？",
    a: "ITコンサルティング、ブロックチェーン・Web3開発、スマートコントラクト開発、決済システム開発、Forward Deployed Engineering（現場常駐型のAI・ソフトウェア実装支援）などをご依頼いただけます。戦略立案のみ、開発のみといった部分的なご依頼も可能です。",
  },
  {
    q: "大企業のプロジェクトにも対応できますか？",
    a: "対応できます。国内大手企業の子会社によるブロックチェーンプロジェクトのコンサルティングや、売上20億円規模のWeb3プロジェクト再興など、企業水準の品質管理・統制が求められるプロジェクトの実績があります。",
  },
  {
    q: "技術顧問やアドバイザリーだけの契約も可能ですか？",
    a: "可能です。株式会社Apas PortのRWAプロジェクト技術顧問をはじめ、複数のブロックチェーンスタートアップでアドバイザー・開発支援の実績があります。週数時間からの顧問契約もご相談ください。",
  },
  {
    q: "対応できる技術領域を教えてください。",
    a: "Rust・Go・TypeScript・C/C++・Pythonによるシステム開発、Reactを用いたWebアプリケーション開発、Docker等のインフラ構築、スマートコントラクトを含むブロックチェーン開発に対応しています。",
  },
  {
    q: "相談・見積もりの流れを教えてください。",
    a: `メール（${company.email}）にてお問い合わせください。初回ヒアリングで課題を伺い、支援範囲・体制・概算費用をご提案します。秘密保持契約（NDA）の締結にも対応します。`,
  },
]

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#representative`,
  name: company.representative,
  jobTitle: "代表社員",
  worksFor: { "@id": `${siteUrl}/#organization` },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "東京大学大学院 情報理工学系研究科" },
    { "@type": "CollegeOrUniversity", name: "会津大学 コンピュータ理工学部" },
  ],
  award: ["未踏スーパークリエータ認定（2018-2019）", "ACM-ICPC World Finals 2016・2017 出場"],
  knowsAbout: ["ブロックチェーン", "スマートコントラクト", "ITコンサルティング", "決済システム"],
}

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.title,
    description: service.body,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: "JP",
  })),
}

function SectionHeading({ no, en, title }: { no: string; en: string; title: string }) {
  return (
    <Reveal className="mb-12">
      <p className="font-mono text-xs tracking-[0.35em] text-[#0057d9]">
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
          <Link href="/" className="flex items-baseline gap-2" aria-label="PUBLIC下線合同会社 トップページ">
            <span className="font-display text-xl font-semibold tracking-tight">
              PUBLIC<span className="name-underline">下線</span>
            </span>
            <span className="text-xs text-muted-foreground">合同会社</span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm lg:flex" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-underline text-foreground/80 hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>

          <Button asChild className="rounded-none bg-[#0b1f33] px-5 text-sm font-medium text-white hover:bg-[#16324d]">
            <a href={`mailto:${company.email}`}>お問い合わせ</a>
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
            <p className="animate-rise font-mono text-xs tracking-[0.35em] text-[#0057d9]">
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
                className="group rounded-none bg-[#0b1f33] px-8 text-base font-medium text-white hover:bg-[#16324d]"
              >
                <a href={`mailto:${company.email}`}>
                  プロジェクトの相談をする
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
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
                          className="nav-underline mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#0057d9]"
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
                          <span className="mt-[0.7em] h-[2px] w-4 shrink-0 bg-[#00b5ff]" aria-hidden="true" />
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
                  <h4 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">学歴</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>東京大学大学院 情報理工学系研究科 創造情報学専攻（修士課程）</li>
                    <li>会津大学 コンピュータ理工学部 コンピュータ理工学科（学士課程）</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">主要受賞歴</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>未踏スーパークリエータ認定（2018-2019）</li>
                    <li>ACM-ICPC World Finals 2016・2017 出場</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">経歴ハイライト</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>Stake Technologies株式会社 CTO（2019-2021）</li>
                    <li>複数のブロックチェーンスタートアップでアドバイザー・開発支援</li>
                  </ul>
                </div>
                <div>
                  <h4 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">事業運営</h4>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <a
                        href="https://allinn.my.canva.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-underline inline-flex items-center gap-1 font-medium text-[#0057d9]"
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
                      className="h-4 w-4 shrink-0 text-[#0057d9] transition-transform duration-300 group-open:rotate-45"
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
        <section id="contact" className="border-t border-border bg-[#0b1f33] text-white">
          <div className="container mx-auto px-4 py-24">
            <div className="max-w-3xl">
              <p className="font-mono text-xs tracking-[0.35em] text-[#00b5ff]">
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
              <div className="mt-10">
                <Button
                  asChild
                  size="lg"
                  className="group rounded-none bg-white px-8 text-base font-medium text-[#0b1f33] hover:bg-[#e8f6ff]"
                >
                  <a href={`mailto:${company.email}`}>
                    <Mail className="mr-1 h-4 w-4" />
                    メールでお問い合わせ
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              <div className="mt-12 space-y-2 border-t border-white/15 pt-8 text-sm text-white/60">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {company.email}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }} />
    </div>
  )
}

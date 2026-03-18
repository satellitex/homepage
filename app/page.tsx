import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Award, Building2, Code, Mail, MapPin, Users } from "lucide-react"

const navItems = [
  { href: "#about", label: "会社概要" },
  { href: "#services", label: "事業内容" },
  { href: "#profile", label: "代表者紹介" },
  { href: "#contact", label: "お問い合わせ" },
]

const mainBusinessFields = [
  "ソフトウェア・ハードウェアの企画・開発・設計",
  "ITコンサルティング業務",
  "Forward Deployed Engineering（顧客現場に深く入り込み、AI/ソフトウェアのカスタマイズから実装・運用までを短期間で一気通貫支援）",
  "企業戦略立案・システム構築支援",
  "ブロックチェーン技術開発",
  "決済システム開発",
  "Webアプリケーション開発",
]

const serviceCards = [
  {
    title: "コンサルティング",
    description: "戦略立案から実行まで",
    body: "お客様のビジネス課題を深く理解し、最適なIT戦略を立案。企業革新やシステム構築を総合的にサポートします。",
  },
  {
    title: "システム設計",
    description: "スケーラブルな設計",
    body: "最新技術を活用した堅牢で拡張性の高いシステム設計。 ブロックチェーンから従来システムまで幅広く対応。",
  },
  {
    title: "開発・実装",
    description: "高品質な実装",
    body: "豊富な開発経験を活かし、高品質なソフトウェアを開発。 保守・運用まで一貫してサポートします。",
  },
]

const profileAchievements = [
  {
    title: "ブロックチェーンコンサルティング・大手（2024～2025）",
    detail: "国内大手企業の子会社によるブロックチェーンプロジェクトのコンサルティング",
  },
  {
    title: "株式会社Apas Port RWAプロジェクト 技術顧問（2024）",
    detail: "PR TIMES掲載：現実世界の事業をオンチェーンに拡張するRWAプロジェクトの顧問就任",
    link: "https://prtimes.jp/main/html/rd/p/000000008.000125767.html",
    linkLabel: "PR TIMES掲載記事",
  },
  {
    title: "AOTAKE Project 2024 メンター",
    detail: "会津・秋田地域のスタートアップ人材支援プロジェクトにメンターとして参画",
    link: "https://aizu-startups-foundation.com/aotake/2024",
    linkLabel: "AOTAKE Project 2024",
  },
  {
    title: "ソフトウェアエンジニア・TOKI（2023～2024）",
    detail: "スマートコントラクトの受託ソフトウェア開発",
  },
  {
    title: "プロジェクトマネージャー・■■（2022～2023）",
    detail: "国内企業向けのweb3プロジェクトの再興。20億円の売上",
  },
  {
    title: "Stake Technologies株式会社 CTO（2019-2021）",
    detail: "",
  },
  {
    title: "複数のブロックチェーンスタートアップでアドバイザー・開発支援",
    detail: "",
  },
]

const techSkills = ["C/C++", "Rust", "Go", "Python", "TypeScript", "React", "Docker", "Blockchain"]

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip pb-10">
      <div className="hero-halo pointer-events-none" aria-hidden="true" />
      <div className="bg-grid-lines pointer-events-none" aria-hidden="true" />

      <header className="sticky top-0 z-50 border-b border-white/15 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <a href="#top" className="flex items-center gap-3 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/20 bg-white/10">
              <Building2 className="h-5 w-5" />
            </span>
            <span className="font-display text-lg tracking-tight">PUBLIC下線合同会社</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-200 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            asChild
            className="rounded-full border border-white/25 bg-[#f97316] px-5 text-sm font-semibold text-slate-950 hover:bg-[#fb923c]"
          >
            <a href="mailto:public.company.sate@gmail.com">お問い合わせ</a>
          </Button>
        </div>
      </header>

      <main id="top">
        <section className="pt-20 sm:pt-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="space-y-7">
              <Badge className="rounded-full border border-cyan-200/60 bg-cyan-300/20 px-4 py-1 text-cyan-100">
                PUBLIC下線合同会社
              </Badge>
              <h1 className="font-display text-5xl font-semibold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl">
                コンサルから開発まで
                <span className="block text-transparent bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 bg-clip-text">
                  一気通貫でサポート
                </span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">
                最新技術と豊富な経験を活かし、お客様のビジネス課題を解決する 総合的なITソリューションを提供いたします
              </p>
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-[#f97316] px-8 text-base font-semibold text-slate-950 hover:bg-[#fb923c]"
              >
                <a href="mailto:public.company.sate@gmail.com">
                  お問い合わせ
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>

            <Card className="glass-panel border-white/15 bg-slate-900/60 text-slate-100">
              <CardHeader>
                <CardTitle className="font-display text-3xl">基本情報</CardTitle>
                <CardDescription className="text-slate-300">会社概要</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm sm:text-base">
                <div>
                  <p className="text-slate-400">商号</p>
                  <p className="text-white">PUBLIC下線合同会社</p>
                </div>
                <div>
                  <p className="text-slate-400">所在地</p>
                  <p className="text-white">
                    〒105-0013
                    <br />
                    東京都港区浜松町二丁目2番15号
                    <br />
                    浜松町ダイヤビル2F
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-slate-400">設立</p>
                    <p className="text-white">令和3年1月18日</p>
                  </div>
                  <div>
                    <p className="text-slate-400">代表者</p>
                    <p className="text-white">代表社員 山下琢巳</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="about" className="pt-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 font-display text-4xl text-white sm:text-5xl">会社概要</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-white/15 bg-slate-900/60 text-slate-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-2xl">
                    <Building2 className="h-5 w-5 text-cyan-300" />
                    基本情報
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm sm:text-base">
                  <div>
                    <p className="text-slate-400">商号</p>
                    <p>PUBLIC下線合同会社</p>
                  </div>
                  <div>
                    <p className="text-slate-400">所在地</p>
                    <p>
                      〒105-0013
                      <br />
                      東京都港区浜松町二丁目2番15号
                      <br />
                      浜松町ダイヤビル2F
                    </p>
                  </div>
                  <div>
                    <p className="text-slate-400">設立</p>
                    <p>令和3年1月18日</p>
                  </div>
                  <div>
                    <p className="text-slate-400">代表者</p>
                    <p>代表社員 山下琢巳</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/15 bg-slate-900/60 text-slate-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-2xl">
                    <Code className="h-5 w-5 text-cyan-300" />
                    主要事業領域
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-relaxed text-slate-200 sm:text-base">
                    {mainBusinessFields.map((field) => (
                      <li key={field}>• {field}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="services" className="pt-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 font-display text-4xl text-white sm:text-5xl">事業内容</h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {serviceCards.map((service) => (
                <Card key={service.title} className="border-white/15 bg-slate-900/60 text-slate-100">
                  <CardHeader>
                    <CardTitle className="font-display text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-slate-300">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-slate-200 sm:text-base">{service.body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="profile" className="pt-24">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 font-display text-4xl text-white sm:text-5xl">代表者紹介</h2>
            <div className="mx-auto max-w-5xl">
              <Card className="border-white/15 bg-slate-900/60 text-slate-100">
                <CardHeader>
                  <CardTitle className="font-display text-3xl">山下 琢巳</CardTitle>
                  <CardDescription className="text-slate-300">代表社員</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-white">
                      <Users className="h-4 w-4 text-cyan-300" />
                      学歴
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-200 sm:text-base">
                      <li>• 東京大学大学院 情報理工学系研究科 創造情報学部（修士課程）</li>
                      <li>• 会津大学 コンピュータ理工学部 コンピュータ理工学科（学士課程）</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">主要実績</h3>
                    <ul className="space-y-3 text-sm text-slate-200 sm:text-base">
                      {profileAchievements.map((achievement) => (
                        <li key={achievement.title}>
                          • {achievement.title}
                          {achievement.detail ? (
                            <>
                              <br />
                              {achievement.detail}
                            </>
                          ) : null}
                          {achievement.link ? (
                            <>
                              <br />
                              <a
                                href={achievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-300 hover:underline"
                              >
                                {achievement.linkLabel ?? achievement.link}
                              </a>
                            </>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">技術スキル</h3>
                    <div className="flex flex-wrap gap-2">
                      {techSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-slate-700/70 text-slate-100 hover:bg-slate-700/80"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 text-xl font-semibold text-white">事業運営</h3>
                    <ul className="space-y-2 text-sm text-slate-200 sm:text-base">
                      <li>
                        •{" "}
                        <a
                          href="https://allinn.my.canva.site/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-300 hover:underline"
                        >
                          宿泊施設の運営
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="mb-3 flex items-center gap-2 text-xl font-semibold text-white">
                      <Award className="h-4 w-4 text-cyan-300" />
                      主要受賞歴
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-200 sm:text-base">
                      <li>• 未踏スーパークリエータ認定（2018-2019）</li>
                      <li>• ACM-ICPC World Finals 2016, 2017 出場</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="contact" className="pt-24">
          <div className="container mx-auto px-4">
            <div className="rounded-[2rem] border border-cyan-200/20 bg-gradient-to-br from-[#155e75]/80 via-[#0f172a] to-[#0f172a] p-8 text-white sm:p-12">
              <h2 className="mb-6 text-center font-display text-4xl sm:text-5xl">お問い合わせ</h2>
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-lg text-slate-100 sm:text-xl">
                  ITプロジェクトのご相談、お見積もりなど
                  <br />
                  お気軽にお問い合わせください
                </p>
                <div className="mt-8 space-y-4">
                  <p className="flex items-center justify-center gap-2 text-slate-100">
                    <Mail className="h-5 w-5" />
                    public.company.sate@gmail.com
                  </p>
                  <p className="flex items-center justify-center gap-2 text-slate-100">
                    <MapPin className="h-5 w-5" />
                    東京都港区浜松町二丁目2番15号 浜松町ダイヤビル2F
                  </p>
                </div>
                <div className="mt-8">
                  <Button asChild size="lg" className="rounded-full bg-[#f97316] px-8 text-slate-950 hover:bg-[#fb923c]">
                    <a href="mailto:public.company.sate@gmail.com">
                      <Mail className="mr-2 h-4 w-4" />
                      メールでお問い合わせ
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-24 border-t border-white/15 bg-slate-950/90 py-8 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Building2 className="h-6 w-6" />
            <span className="font-display text-xl">PUBLIC下線合同会社</span>
          </div>
          <p className="text-sm text-slate-400">© 2025 PUBLIC下線合同会社. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

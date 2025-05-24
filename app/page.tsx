import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Code, Users, Award, Mail, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PUBLIC下線合同会社</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                会社概要
              </a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                事業内容
              </a>
              <a href="#profile" className="text-gray-600 hover:text-blue-600 transition-colors">
                代表者紹介
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                お問い合わせ
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            コンサルから開発まで
            <br />
            <span className="text-blue-600">一気通貫でサポート</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            最新技術と豊富な経験を活かし、お客様のビジネス課題を解決する 総合的なITソリューションを提供いたします
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
            <a href="mailto:public.company.sate@gmail.com">お問い合わせ</a>
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">会社概要</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  基本情報
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold">商号</p>
                  <p className="text-gray-600">PUBLIC下線合同会社</p>
                </div>
                <div>
                  <p className="font-semibold">所在地</p>
                  <p className="text-gray-600">
                    〒105-0013
                    <br />
                    東京都港区浜松町二丁目2番15号
                    <br />
                    浜松町ダイヤビル2F
                  </p>
                </div>
                <div>
                  <p className="font-semibold">設立</p>
                  <p className="text-gray-600">令和3年1月18日</p>
                </div>
                <div>
                  <p className="font-semibold">代表者</p>
                  <p className="text-gray-600">代表社員 山下琢巳</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  主要事業領域
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li>• ソフトウェア・ハードウェアの企画・開発・設計</li>
                  <li>• ITコンサルティング業務</li>
                  <li>• 企業戦略立案・システム構築支援</li>
                  <li>• ブロックチェーン技術開発</li>
                  <li>• 決済システム開発</li>
                  <li>• Webアプリケーション開発</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">事業内容</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>コンサルティング</CardTitle>
                <CardDescription>戦略立案から実行まで</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  お客様のビジネス課題を深く理解し、最適なIT戦略を立案。
                  企業革新やシステム構築を総合的にサポートします。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>システム設計</CardTitle>
                <CardDescription>スケーラブルな設計</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  最新技術を活用した堅牢で拡張性の高いシステム設計。 ブロックチェーンから従来システムまで幅広く対応。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>開発・実装</CardTitle>
                <CardDescription>高品質な実装</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  豊富な開発経験を活かし、高品質なソフトウェアを開発。 保守・運用まで一貫してサポートします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">代表者紹介</h3>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">山下 琢巳</CardTitle>
                <CardDescription>代表社員</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    学歴
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 東京大学大学院 情報理工学系研究科 創造情報学部（修士課程）</li>
                    <li>• 会津大学 コンピュータ理工学部 コンピュータ理工学科（学士課程）</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">主要実績</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>
                      • ブロックチェーンコンサルティング・大手（2024～2025）
                      <br />
                      国内大手企業の子会社によるブロックチェーンプロジェクトのコンサルティング
                    </li>
                    <li>
                      • ソフトウェアエンジニア・TOKI（2023～2024）
                      <br />
                      スマートコントラクトの受託ソフトウェア開発
                    </li>
                    <li>
                      • プロジェクトマネージャー・■■（2022～2023）
                      <br />
                      国内企業向けのweb3プロジェクトの再興。20億円の売上
                    </li>
                    <li>• Stake Technologies株式会社 CTO（2019-2021）</li>
                    <li>• 複数のブロックチェーンスタートアップでアドバイザー・開発支援</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">技術スキル</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">C/C++</Badge>
                    <Badge variant="secondary">Rust</Badge>
                    <Badge variant="secondary">Go</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">TypeScript</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">Blockchain</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">事業運営</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>
                      •{" "}
                      <a
                        href="https://allinn.my.canva.site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        宿泊施設の運営
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Award className="mr-2 h-4 w-4" />
                    主要受賞歴
                  </h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• 未踏スーパークリエータ認定（2018-2019）</li>
                    <li>• ACM-ICPC World Finals 2016, 2017 出場</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">お問い合わせ</h3>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xl mb-8">
              ITプロジェクトのご相談、お見積もりなど
              <br />
              お気軽にお問い合わせください
            </p>
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>public.company.sate@gmail.com</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>東京都港区浜松町二丁目2番15号 浜松町ダイヤビル2F</span>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="secondary" size="lg" asChild>
                <a href="mailto:public.company.sate@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  メールでお問い合わせ
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Building2 className="h-6 w-6" />
            <span className="text-lg font-semibold">PUBLIC下線合同会社</span>
          </div>
          <p className="text-gray-400">© 2025 PUBLIC下線合同会社. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

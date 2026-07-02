// サイトの掲載コンテンツ。文言の修正・追加はこのファイルで行う
import { company } from "./site"

export const navItems = [
  { href: "#services", label: "事業内容" },
  { href: "#strengths", label: "選ばれる理由" },
  { href: "#works", label: "実績" },
  { href: "#about", label: "会社概要" },
  { href: "#profile", label: "代表者紹介" },
  { href: "#faq", label: "FAQ" },
]

export const heroStats = [
  { value: "2021", label: "設立 / 東京・浜松町" },
  { value: "未踏", label: "スーパークリエータ認定（IPA）" },
  { value: "ICPC", label: "World Finals 2016・2017 出場" },
  { value: "20億円", label: "再興したWeb3事業の売上規模" },
]

export const services = [
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

export const strengths = [
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

export type Work = {
  period: string
  title: string
  role: string
  detail: string
  link?: string
  linkLabel?: string
}

export const works: Work[] = [
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
    period: "2024 – 現在",
    title: "AOTAKE Project",
    role: "メンター",
    detail: "会津・秋田地域のスタートアップ人材支援プロジェクトにメンターとして継続参画。",
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

export const businessFields = [
  "ソフトウェア・ハードウェアの企画・開発・設計",
  "ITコンサルティング業務",
  "Forward Deployed Engineering",
  "企業戦略立案・システム構築支援",
  "ブロックチェーン技術開発",
  "決済システム開発",
  "Webアプリケーション開発",
]

export const techSkills = [
  "Rust",
  "Go",
  "TypeScript",
  "C/C++",
  "Python",
  "React",
  "Docker",
  "Blockchain",
  "Harness Engineering",
  "Quantum Computing",
]

export const inquiryTypes = [
  "ITコンサルティング",
  "ブロックチェーン・Web3開発",
  "Forward Deployed Engineering",
  "技術顧問・アドバイザリー",
  "その他",
]

export const faqs = [
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
    a: `お問い合わせフォームまたはメール（${company.email}）、X（${company.xHandle}）のDMからご連絡ください。初回ヒアリングで課題を伺い、支援範囲・体制・概算費用をご提案します。秘密保持契約（NDA）の締結にも対応します。`,
  },
]

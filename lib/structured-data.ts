// schema.org 構造化データ(JSON-LD)。components/json-ld.tsx で埋め込む
import { faqs, services } from "./content"
import { company, siteUrl } from "./site"

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: company.name,
  url: `${siteUrl}/`,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/og-image.png`,
  description: company.description,
  foundingDate: company.founded,
  email: company.email,
  sameAs: [company.xUrl],
  address: {
    "@type": "PostalAddress",
    postalCode: company.postalCode,
    addressRegion: "東京都",
    addressLocality: "港区",
    streetAddress: "浜松町二丁目2番15号 浜松町ダイヤビル2F",
    addressCountry: "JP",
  },
  founder: {
    "@type": "Person",
    "@id": `${siteUrl}/#representative`,
    name: company.representative,
  },
  knowsAbout: [
    "ITコンサルティング",
    "ブロックチェーン開発",
    "スマートコントラクト",
    "Web3",
    "決済システム",
    "Forward Deployed Engineering",
  ],
}

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: company.name,
  url: `${siteUrl}/`,
  inLanguage: "ja",
  publisher: { "@id": `${siteUrl}/#organization` },
}

export const personJsonLd = {
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
  knowsAbout: [
    "ブロックチェーン",
    "スマートコントラクト",
    "ITコンサルティング",
    "決済システム",
    "Harness Engineering",
    "量子コンピューティング",
  ],
  sameAs: [company.xUrl],
}

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

export const servicesJsonLd = {
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

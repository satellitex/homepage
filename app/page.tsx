import { JsonLd } from "@/components/json-ld"
import { About } from "@/components/home/about"
import { ContactCta } from "@/components/home/contact-cta"
import { Faq } from "@/components/home/faq"
import { Hero } from "@/components/home/hero"
import { HomeFooter } from "@/components/home/home-footer"
import { HomeHeader } from "@/components/home/home-header"
import { Intro } from "@/components/home/intro"
import { Profile } from "@/components/home/profile"
import { Services } from "@/components/home/services"
import { SkillsMarquee } from "@/components/home/skills-marquee"
import { Strengths } from "@/components/home/strengths"
import { Works } from "@/components/home/works"
import { faqJsonLd, personJsonLd, servicesJsonLd } from "@/lib/structured-data"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        本文へスキップ
      </a>

      <Intro />
      <HomeHeader />

      <main id="main">
        <Hero />
        <SkillsMarquee />
        <Services />
        <Strengths />
        <Works />
        <About />
        <Profile />
        <Faq />
        <ContactCta />
      </main>

      <HomeFooter />

      <JsonLd data={personJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={servicesJsonLd} />
    </div>
  )
}

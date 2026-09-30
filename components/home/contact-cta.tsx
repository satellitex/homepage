import Link from "next/link"
import { ArrowRight, ArrowUpRight, Mail, MapPin } from "lucide-react"
import { Magnetic } from "@/components/fx/magnetic"
import { SplitText } from "@/components/fx/split-text"
import { ContactPortal } from "@/components/home/contact-portal"
import { Reveal } from "@/components/reveal"
import { company } from "@/lib/site"
import styles from "./contact-cta.module.css"
import { cssVars } from "@/lib/utils"

export function ContactCta() {
  return (
    <section id="contact" className="relative isolate pb-24 pt-28 sm:pb-32 sm:pt-36">
      {/* 画面全体にうっすら滲む光 */}
      <div
        className="orb left-1/2 top-1/2 -z-10 h-[36rem] w-[64rem] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,87,217,0.16)]"
        aria-hidden="true"
      />

      <div className="container">
        <ContactPortal>
          <Reveal
            as="p"
            className="eyebrow inline-flex items-center gap-3 rounded-full border border-hairline-strong bg-[rgba(148,178,230,0.05)] px-4 py-2"
          >
            <span className="pulse-dot shrink-0" aria-hidden="true" />
            <span>
              07 <span aria-hidden="true">─</span> CONTACT
            </span>
          </Reveal>

          <SplitText
            as="h2"
            stagger={55}
            delay={150}
            className="sheen-chars mt-8 text-balance text-[clamp(2rem,9.6vw,6rem)] font-black leading-[1.14] tracking-[-0.035em] sm:mt-10"
          >
            その構想に、
            <br />
            <span data-split="none" className="beam-underline" style={cssVars({ "--beam-delay": "1.15s" })}>
              <span className="text-gradient text-gradient-animate">線</span>
            </span>
            を引きましょう。
          </SplitText>

          <Reveal
            as="p"
            delay={320}
            className="mx-auto mt-9 max-w-[52rem] text-[0.95rem] leading-[1.9] text-fg-muted sm:mt-10 sm:text-[1.05rem]"
          >
            <span className="inline-block">ITプロジェクトのご相談、</span>
            <span className="inline-block">お見積もり、</span>
            <span className="inline-block">技術顧問のご依頼など、</span>
            <span className="inline-block">お気軽にお問い合わせください。</span>{" "}
            <span className="inline-block">秘密保持契約（NDA）の締結にも対応します。</span>
          </Reveal>

          <Reveal
            delay={460}
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:mt-12 sm:flex-row sm:items-center sm:gap-4"
          >
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <span className={styles.ring}>
                <Link href="/contact" className="btn-primary group w-full px-8 py-4 text-base">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  お問い合わせフォームへ
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </span>
            </Magnetic>
            <Magnetic strength={0.2} className="w-full sm:w-auto">
              <a
                href={company.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost group w-full px-8 py-4 text-base"
              >
                XのDMで相談する
                <ArrowUpRight
                  className="h-4 w-4 text-beam-sky transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </Reveal>

          {/* パネルの左右いっぱいに引かれる、一本の光の線 */}
          <div className={styles.beam} aria-hidden="true">
            <span className={styles.beamLine} />
            <span className={styles.beamHead} />
          </div>

          <Reveal
            delay={600}
            className="mt-10 flex flex-col items-stretch gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
          >
            <p className={styles.chip}>
              <span className={styles.chipIcon}>
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              {company.email}
            </p>
            <p className={styles.chip}>
              <span className={styles.chipIcon}>
                <span className="font-mono text-sm" aria-hidden="true">
                  𝕏
                </span>
              </span>
              <a
                href={company.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-underline hover:text-fg"
              >
                {company.xHandle}
              </a>
            </p>
            <p className={styles.chip}>
              <span className={styles.chipIcon}>
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                〒{company.postalCode} {company.address}
              </span>
            </p>
          </Reveal>
        </ContactPortal>
      </div>
    </section>
  )
}

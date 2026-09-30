import { SpotlightCard } from "@/components/fx/spotlight-card"
import { AboutGlobe } from "@/components/home/about-globe"
import { SectionHeading } from "@/components/home/section-heading"
import { Reveal } from "@/components/reveal"
import { businessFields } from "@/lib/content"
import { company } from "@/lib/site"
import styles from "./about.module.css"
import { cn, cssVars } from "@/lib/utils"


// 社名の「下線」だけを光らせる(文字列そのものは company.name のまま)
function CompanyName() {
  const [head, tail] = company.name.split("下線")
  if (tail === undefined) return <>{company.name}</>
  return (
    <>
      {head}
      <span className="name-underline">下線</span>
      {tail}
    </>
  )
}

export function About() {
  const rows = [
    { term: "商号", desc: <CompanyName />, strong: true },
    { term: "所在地", desc: `〒${company.postalCode} ${company.address}` },
    { term: "設立", desc: company.foundedLabel },
    { term: "代表者", desc: `代表社員 ${company.representative}` },
    { term: "連絡先", desc: company.email },
  ]

  return (
    <section id="about" className="relative isolate overflow-clip py-28 sm:py-36">
      {/* 背景の光と方眼 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute -left-24 top-0 h-[44rem] w-[64rem] max-w-none opacity-70" />
        <div className="orb -left-48 top-24 h-[30rem] w-[30rem] bg-[rgba(0,87,217,0.42)]" />
        <div className="orb -right-40 bottom-0 h-[28rem] w-[28rem] bg-[rgba(99,102,255,0.28)]" />
      </div>

      <div className="container relative">
        <div className="grid items-start gap-12 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.3fr)] xl:gap-20">
          <div className="xl:sticky xl:top-28">
            <SectionHeading no="04" en="COMPANY" title="会社概要" className="mb-8 sm:mb-10 xl:mb-12" />
            <Reveal delay={200} className="max-xl:-mt-2">
              <AboutGlobe />
            </Reveal>
          </div>

          <Reveal delay={120}>
            <SpotlightCard className={cn("backdrop-blur-[14px]", styles.panel)}>
              <span className={styles.edge} aria-hidden="true" />
              <dl className={styles.spec}>
                {rows.map((row, i) => (
                  <div key={row.term} className={styles.row} style={cssVars({ "--i": i })}>
                    <dt className={styles.term}>{row.term}</dt>
                    <dd className={row.strong ? styles.descStrong : styles.desc}>{row.desc}</dd>
                  </div>
                ))}
                <div className={styles.row} style={cssVars({ "--i": rows.length })}>
                  <dt className={styles.term}>事業内容</dt>
                  <dd className={styles.desc}>
                    <ul className={styles.fields}>
                      {businessFields.map((field, i) => (
                        <li key={field} className={styles.field} style={cssVars({ "--i": i })}>
                          <span className={styles.dash} aria-hidden="true" />
                          {field}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

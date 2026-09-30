import type { ReactNode } from "react"
import { ArrowUpRight, Building2, GraduationCap, Rocket, Trophy, type LucideIcon } from "lucide-react"
import { Magnetic } from "@/components/fx/magnetic"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SplitText } from "@/components/fx/split-text"
import { SectionHeading } from "@/components/home/section-heading"
import { InView, Reveal } from "@/components/reveal"
import { techSkills } from "@/lib/content"
import { company } from "@/lib/site"
import styles from "./profile.module.css"
import { cn, cssVars } from "@/lib/utils"


// 名前のグラデーションを文字ごとに繋げるための文字数(空白を除く)
const nameChars = Math.max(2, Array.from(company.representative.replace(/\s/g, "")).length)

const externalLinkClass =
  "group/link nav-underline inline-flex items-center gap-1 font-medium text-beam-sky"

const cards: { title: string; icon: LucideIcon; items: ReactNode[] }[] = [
  {
    title: "学歴",
    icon: GraduationCap,
    items: [
      "東京大学大学院 情報理工学系研究科 創造情報学専攻（修士課程）",
      "会津大学 コンピュータ理工学部 コンピュータ理工学科（学士課程）",
    ],
  },
  {
    title: "主要受賞歴",
    icon: Trophy,
    items: ["未踏スーパークリエータ認定（2018-2019）", "ACM-ICPC World Finals 2016・2017 出場"],
  },
  {
    title: "経歴ハイライト",
    icon: Rocket,
    items: ["Stake Technologies株式会社 CTO（2019-2021）", "複数のブロックチェーンスタートアップでアドバイザー・開発支援"],
  },
  {
    title: "事業運営",
    icon: Building2,
    items: [
      <a
        key="allinn"
        href="https://allinn.my.canva.site/"
        target="_blank"
        rel="noopener noreferrer"
        className={externalLinkClass}
      >
        宿泊施設の運営
        <ArrowUpRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          aria-hidden="true"
        />
      </a>,
    ],
  },
]

// 傾けた軌道面。中を光の尾を引く点が周回する
function AuraPlane() {
  return (
    <span className={styles.auraPlane}>
      <span className={styles.auraDash} />
      <span className={styles.auraSteady} />
      <span className={styles.auraOrbit}>
        <span className={styles.auraArc} />
        <span className={styles.auraHead} />
      </span>
    </span>
  )
}

export function Profile() {
  return (
    <section id="profile" className="relative isolate overflow-clip py-28 sm:py-36">
      {/* 背景の光と方眼 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute -right-32 top-24 h-[46rem] w-[64rem] max-w-none opacity-60" />
        <div className="orb -right-56 top-40 h-[34rem] w-[34rem] bg-[rgba(99,102,255,0.32)]" />
        <div className="orb -left-56 bottom-0 h-[26rem] w-[26rem] bg-[rgba(0,87,217,0.36)]" />
      </div>

      <div className="container relative">
        <SectionHeading no="05" en="REPRESENTATIVE" title="代表者紹介" />
        <div className="grid items-start gap-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] xl:gap-14">
          <div>
            <Reveal as="p" className="flex items-center gap-3 font-mono text-xs tracking-[0.3em] text-fg-muted">
              <span className="pulse-dot shrink-0" aria-hidden="true" />
              代表社員
            </Reveal>

            <InView className={styles.nameBlock} threshold={0.15} style={cssVars({ "--n": nameChars })}>
              <div className={styles.aura} aria-hidden="true">
                <span className={styles.auraGlow} />
                <AuraPlane />
              </div>
              <SplitText as="h3" className={styles.name} stagger={110} delay={150}>
                <span className="beam-underline" style={cssVars({ "--beam-delay": "0.95s" })}>
                  {company.representative}
                </span>
              </SplitText>
              {/* 輪の手前側だけを文字の前に重ね、名前が輪をくぐる奥行きを出す */}
              <div className={cn(styles.aura, styles.auraFront)} aria-hidden="true">
                <AuraPlane />
              </div>
            </InView>

            <Reveal delay={150}>
              <p className="mt-2 text-[0.95rem] leading-[1.9] text-fg-muted sm:text-base">
                未踏スーパークリエータ。パブリックブロックチェーン企業のCTO、大手企業グループのコンサルティング、
                Web3事業のプロジェクトマネジメントを経て、戦略と実装を一本の線で結ぶ支援を続けている。
              </p>
            </Reveal>

            <Reveal delay={260} className="mt-7">
              <Magnetic>
                <a href={company.xUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost group leading-5">
                  <span className="font-mono text-beam-sky" aria-hidden="true">
                    𝕏
                  </span>
                  {company.xHandle}
                  <ArrowUpRight
                    className="h-4 w-4 text-beam-sky transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </Reveal>

            <InView className={cn("mt-9 flex flex-wrap gap-2.5", styles.chips)} threshold={0.3}>
              {techSkills.map((skill, i) => (
                <span key={skill} className={styles.pop} style={cssVars({ "--i": i })}>
                  <span className="chip">{skill}</span>
                </span>
              ))}
            </InView>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {cards.map((card, c) => (
              <Reveal key={card.title} className="h-full" delay={c * 110}>
                <SpotlightCard className={styles.card} tilt={2.5} style={cssVars({ "--c": c })}>
                  <span className={styles.mark} aria-hidden="true">
                    <card.icon strokeWidth={1.25} aria-hidden="true" />
                  </span>
                  <h4 className={styles.title}>
                    <span className={styles.tick} aria-hidden="true" />
                    {card.title}
                  </h4>
                  <ul className={styles.list}>
                    {card.items.map((item, j) => (
                      <li key={j} style={cssVars({ "--j": j })}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

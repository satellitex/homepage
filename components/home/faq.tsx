import { Plus } from "lucide-react"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SectionHeading } from "@/components/home/section-heading"
import { InView, Reveal } from "@/components/reveal"
import { faqs } from "@/lib/content"
import styles from "./faq.module.css"
import { cn, cssVars } from "@/lib/utils"

export function Faq() {
  return (
    <section id="faq" className="relative isolate py-28 sm:py-36">
      <div
        className="orb -right-48 top-28 -z-10 h-[28rem] w-[28rem] bg-[rgba(0,87,217,0.26)]"
        aria-hidden="true"
      />
      <div
        className="orb -left-56 bottom-16 -z-10 h-[24rem] w-[24rem] bg-[rgba(99,102,255,0.16)]"
        aria-hidden="true"
      />

      <div className="container min-[1280px]:grid min-[1280px]:grid-cols-[minmax(0,30rem)_minmax(0,1fr)] min-[1280px]:items-start min-[1280px]:gap-16">
        {/* 広い画面では見出しを左に固定し、質問の列だけがスクロールする */}
        <div className="min-[1280px]:sticky min-[1280px]:top-32">
          <SectionHeading no="06" en="FAQ" title="よくあるご質問" className="min-[1280px]:mb-0" />
        </div>

        <InView className={cn(styles.list, "flex flex-col gap-3")} threshold={0.05}>
          <span className={styles.rail} aria-hidden="true" />
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 90}>
              <SpotlightCard
                as="details"
                className={styles.item}
                style={cssVars({ "--i": index })}
              >
                <summary className={styles.summary}>
                  <span className={styles.node} aria-hidden="true" />
                  <span className={styles.heading}>
                    <span className={styles.index} aria-hidden="true">
                      Q.{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.question}>{faq.q}</span>
                  </span>
                  <span className={styles.plus}>
                    <Plus className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </span>
                </summary>
                <p className={styles.answer}>{faq.a}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </InView>
      </div>
    </section>
  )
}

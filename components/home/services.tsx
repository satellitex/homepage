import type { ComponentType } from "react"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { Reveal } from "@/components/reveal"
import { SectionHeading } from "@/components/home/section-heading"
import { ChainArt, ConsultingArt, DeployArt, StackArt } from "@/components/home/services-illustrations"
import { ServicesStage } from "@/components/home/services-stage"
import { services } from "@/lib/content"
import { cn } from "@/lib/utils"
import styles from "./services.module.css"

/** ベントーの並び(lg: 2 + 1 / 1 + 2)と、カードごとの挿絵 */
const bento: { span: string; wide: boolean; Art: ComponentType }[] = [
  { span: "lg:col-span-2", wide: true, Art: ConsultingArt },
  { span: "", wide: false, Art: ChainArt },
  { span: "", wide: false, Art: DeployArt },
  { span: "lg:col-span-2", wide: true, Art: StackArt },
]

export function Services() {
  return (
    <section id="services" className="relative isolate overflow-hidden py-28 sm:py-36">
      <div
        className="grid-bg pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] opacity-70"
        aria-hidden="true"
      />
      <div
        className="orb -z-10 right-[-12rem] top-[18%] h-[30rem] w-[30rem] bg-[radial-gradient(circle,rgba(0,87,217,0.55),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="orb -z-10 left-[-14rem] top-[52%] h-[24rem] w-[24rem] bg-[radial-gradient(circle,rgba(99,102,255,0.3),transparent_70%)]"
        aria-hidden="true"
      />

      <div className="container">
        <SectionHeading no="01" en="SERVICES" title="事業内容" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const { span, wide, Art } = bento[index % bento.length]
            return (
              <Reveal key={service.no} delay={index * 110} className={cn("min-w-0", span)}>
                <SpotlightCard
                  as="article"
                  tilt={2.5}
                  className={cn(styles.card, "group flex h-full flex-col lg:min-h-[26rem]")}
                >
                  {/* 上辺の光 */}
                  <span
                    className="pointer-events-none absolute inset-x-10 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-beam-azure to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                  <ServicesStage className={styles.stage}>
                    <Art />
                    <span className={styles.index} data-no={service.no} />
                  </ServicesStage>

                  <div className="relative overflow-hidden rounded-b-[calc(var(--spot-radius,1.5rem)-1px)] px-7 pb-8 pt-2 sm:px-9 sm:pb-9">
                    {wide ? (
                      <span className={cn(styles.bigNo, "hidden xl:block")} data-no={service.no} aria-hidden="true" />
                    ) : null}
                    <div className={cn("relative", wide && "lg:max-w-[36rem]")}>
                      <p className="font-mono text-[0.7rem] tracking-[0.22em] text-fg-muted sm:text-xs">
                        {service.no} <span aria-hidden="true">─</span> {service.en}
                      </p>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-fg sm:text-2xl">{service.title}</h3>
                      <p className="mt-4 text-[0.95rem] leading-[1.9] text-fg-muted sm:text-base">{service.body}</p>
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

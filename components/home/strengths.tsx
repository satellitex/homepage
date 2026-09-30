import { SectionHeading } from "@/components/home/section-heading"
import { StrengthsStory } from "@/components/home/strengths-story"
import { strengths } from "@/lib/content"

/**
 * 02 WHY US。
 * lg 以上では、左に見出しと巨大カウンターをピン留めしたまま、右の3項目がスクロールで順に光る。
 * ピン留め(position: sticky)を効かせるため、この section 自体には overflow を掛けず、
 * 背景の装飾だけを別の箱に入れてはみ出しを切る。
 */
export function Strengths() {
  return (
    <section id="strengths" className="relative isolate py-28 sm:py-36 lg:pb-16 lg:pt-0">
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [-webkit-mask-image:linear-gradient(180deg,transparent,#000_16%,#000_84%,transparent)] [mask-image:linear-gradient(180deg,transparent,#000_16%,#000_84%,transparent)]"
        aria-hidden="true"
      >
        <div className="orb -left-56 top-[6%] h-[40rem] w-[40rem] bg-[rgba(0,87,217,0.34)]" />
        <div className="orb -right-48 top-[52%] h-[36rem] w-[36rem] bg-[rgba(99,102,255,0.2)]" />
        <div className="grid-bg absolute inset-x-0 top-0 h-[55%] opacity-50" />
      </div>

      <div className="container relative">
        <StrengthsStory heading={<SectionHeading no="02" en="WHY US" title="選ばれる理由" />} items={strengths} />
      </div>
    </section>
  )
}

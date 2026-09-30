import { SectionHeading } from "@/components/home/section-heading"
import { WorksTimeline } from "@/components/home/works-timeline"
import { works } from "@/lib/content"

export function Works() {
  return (
    <section id="works" className="relative isolate overflow-hidden py-28 sm:py-36">
      {/* 装飾: 背景の光と方眼 */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="grid-bg absolute inset-x-0 top-0 h-[40rem] opacity-70" />
        <div className="orb -left-48 top-[14%] h-[26rem] w-[26rem] animate-[float-y_11s_ease-in-out_infinite] bg-[rgba(0,87,217,0.24)]" />
        <div className="orb -right-40 top-[52%] h-[24rem] w-[24rem] animate-[float-y_13s_ease-in-out_infinite_reverse] bg-[rgba(99,102,255,0.16)]" />
      </div>

      <div className="container relative">
        <SectionHeading no="03" en="TRACK RECORD" title="実績" />
        <WorksTimeline items={works} />
      </div>
    </section>
  )
}

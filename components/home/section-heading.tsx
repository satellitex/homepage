import type { ReactNode } from "react"
import { SplitText } from "@/components/fx/split-text"
import { Reveal } from "@/components/reveal"
import { cn, cssVars } from "@/lib/utils"

/** 等幅の小見出しラベル。前に短い光の線が付く */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Reveal as="p" className="eyebrow flex items-center gap-3">
      <span className="h-px w-10 bg-beam shadow-[0_0_8px_rgba(0,181,255,0.8)]" aria-hidden="true" />
      <span>{children}</span>
    </Reveal>
  )
}

type SectionHeadingProps = {
  no: string
  en: string
  title: string
  className?: string
}

/**
 * セクション見出し。等幅ラベル(番号 ─ 英語名)の前に光の線が伸び、
 * 見出しは1文字ずつ立ち上がって、最後に光の下線が引かれる。
 */
export function SectionHeading({ no, en, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 sm:mb-20", className)}>
      <Eyebrow>
        {no} <span aria-hidden="true">─</span> {en}
      </Eyebrow>
      <SplitText
        as="h2"
        className="sheen-chars mt-6 text-[clamp(2.1rem,5.2vw,4.25rem)] font-bold leading-[1.15] tracking-[-0.03em]"
        stagger={40}
        delay={120}
      >
        <span className="beam-underline" style={cssVars({ "--beam-delay": "0.55s" })}>
          {title}
        </span>
      </SplitText>
    </div>
  )
}

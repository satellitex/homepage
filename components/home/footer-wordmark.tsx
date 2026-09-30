"use client"

import { useRef, type PointerEvent } from "react"
import { trackPointer } from "@/components/fx/pointer"
import { useInViewClass } from "@/components/fx/use-in-view"
import { cn, cssVars } from "@/lib/utils"
import styles from "./home-footer.module.css"

/**
 * フッター下部の巨大な社名(装飾)。
 * - 画面に入ると「下線」の下に光の線が引かれ、光が文字の上を一度走る
 * - マウスを重ねると、カーソルの位置だけ文字が青く灯る
 * 読み上げ対象からは外す(社名は上のロゴが担う)。
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement | null>(null)
  const wordmarkRef = useRef<HTMLParagraphElement | null>(null)
  useInViewClass(ref, { threshold: 0.4, rootMargin: "0px" })

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    const point = trackPointer(event, wordmarkRef.current)
    if (point) ref.current?.style.setProperty("--wm-r", `${Math.round(point.rect.width * 0.2)}px`)
  }

  const handleLeave = () => {
    ref.current?.style.setProperty("--wm-r", "1px")
  }

  return (
    <div ref={ref} className={styles.wrap} aria-hidden="true" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <p ref={wordmarkRef} className={styles.wordmark}>
        PUBLIC
        <span className={cn("beam-underline", styles.underlined)} style={cssVars({ "--beam-delay": "0.5s" })}>
          下線
        </span>
      </p>
    </div>
  )
}

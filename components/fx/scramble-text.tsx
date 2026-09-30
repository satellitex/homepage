"use client"

import { useEffect, useRef } from "react"
import { introDelayMs, prefersReducedMotion } from "@/components/fx/env"
import { scrambleText } from "@/components/fx/scramble"

type ScrambleTextProps = {
  text: string
  /** イントロ演出の後、開始するまでの遅延(ms) */
  delay?: number
  /** 解読し終わるまでの時間(ms) */
  duration?: number
}

/**
 * ページ読み込み時(イントロの後)に、ランダムな文字が左から順に本来の文字へ「解読」されていく演出。
 * サーバー描画時と完了後は本来の文字列そのものを表示する。
 */
export function ScrambleText({ text, delay = 0, duration = 1100 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const node = ref.current?.firstChild
    if (!(node instanceof Text) || prefersReducedMotion()) return
    let cancel: (() => void) | undefined
    const timer = setTimeout(() => {
      cancel = scrambleText(node, { duration })
    }, introDelayMs() + delay)
    return () => {
      clearTimeout(timer)
      cancel?.()
    }
  }, [text, delay, duration])

  return <span ref={ref}>{text}</span>
}

"use client"

import { useRef, type ReactNode } from "react"
import { useInViewClass } from "@/components/fx/use-in-view"

type ServicesStageProps = {
  className?: string
  children: ReactNode
}

/**
 * 事業内容カードの挿絵を載せる舞台(装飾のみ)。
 * 画面に入ると .is-in を付けて登場演出とループを始める。
 * 画面の外にある間のループは、LoopGate が舞台ごとまとめて止める(data-loop-scope)。
 */
export function ServicesStage({ className, children }: ServicesStageProps) {
  const ref = useRef<HTMLDivElement | null>(null)
  useInViewClass(ref, { threshold: 0.35 })

  return (
    <div ref={ref} className={className} aria-hidden="true" data-loop-scope>
      {children}
    </div>
  )
}

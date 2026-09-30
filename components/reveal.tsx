"use client"

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react"
import { useInViewClass } from "@/components/fx/use-in-view"
import { cn, cssVars } from "@/lib/utils"

type InViewProps = {
  as?: ElementType
  className?: string
  /** 要素の何割が見えたら .is-in を付けるか */
  threshold?: number
  style?: CSSProperties
  children: ReactNode
}

/** 画面内に入ったら .is-in を付けるだけの入れ物。中の CSS アニメーション(光の線など)の起点にする */
export function InView({ as: Tag = "div", className, threshold = 0.25, style, children }: InViewProps) {
  const ref = useRef<HTMLElement | null>(null)
  useInViewClass(ref, { threshold })

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  )
}

type RevealProps = Omit<InViewProps, "style"> & {
  /** 表示開始までの遅延(ms)。並んだ要素を順番に出すときに使う */
  delay?: number
}

/** 画面内に入ると、ぼかしを解きながら下から浮かび上がる */
export function Reveal({ className, delay = 0, threshold = 0.15, ...props }: RevealProps) {
  return (
    <InView
      {...props}
      className={cn("reveal", className)}
      threshold={threshold}
      style={delay ? cssVars({ "--reveal-delay": `${delay}ms` }) : undefined}
    />
  )
}

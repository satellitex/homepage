"use client"

import { useRef, type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react"
import { prefersReducedMotion } from "@/components/fx/env"
import { trackPointer } from "@/components/fx/pointer"
import { cn } from "@/lib/utils"

type SpotlightCardProps = {
  as?: ElementType
  className?: string
  /** ポインターに合わせてカードを立体的に傾ける(最大角度, deg)。0 で無効 */
  tilt?: number
  style?: CSSProperties
  children: ReactNode
}

/**
 * ポインターの位置だけ縁と面が光るカード(.spotlight)。
 * 位置は CSS 変数 --mx / --my に直接書き込むので再レンダリングは発生しない。
 */
export function SpotlightCard({ as: Tag = "div", className, tilt = 0, style, children }: SpotlightCardProps) {
  const ref = useRef<HTMLElement | null>(null)

  const handleMove = (event: PointerEvent<HTMLElement>) => {
    const element = ref.current
    const point = trackPointer(event, element)
    if (!element || !point) return
    const { x, y, rect } = point
    if (tilt && !prefersReducedMotion()) {
      const rx = ((y / rect.height) * 2 - 1) * -tilt
      const ry = ((x / rect.width) * 2 - 1) * tilt
      element.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
    }
  }

  const handleLeave = () => {
    const element = ref.current
    if (!element) return
    if (tilt) element.style.transform = ""
  }

  return (
    <Tag
      ref={ref}
      className={cn("spotlight", className)}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </Tag>
  )
}

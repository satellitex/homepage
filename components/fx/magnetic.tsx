"use client"

import { useRef, type PointerEvent, type ReactNode } from "react"
import { prefersReducedMotion } from "@/components/fx/env"
import { cn } from "@/lib/utils"

type MagneticProps = {
  /** 吸い寄せの強さ(0〜1) */
  strength?: number
  className?: string
  children: ReactNode
}

/** カーソルに吸い寄せられるように動く入れ物(ボタン用)。マウス操作時のみ有効 */
export function Magnetic({ strength = 0.25, className, children }: MagneticProps) {
  const ref = useRef<HTMLSpanElement | null>(null)

  const handleMove = (event: PointerEvent<HTMLSpanElement>) => {
    const element = ref.current
    if (!element || event.pointerType !== "mouse" || prefersReducedMotion()) return
    const rect = element.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = ""
  }

  return (
    <span
      ref={ref}
      className={cn("inline-flex transition-transform duration-500 ease-out-expo will-change-transform", className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </span>
  )
}

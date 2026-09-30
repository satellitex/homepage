"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { hasFinePointer, prefersReducedMotion } from "@/components/fx/env"

/** カーソルの後ろをゆっくり追いかける光のにじみ(マウス操作の端末のみ。表示の出し分けは CSS で行う) */
export function CursorGlow() {
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)
  const springX = useSpring(x, { stiffness: 120, damping: 24, mass: 0.6 })
  const springY = useSpring(y, { stiffness: 120, damping: 24, mass: 0.6 })

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return
    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX)
      y.set(event.clientY)
    }
    window.addEventListener("pointermove", handleMove, { passive: true })
    return () => window.removeEventListener("pointermove", handleMove)
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed -left-[280px] -top-[280px] z-[5] hidden h-[560px] w-[560px] rounded-full mix-blend-screen [@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:block"
      style={{
        x: springX,
        y: springY,
        background: "radial-gradient(circle, rgba(0,181,255,0.085) 0%, rgba(99,102,255,0.04) 35%, transparent 65%)",
      }}
    />
  )
}

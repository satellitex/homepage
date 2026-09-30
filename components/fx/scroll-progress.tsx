"use client"

import { motion, useScroll, useSpring } from "motion/react"

/** 画面最上部を走る、読み進めた分だけ伸びる光の線 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-beam shadow-[0_0_12px_rgba(0,181,255,0.8)]"
      style={{ scaleX }}
    />
  )
}

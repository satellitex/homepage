"use client"

import type { ReactNode } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

type Layer = "background" | "headline" | "stats"
type Props = { className?: string; children: ReactNode }

/** スクロール量 [from, to] を出力 [a, b] に写す。動きを減らす設定では a のまま動かさない */
function useScrollRange<T extends number | string>(scrollY: MotionValue<number>, input: [number, number], output: [T, T]) {
  const still = useReducedMotion() === true
  return useTransform(scrollY, input, still ? [output[0], output[0]] : output)
}

function BackgroundLayer({ className, children }: Props) {
  const { scrollY } = useScroll()
  const y = useScrollRange(scrollY, [0, 1000], [0, 260])
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}

function HeadlineLayer({ className, children }: Props) {
  const { scrollY } = useScroll()
  const y = useScrollRange(scrollY, [0, 700], [0, -120])
  const scale = useScrollRange(scrollY, [0, 700], [1, 0.92])
  const opacity = useScrollRange(scrollY, [0, 520], [1, 0])
  const filter = useScrollRange(scrollY, [0, 520], ["blur(0px)", "blur(10px)"])
  return (
    <motion.div className={className} style={{ y, scale, opacity, filter }}>
      {children}
    </motion.div>
  )
}

function StatsLayer({ className, children }: Props) {
  const { scrollY } = useScroll()
  const y = useScrollRange(scrollY, [0, 900], [0, -60])
  const opacity = useScrollRange(scrollY, [250, 850], [1, 0])
  return (
    <motion.div className={className} style={{ y, opacity }}>
      {children}
    </motion.div>
  )
}

const layers = { background: BackgroundLayer, headline: HeadlineLayer, stats: StatsLayer }

/**
 * ヒーローをスクロールで奥行きのある層に分ける。
 * 背景はゆっくり沈み、見出しは縮みながらぼやけて消え、統計は少し遅れて追従する。
 * 動きを減らす設定では、どの層も動かさない。
 */
export function HeroParallax({ layer, ...props }: Props & { layer: Layer }) {
  const Layer = layers[layer]
  return <Layer {...props} />
}

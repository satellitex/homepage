"use client"

import { motion, useTransform, type MotionValue } from "motion/react"
import { clamp01 } from "@/lib/utils"
import styles from "./strengths.module.css"

type StrengthsRailProps = {
  /** 項目全体を読み進めた割合(0〜1) */
  progress: MotionValue<number>
  active: number
  count: number
}

/**
 * 縦の進行ビーム。1px の細い軌道の上を、スクロールに合わせて発光する線が伸び、
 * 先端に明るい光の粒が付く。各項目の位置には小さな節があり、通過すると点灯する。
 */
export function StrengthsRail({ progress, active, count }: StrengthsRailProps) {
  const tipTop = useTransform(progress, (value) => `${(clamp01(value) * 100).toFixed(3)}%`)
  const tipOpacity = useTransform(progress, [0, 0.015, 0.985, 1], [0, 1, 1, 0])

  return (
    <div className={styles.rail} aria-hidden="true">
      <span className={styles.railTrack} />
      <motion.span className={styles.railFill} style={{ scaleY: progress }} />
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.node} data-on={i <= active} style={{ top: `${((2 * i + 1) / (2 * count)) * 100}%` }} />
      ))}
      <motion.span className={styles.railTip} style={{ top: tipTop, opacity: tipOpacity }} />
    </div>
  )
}

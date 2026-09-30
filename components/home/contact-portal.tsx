"use client"

import { useRef, type PointerEvent, type ReactNode } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { trackPointer } from "@/components/fx/pointer"
import { useInViewClass } from "@/components/fx/use-in-view"
import { cn } from "@/lib/utils"
import styles from "./contact-cta.module.css"

/**
 * お問い合わせの「ポータル」。
 * - 画面に入るとスクロールに連動して拡大し、方眼・光球・光の線が点火する
 * - 光球はスクロールでゆっくりずれる(視差)
 * - 縁取りの回転などのループは、画面外にあるものから LoopGate が止める
 * 動きを減らす設定では、CSS 側で transform を無効化して静止した最終状態にする。
 */
export function ContactPortal({ children }: { children: ReactNode }) {
  const portalRef = useRef<HTMLDivElement | null>(null)
  const cursorRef = useRef<HTMLDivElement | null>(null)

  useInViewClass(portalRef, { threshold: 0.2 })

  const { scrollYProgress } = useScroll({ target: portalRef, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
  const orbY = useTransform(scrollYProgress, [0, 1], [-110, 110])

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    trackPointer(event, cursorRef.current)
  }

  return (
    <motion.div ref={portalRef} className={styles.portal} style={{ scale }}>
      <div className={styles.frame}>
        <div className={styles.panel} onPointerMove={handleMove}>
          <div className={styles.bg} aria-hidden="true">
            <div className={cn("grid-bg", styles.grid)} />
            <motion.div className={styles.orbWrap} style={{ y: orbY }}>
              <div className={styles.orbMain} />
              <div className={styles.orbIndigo} />
            </motion.div>
            <div ref={cursorRef} className={styles.cursor} />
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </motion.div>
  )
}

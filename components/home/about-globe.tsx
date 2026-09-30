"use client"

import { useEffect, useRef } from "react"
import { hasFinePointer, prefersReducedMotion } from "@/components/fx/env"
import { createGlobe } from "@/components/home/about-globe-engine"
import styles from "./about-globe.module.css"

/**
 * 会社概要の装飾。点描の地球が東京を中心にゆっくり揺れ、東京から世界へ光の弧が走り、衛星が周回する。
 * 読み上げ対象外の純粋な装飾(テキストなし)。
 * 地球儀はファーストビューの遥か下にあるので、キャンバスが画面の近く(300px 手前)に来てから作る。
 */
export function AboutGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let destroy: (() => void) | null = null
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        destroy = createGlobe(canvas, { reduced: prefersReducedMotion(), pointer: hasFinePointer() })
      },
      { rootMargin: "300px 0px" },
    )
    observer.observe(canvas)
    return () => {
      observer.disconnect()
      destroy?.()
    }
  }, [])

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.glow} />
      <svg className={styles.hud} viewBox="0 0 400 400" fill="none">
        <circle className={styles.dashOuter} cx="200" cy="200" r="197" />
        <circle className={styles.dashInner} cx="200" cy="200" r="181" />
        <g className={styles.ticks}>
          <path d="M200 0v10M200 390v10M0 200h10M390 200h10" />
        </g>
      </svg>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  )
}

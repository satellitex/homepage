"use client"

import type { CSSProperties } from "react"
import styles from "./strengths.module.css"

type StrengthsCounterProps = {
  /** 各項目の番号("01" "02" …) */
  labels: readonly string[]
  active: number
}

/**
 * 巨大なカウンター。数字は縦に並べた帯を上へ滑らせて切り替え、
 * 出ていく数字はぼけながら消え、入る数字はぼけを解きながら現れる。
 * 各項目が自分の番号を持っているので、装飾として読み上げからは外す。
 */
export function StrengthsCounter({ labels, active }: StrengthsCounterProps) {
  const positions = Array.from({ length: Math.max(...labels.map((label) => label.length)) }, (_, pos) =>
    labels.map((label) => label[pos] ?? ""),
  )
  const total = labels[labels.length - 1]

  return (
    <div className={styles.counterRow} aria-hidden="true">
      <span className={styles.counterGlow} />
      <div className={styles.counter} style={{ "--idx": active } as CSSProperties}>
        {positions.map((digits, pos) => {
          const rolls = new Set(digits).size > 1
          return (
            <span key={pos} className={styles.window}>
              {rolls ? (
                <span className={styles.strip}>
                  {digits.map((digit, i) => (
                    <span key={i} className={styles.digit} data-on={i === active}>
                      {digit}
                    </span>
                  ))}
                </span>
              ) : (
                <span className={styles.digit} data-on="true">
                  {digits[0]}
                </span>
              )}
            </span>
          )
        })}
      </div>
      <span className={styles.total}>/ {total}</span>
      {/* 数字が変わるたびに作り直され、光の線が一度だけ走る */}
      <span key={active} className={styles.scan} />
    </div>
  )
}

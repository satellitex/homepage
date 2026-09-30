"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { useScroll, useSpring } from "motion/react"
import { Reveal } from "@/components/reveal"
import { StrengthsCounter } from "./strengths-counter"
import { StrengthsItem } from "./strengths-item"
import { StrengthsRail } from "./strengths-rail"
import styles from "./strengths.module.css"

type Strength = { title: string; body: string }

type StrengthsStoryProps = {
  /** 左カラムの見出し(サーバー側で描画した SectionHeading) */
  heading: ReactNode
  items: readonly Strength[]
}

/**
 * 「選ばれる理由」のスクロール演出の司令塔。
 * ・画面の縦中央を横切っている項目を「いま読んでいる項目」として active に持つ(切り替わるときだけ再描画)
 * ・項目全体を読み進めた割合を、バネで滑らかにした MotionValue として進行ビームに渡す
 * 見た目の切り替え(ピン留め・明暗・点灯)はすべて CSS 側で、メディアクエリで出し分ける。
 */
export function StrengthsStory({ heading, items }: StrengthsStoryProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const labels = items.map((_, index) => String(index + 1).padStart(2, "0"))

  useEffect(() => {
    const list = listRef.current
    if (!list || typeof IntersectionObserver === "undefined") return

    const targets = Array.from(list.querySelectorAll<HTMLElement>("[data-story-item]"))
    // 高さ約1%の帯を画面の縦中央に置き、そこに掛かっている項目を拾う
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const index = targets.indexOf(entry.target as HTMLElement)
          if (index >= 0) setActive(index)
        }
      },
      { rootMargin: "-50% 0px -49% 0px" },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])

  // リスト上端が画面中央に来たら 0、下端が中央に来たら 1
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.5", "end 0.5"] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.7, restDelta: 0.0005 })

  return (
    <div className={styles.story}>
      <div className={styles.aside}>
        <div className={styles.head}>{heading}</div>
        <Reveal className={styles.stage}>
          <StrengthsRail progress={progress} active={active} count={items.length} />
          <StrengthsCounter labels={labels} active={active} />
        </Reveal>
      </div>

      <div ref={listRef} className={styles.list}>
        {items.map((item, index) => (
          <StrengthsItem key={item.title} label={labels[index]} title={item.title} body={item.body} active={index === active} />
        ))}
      </div>
    </div>
  )
}

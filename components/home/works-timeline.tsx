"use client"

import { useCallback, useEffect, useRef, type CSSProperties } from "react"
import { ArrowUpRight } from "lucide-react"
import { useMotionValueEvent, useScroll, useSpring } from "motion/react"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { prefersReducedMotion, useMediaQuery } from "@/components/fx/env"
import { scrambleText } from "@/components/fx/scramble"
import type { Work } from "@/lib/content"
import { clamp01, cn } from "@/lib/utils"
import styles from "./works.module.css"

const SPARKS = [
  { sx: -26, sy: -38, d: "0s" },
  { sx: 24, sy: -26, d: "0.65s" },
  { sx: -12, sy: -66, d: "1.2s" },
] as const

/**
 * 実績タイムライン。
 * スクロールに合わせて光のビームがレールを下へ引かれ、先端(ペン先)がノードに触れた瞬間にノードが点火、
 * カードがノードから咲くように現れる。状態は CSS 変数と data 属性に直接書き込むので、スクロール中に再レンダリングは起きない。
 *   --p        ビームの到達度(0-1) / --h  レールの高さ(px) / --tip-o  先端の不透明度 / --trail  先端の尾の長さ
 *   data-lit   ビームが到達済み(戻ると消える) / data-seen  一度でも到達した(カードは戻っても隠さない)
 *   data-active  いま先端に一番近い(直近に点火した)項目
 *   data-done  ビームが終端に到達(区切り線と脚注が現れる)
 */
export function WorksTimeline({ items }: { items: Work[] }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  const geometry = useRef({ height: 0, nodes: [] as number[] })
  const flags = useRef({ primed: false, done: false, static: false, active: -1, lit: [] as boolean[] })
  const cleanups = useRef<Array<() => void>>([])

  // 狭い画面ではビームを早めに始め、画面下側が空白のまま待たされないようにする
  const narrow = useMediaQuery("(max-width: 767px)")

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: narrow ? ["start 92%", "end 70%"] : ["start 75%", "end 55%"],
  })
  const smooth = useSpring(0, { stiffness: 90, damping: 26, mass: 0.5, restDelta: 0.0005 })

  const apply = useCallback(() => {
    const root = rootRef.current
    const rail = railRef.current
    const list = listRef.current
    if (!root || !rail || !list) return

    const { height, nodes } = geometry.current
    const progress = clamp01(smooth.get())
    const tipY = progress * height
    const speed = Math.abs(smooth.getVelocity()) * height
    const tipOpacity = Math.max(0, Math.min(1, progress / 0.015, (1 - progress) / 0.012))

    rail.style.setProperty("--p", progress.toFixed(4))
    rail.style.setProperty("--tip-o", tipOpacity.toFixed(3))
    // 速く動かすほど先端の尾が伸びる
    rail.style.setProperty("--trail", `${Math.min(220, 44 + speed * 0.1).toFixed(0)}px`)

    const state = flags.current
    let active = -1
    for (let index = 0; index < list.children.length; index++) {
      const item = list.children[index] as HTMLElement
      const lit = tipY >= (nodes[index] ?? Number.POSITIVE_INFINITY) - 3
      if (lit) active = index
      if (lit === Boolean(state.lit[index])) continue
      state.lit[index] = lit
      if (lit) {
        item.setAttribute("data-lit", "")
        if (!item.hasAttribute("data-seen")) {
          item.setAttribute("data-seen", "")
          const period = item.querySelector("[data-period]")?.firstChild
          // 期間の文字は、ビームが届いた瞬間に一度だけ解読演出を入れる
          if (period instanceof Text) cleanups.current.push(scrambleText(period, { duration: 720, head: 0.12, interval: 40 }))
        }
      } else {
        item.removeAttribute("data-lit")
      }
    }
    if (active !== state.active) {
      list.children[state.active]?.removeAttribute("data-active")
      list.children[active]?.setAttribute("data-active", "")
      state.active = active
    }

    if (!state.done && progress >= 0.985) {
      state.done = true
      root.setAttribute("data-done", "")
    }
  }, [smooth])

  // スクロール量 → スプリングで滑らかに追従。最初の一回は現在位置へ即ジャンプして、途中から読み込んだ場合に追いかけ演出をしない
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (flags.current.static) return
    if (!flags.current.primed) {
      flags.current.primed = true
      smooth.jump(value)
      apply()
    } else {
      smooth.set(value)
    }
  })
  useMotionValueEvent(smooth, "change", apply)

  useEffect(() => {
    const root = rootRef.current
    const wrap = wrapRef.current
    const rail = railRef.current
    const list = listRef.current
    if (!root || !wrap || !rail || !list) return

    // 動きを減らす設定: ビームは最後まで描かれ、すべて点灯した状態で静止する
    if (prefersReducedMotion()) {
      flags.current.static = true
      for (const item of Array.from(list.children)) {
        item.setAttribute("data-lit", "")
        item.setAttribute("data-seen", "")
      }
      root.setAttribute("data-done", "")
      return
    }

    const measure = () => {
      const items = Array.from(list.children) as HTMLElement[]
      geometry.current = {
        height: wrap.offsetHeight,
        nodes: items.map((item) => {
          const node = item.querySelector<HTMLElement>("[data-node]")
          return item.offsetTop + (node?.offsetTop ?? 0)
        }),
      }
      rail.style.setProperty("--h", `${wrap.offsetHeight}px`)
      apply()
    }

    // キーボードフォーカスが入った項目は、ビームの到達を待たずに「見た」ことにしてカードを出したままにする(blur 後も隠さない)
    const onFocusIn = (event: FocusEvent) => {
      const li = (event.target as Element | null)?.closest("li")
      if (li && !li.hasAttribute("data-seen")) li.setAttribute("data-seen", "")
    }
    list.addEventListener("focusin", onFocusIn)

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrap)
    void document.fonts?.ready.then(measure)
    const pending = cleanups.current
    return () => {
      list.removeEventListener("focusin", onFocusIn)
      observer.disconnect()
      for (const cleanup of pending.splice(0)) cleanup()
    }
  }, [apply])

  return (
    <div ref={rootRef} className={cn(styles.root, "max-w-[64rem]")}>
      <div ref={wrapRef} className={styles.wrap}>
        {/* 装飾: レール(トラック + ビーム + 先端の光) */}
        <div ref={railRef} className={styles.rail} aria-hidden="true">
          <span className={styles.track} />
          <span className={styles.beam} />
          <span className={styles.tip}>
            <span className={styles.trail} />
            {SPARKS.map((spark) => (
              <span
                key={spark.d}
                className={styles.spark}
                style={{ "--sx": `${spark.sx}px`, "--sy": `${spark.sy}px`, "--d": spark.d } as CSSProperties}
              />
            ))}
            <span className={styles.tipGlow} />
            <span className={styles.tipDot} />
          </span>
        </div>

        <ol ref={listRef} role="list" className={styles.list}>
          {items.map((work) => (
            <li key={work.title} className={styles.item}>
              <span className={styles.connector} aria-hidden="true" />
              <span data-node className={styles.node} aria-hidden="true">
                <span className={styles.nodeHalo} />
                <span className={styles.nodeRing} />
                <span className={styles.nodeRing} />
                <span className={styles.nodeCore} />
              </span>

              <div className={styles.periodCol}>
                <p
                  data-period
                  className={cn(styles.period, "font-mono text-[0.95rem] tracking-tight md:text-xl lg:text-[1.6rem]")}
                >
                  {work.period}
                </p>
              </div>

              <div className={styles.cardCol}>
                <div className={styles.cardX}>
                  <SpotlightCard className={cn(styles.card, "p-6 sm:p-8")}>
                    <span className={styles.sweepClip} aria-hidden="true">
                      <span className={styles.sweep} />
                    </span>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
                      <h3 className="text-balance text-xl font-bold leading-snug tracking-tight text-fg [word-break:auto-phrase] sm:text-2xl">
                        {work.title}
                      </h3>
                      <span className={cn("chip", styles.role)}>{work.role}</span>
                    </div>
                    <p className="mt-4 text-pretty text-[0.95rem] leading-[1.9] text-fg-muted [word-break:auto-phrase] sm:text-base">
                      {work.detail}
                    </p>
                    {work.link ? (
                      <a
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="nav-underline group/link mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-beam-sky transition-colors duration-300 hover:text-fg"
                      >
                        {work.linkLabel}
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}
                  </SpotlightCard>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {/* 装飾: レールの終端で光が折れて右へ走る区切り線 */}
        <div className={styles.divider} aria-hidden="true" />
      </div>

      <div className={styles.footnote}>
        <p className="max-w-[40rem] text-sm leading-[1.9] text-fg-muted sm:text-[0.95rem]">
          このほか、複数のブロックチェーンスタートアップにてアドバイザー・開発支援を行っています。
        </p>
      </div>
    </div>
  )
}

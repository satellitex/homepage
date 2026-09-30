"use client"

import { memo, useEffect, useRef } from "react"
import { useScroll } from "motion/react"
import { matches } from "@/components/fx/env"
import { Reveal } from "@/components/reveal"
import { cssVars } from "@/lib/utils"
import styles from "./strengths.module.css"

/** --p の唯一の読み手(.ch)は story モード(lg 以上かつ動きを減らさない)にしかないので、それ以外では書き込まない */
const STORY_MODE = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)"

type StrengthsItemProps = {
  label: string
  title: string
  body: string
  /** いま画面の縦中央にある項目か(story モードの明暗にだけ使う) */
  active: boolean
}

/**
 * 本文を1文字ずつの span に分ける。文字は本物のテキストのまま DOM に残る。
 * 各文字は --i(通し番号)だけを持ち、点灯の計算は CSS(.ch)が段落の --p から行う。
 */
const Chars = memo(function Chars({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((char, i) => (
        <span key={i} className={styles.ch} style={cssVars({ "--i": i })}>
          {char}
        </span>
      ))}
    </>
  )
})

/**
 * 「選ばれる理由」の1項目。
 * モバイル/タブレットではガラスのカード(Reveal で出現)、lg 以上では縦に流れる物語の1場面になる。
 * 本文の段落がビューポートを横切る進み具合を --p に書き込むだけで、React の再描画は起こさない。
 */
export const StrengthsItem = memo(function StrengthsItem({ label, title, body, active }: StrengthsItemProps) {
  const bodyRef = useRef<HTMLParagraphElement>(null)

  // 段落の上端が画面の 88% に入ったら点灯を始め、下端が 64% に達したら全文が点いている
  const { scrollYProgress } = useScroll({ target: bodyRef, offset: ["start 0.88", "end 0.64"] })

  useEffect(() => {
    const write = (value: number) => {
      if (matches(STORY_MODE)) bodyRef.current?.style.setProperty("--p", value.toFixed(4))
    }
    // 再読み込み直後など、スクロール済みの位置から始まった場合の初期値も書く
    write(scrollYProgress.get())
    return scrollYProgress.on("change", write)
  }, [scrollYProgress])

  return (
    <Reveal className={styles.wrap}>
      <div className={styles.item} data-story-item="" data-active={active}>
        <div className={styles.inner}>
          <span className={styles.edge} aria-hidden="true">
            <span className={styles.edgeGlow} />
            <span className={styles.edgeSpark} />
          </span>
          <p className={styles.no}>{label}</p>
          <h3 className={styles.title}>{title}</h3>
          <p ref={bodyRef} className={styles.body} style={cssVars({ "--n": Array.from(body).length })}>
            <Chars text={body} />
          </p>
        </div>
      </div>
    </Reveal>
  )
})

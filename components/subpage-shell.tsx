import type { ReactNode } from "react"
import Link from "next/link"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { SplitText } from "@/components/fx/split-text"
import { Eyebrow } from "@/components/home/section-heading"
import { Reveal } from "@/components/reveal"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { cn, cssVars } from "@/lib/utils"
import styles from "./subpage-shell.module.css"

type SubpageShellProps = {
  label: string
  title: string
  /** 本文の最大幅(ヘッダーも同じ幅にそろえる) */
  width?: "narrow" | "wide"
  children: ReactNode
}

/**
 * 規約・ポリシーの本文を収めるガラスのパネル。
 * 左に光の縦線が引かれ、段落ごとに光の点が灯る(子は <p> を並べる)。
 */
export function LegalPanel({ children }: { children: ReactNode }) {
  return (
    <SpotlightCard className="p-6 backdrop-blur-[14px] sm:p-10">
      <span className="top-glow inset-x-10 opacity-60" aria-hidden="true" />
      <div className={cn(styles.legal, "space-y-7 text-[0.95rem] leading-[1.9] text-fg-muted [word-break:auto-phrase] sm:text-base")}>
        {children}
      </div>
    </SpotlightCard>
  )
}

/**
 * お問い合わせ・プライバシーポリシー・利用規約の共通の枠。
 * 上部に光のオーロラを敷き、見出しは1文字ずつ立ち上がって、その下線が画面の端まで伸びる光の地平線になる。
 */
export function SubpageShell({ label, title, width = "narrow", children }: SubpageShellProps) {
  const widthClass = width === "wide" ? "max-w-5xl" : "max-w-4xl"
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <SiteHeader className={widthClass} />

      {/* 背景: 青と藍のオーロラ + 中心から消える方眼 */}
      <div className={styles.aurora} aria-hidden="true">
        <div className={cn(styles.blob, styles.blobAzure)} />
        <div className={cn(styles.blob, styles.blobIndigo)} />
        <div className={cn(styles.blob, styles.blobBlue)} />
        <div className="grid-bg absolute inset-0 opacity-80" />
      </div>

      <main className={cn("container relative pb-20 pt-20 sm:pb-28 sm:pt-28", widthClass)}>
        <Eyebrow>{label}</Eyebrow>

        <SplitText
          as="h1"
          className={cn(
            styles.title,
            "sheen-chars mt-6 text-[clamp(2.1rem,6.4vw,4.25rem)] font-black leading-[1.15] tracking-[-0.03em]",
          )}
          stagger={50}
          delay={100}
        >
          <span className="beam-underline" style={cssVars({ "--beam-delay": "0.5s" })}>
            {title}
          </span>
        </SplitText>

        {/* 背の高い本文(フォームなど)でも隠れたままにならないよう、少しでも見えたら出す */}
        <Reveal className="mt-12 sm:mt-16" delay={260} threshold={0.01}>
          {children}
        </Reveal>

        <Reveal className="mt-14 sm:mt-16">
          <Link href="/" className="btn-ghost group px-5 py-2.5 text-sm">
            <span
              className="inline-block text-beam-sky transition-transform duration-500 ease-out-expo group-hover:-translate-x-1"
              aria-hidden="true"
            >
              ←
            </span>{" "}
            トップページへ戻る
          </Link>
        </Reveal>
      </main>

      <SiteFooter />
    </div>
  )
}

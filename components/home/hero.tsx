import Link from "next/link"
import { ArrowDown, ArrowRight } from "lucide-react"
import { HeroCanvas } from "@/components/fx/hero-canvas"
import { Magnetic } from "@/components/fx/magnetic"
import { ScrambleText } from "@/components/fx/scramble-text"
import { SplitText } from "@/components/fx/split-text"
import { HeroParallax } from "@/components/home/hero-parallax"
import { heroStats } from "@/lib/content"
import { cssVars } from "@/lib/utils"

const delay = (ms: number) => cssVars({ "--rise-delay": `${ms}ms` })

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* 背景: WebGL の光の地平線(読み込み前・非対応環境ではにじんだ光だけを表示) */}
      <HeroParallax layer="background" className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_62%,rgba(0,87,217,0.28),transparent_70%)]"
          aria-hidden="true"
        />
        <HeroCanvas />
      </HeroParallax>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent to-bg"
        aria-hidden="true"
      />

      <p
        className="vertical-label rise-load pointer-events-none absolute right-8 top-1/3 hidden text-xs text-fg-dim xl:block"
        style={delay(1300)}
        aria-hidden="true"
      >
        構想から実装まで、一気通貫。
      </p>

      <div className="container relative flex flex-1 flex-col items-center justify-center pb-10 pt-28 text-center sm:pt-32">
        <HeroParallax layer="headline" className="flex w-full flex-col items-center">
          <div className="border-spin rise-load" style={delay(0)}>
            <p className="border-spin-inner flex items-center gap-2.5 px-4 py-2 font-mono text-[0.6rem] tracking-[0.16em] text-fg/85 sm:gap-3 sm:text-[0.7rem] sm:tracking-[0.28em]">
              <span className="pulse-dot shrink-0" aria-hidden="true" />
              <ScrambleText text="IT CONSULTING & BLOCKCHAIN DEVELOPMENT" delay={100} duration={1300} />
            </p>
          </div>

          <SplitText
            as="h1"
            id="hero-title"
            trigger="load"
            stagger={55}
            delay={120}
            className="sheen-chars mt-8 text-balance text-[clamp(2.5rem,8.6vw,6.5rem)] font-black leading-[1.12] tracking-[-0.035em] sm:mt-9"
          >
            事業を貫く、
            <br />
            <span
              data-split="none"
              className="beam-underline beam-underline-load"
              style={cssVars({ "--beam-delay": "0.85s" })}
            >
              <span className="text-gradient text-gradient-animate">一本の線</span>
            </span>
            を引く。
          </SplitText>

          <p
            className="rise-lead mx-auto mt-9 max-w-[46rem] text-pretty text-[0.95rem] leading-[1.9] text-fg-soft sm:text-lg"
            style={delay(750)}
          >
            PUBLIC下線合同会社は、ITコンサルティングとブロックチェーン開発の専門ファームです。
            構想から設計・実装・運用まで、戦略と技術をひと続きの線で結び、
            大企業からスタートアップまでの事業を支援します。
          </p>

          <div className="rise-load mt-9 flex flex-wrap items-center justify-center gap-3" style={delay(900)}>
            <Magnetic>
              <Link href="/contact" className="btn-primary group">
                プロジェクトの相談をする
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
            <Magnetic>
              <a href="#services" className="btn-ghost group">
                事業内容を見る
                <ArrowDown
                  className="h-4 w-4 text-beam-sky transition-transform duration-300 group-hover:translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Magnetic>
          </div>
        </HeroParallax>

        {/* 光の地平線はこの余白の中央を通る(HeroCanvas が位置を読む) */}
        <div data-hero-horizon className="h-20 w-full shrink-0 sm:h-28" aria-hidden="true" />

        <HeroParallax layer="stats" className="w-full max-w-5xl">
          <dl className="rise-load grid grid-cols-2 gap-3 lg:grid-cols-4" style={delay(1100)}>
            {heroStats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass group relative flex flex-col overflow-hidden rounded-2xl p-5 text-left transition-colors duration-500 hover:border-[rgba(0,181,255,0.35)] sm:p-6"
              >
                <span
                  className="top-glow inset-x-5 opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <dt className="order-last mt-2 text-xs leading-relaxed text-fg-soft">{stat.label}</dt>
                <dd className="text-[1.9rem] font-bold tabular-nums tracking-tight text-fg sm:text-4xl">
                  <ScrambleText text={stat.value} delay={1150 + index * 140} duration={1000} />
                </dd>
              </div>
            ))}
          </dl>
        </HeroParallax>
      </div>

      <div
        className="rise-load pointer-events-none absolute inset-x-0 bottom-5 mx-auto hidden h-12 w-px overflow-hidden bg-hairline-strong sm:block lg:hidden"
        style={delay(1600)}
        aria-hidden="true"
      >
        <span className="absolute left-0 top-0 h-3 w-px animate-[scroll-dot_2.2s_ease-in-out_infinite] bg-beam-azure shadow-[0_0_8px_var(--beam-azure)]" />
      </div>
    </section>
  )
}

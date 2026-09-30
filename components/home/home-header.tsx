"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion, type TargetAndTransition, type Transition } from "motion/react"
import { ArrowRight } from "lucide-react"
import { glassPill, SiteLogo } from "@/components/site-header"
import { useMediaQuery } from "@/components/fx/env"
import { setScrollLocked } from "@/components/fx/smooth-scroll"
import { navItems } from "@/lib/content"
import { cn } from "@/lib/utils"

const EASE = [0.16, 1, 0.3, 1] as const
const INSTANT: Transition = { duration: 0 }

/** メニューの出入りの動き。動きを減らす設定では一瞬で切り替える */
function menuMotion(still: boolean, from: TargetAndTransition, exit: TargetAndTransition, transition: Transition) {
  return still
    ? { initial: false as const, exit: { opacity: 0, transition: INSTANT }, transition: INSTANT }
    : { initial: from, exit, transition }
}

/**
 * トップページのヘッダー。スクロールすると画面幅いっぱいの帯から、浮かぶガラスのピルへ変形する。
 * ナビはホバー位置へハイライトが滑り、閲覧中のセクションには光の下線が付く。
 */
export function HomeHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [hovered, setHovered] = useState<string | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement | null>(null)
  const toggleRef = useRef<HTMLButtonElement | null>(null)
  const still = useReducedMotion() === true

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 画面中央付近にあるセクションをナビで強調する
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = `#${entry.target.id}`
          // 帯から出たセクションの強調は外す(お問い合わせ・フッターでは何も強調しない)
          if (entry.isIntersecting) setActive(id)
          else setActive((current) => (current === id ? null : current))
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // メニュー表示中は背面のスクロールとフォーカスを止める
  useEffect(() => {
    if (!open) return
    setScrollLocked(true)
    const header = headerRef.current
    const others = Array.from(header?.parentElement?.children ?? []).filter(
      (element) => element !== header && element.tagName !== "SCRIPT",
    )
    others.forEach((element) => element.setAttribute("inert", ""))
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      setScrollLocked(false)
      others.forEach((element) => element.removeAttribute("inert"))
      window.removeEventListener("keydown", handleKey)
    }
  }, [open])

  // デスクトップ幅になったらメニューを閉じる(画面の回転などで閉じるボタンが消えるため)
  const desktop = useMediaQuery("(min-width: 1024px)")
  useEffect(() => {
    if (desktop) setOpen(false)
  }, [desktop])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "relative z-10 mx-auto flex items-center justify-between gap-4 rounded-full border transition-[max-width,background-color,border-color,padding,box-shadow] duration-700 ease-out-expo",
          scrolled || open
            ? cn("max-w-5xl py-2 pl-3 pr-2", glassPill)
            : "max-w-7xl border-transparent bg-transparent py-3 pl-2 pr-1 sm:pl-3 sm:pr-2",
        )}
      >
        <SiteLogo onClick={() => setOpen(false)} />

        <nav
          className="hidden items-center lg:flex"
          aria-label="メインナビゲーション"
          onMouseLeave={() => setHovered(null)}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onMouseEnter={() => setHovered(item.href)}
              onFocus={() => setHovered(item.href)}
              onBlur={() => setHovered(null)}
              className={cn(
                "relative px-3.5 py-2 text-[0.85rem] transition-colors duration-300",
                active === item.href ? "text-fg" : "text-fg-muted hover:text-fg",
              )}
            >
              {hovered === item.href ? (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-full bg-white/[0.07]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  aria-hidden="true"
                />
              ) : null}
              {active === item.href ? (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3.5 -bottom-0.5 h-px bg-beam shadow-[0_0_10px_rgba(0,181,255,0.9)]"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  aria-hidden="true"
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Link
            href="/contact"
            className="btn-primary group gap-1.5 whitespace-nowrap px-4 py-2.5 text-[0.78rem] sm:px-5 sm:text-[0.82rem]"
          >
            お問い合わせ
            <ArrowRight
              className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:block"
              aria-hidden="true"
            />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-hairline-strong bg-white/[0.04] lg:hidden"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo",
                open ? "rotate-45" : "-translate-y-[3px]",
              )}
            />
            <span
              className={cn(
                "absolute h-px w-4 bg-fg transition-transform duration-500 ease-out-expo",
                open ? "-rotate-45" : "translate-y-[3px]",
              )}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            className="fixed inset-0 z-0 flex flex-col overflow-y-auto overscroll-contain bg-[rgba(5,7,12,0.94)] px-6 pb-10 pt-28 backdrop-blur-2xl lg:hidden [@media(max-height:500px)]:pt-20"
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            {...menuMotion(still, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 100% 0)" }, { duration: 0.7, ease: EASE })}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <nav className="relative flex flex-col" aria-label="モバイルナビゲーション">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-hairline py-4 [@media(max-height:500px)]:py-2.5"
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  {...menuMotion(
                    still,
                    { opacity: 0, y: 28, filter: "blur(8px)" },
                    { opacity: 0, y: -12, filter: "blur(6px)", transition: { duration: 0.25 } },
                    { duration: 0.8, ease: EASE, delay: 0.15 + index * 0.05 },
                  )}
                >
                  <span className="font-mono text-xs text-beam-sky" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-3xl font-bold tracking-tight text-fg">{item.label}</span>
                </motion.a>
              ))}
            </nav>
            <motion.div
              className="relative mt-auto pt-8"
              animate={{ opacity: 1, y: 0 }}
              {...menuMotion(still, { opacity: 0, y: 20 }, { opacity: 0 }, { duration: 0.8, ease: EASE, delay: 0.5 })}
            >
              <Link href="/contact" className="btn-primary w-full" onClick={() => setOpen(false)}>
                お問い合わせ
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { prefersReducedMotion } from "@/components/fx/env"

let instance: Lenis | null = null
let locked = false
let onUnlock: Array<() => void> = []

/** スクロールを一時的に止める/再開する(モバイルメニューを開いている間など) */
export function setScrollLocked(value: boolean) {
  locked = value
  if (instance) {
    if (value) instance.stop()
    else instance.start()
  }
  document.documentElement.style.overflow = value ? "hidden" : ""
  if (!value) {
    const callbacks = onUnlock
    onUnlock = []
    callbacks.forEach((callback) => callback())
  }
}

/** スクロールの一時停止が解けてから実行する(止まっていなければすぐ実行) */
function whenScrollUnlocked(callback: () => void) {
  if (locked) onUnlock.push(callback)
  else callback()
}

/** ページ内リンクの移動先へフォーカスを移す(キーボード操作で続きから辿れるように) */
function focusTarget(target: HTMLElement) {
  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1")
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true })
  }
  target.focus({ preventScroll: true })
}

/**
 * 慣性のあるスムーススクロール(Lenis)。ページ内リンク(#services など)も滑らかに移動する。
 * 動きを減らす設定のときは通常のスクロールのまま。
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      smoothWheel: true,
      // 慣性スクロール中に別ページへ移動しても、移動先を最下部まで流さない
      stopInertiaOnNavigate: true,
    })
    instance = lenis

    // ページ内リンクはブラウザの瞬間移動を止めて、Lenis で滑らかに運ぶ。
    // 着地位置は html の scroll-padding-top(固定ヘッダーの高さ)を Lenis が差し引いて決める
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return
      }
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null
      if (!link || (link.target && link.target !== "_self")) return
      const url = new URL(link.href)
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (!target) return

      event.preventDefault()
      if (url.hash !== window.location.hash) window.history.pushState(null, "", url.hash)
      // モバイルメニューのリンクなら、メニューが閉じてスクロールが再開してから動かす
      whenScrollUnlocked(() => lenis.scrollTo(target, { duration: 1.4, onComplete: () => focusTarget(target) }))
    }
    document.addEventListener("click", handleClick)

    // ブラウザの戻る/進むでも慣性を止める(メニュー表示中などで止めてある場合はそのまま)
    const handlePopState = () => {
      if (locked) return
      lenis.stop()
      lenis.start()
    }
    window.addEventListener("popstate", handlePopState)

    return () => {
      document.removeEventListener("click", handleClick)
      window.removeEventListener("popstate", handlePopState)
      lenis.destroy()
      instance = null
    }
  }, [])

  return null
}

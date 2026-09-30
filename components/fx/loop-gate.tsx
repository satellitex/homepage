"use client"

import { useEffect } from "react"

/**
 * 画面外にある装飾ループ(無限に繰り返す CSS アニメーション)を一時停止させる。
 * ループしている要素に data-loop-gated を付け、画面の近くにあるものだけ data-live にする。
 * data-loop-scope を付けた入れ物の中のループは、入れ物ごと 1 つとして扱う(挿絵など、ループする部品が多いもの)。
 * 止める規則は app/globals.css の [data-loop-gated]:not([data-live])。
 */
export function LoopGate() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined" || typeof document.getAnimations !== "function") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-live", entry.isIntersecting)
      },
      { rootMargin: "120px 0px" },
    )
    const gated = new Set<Element>()

    const gate = (animation: Animation) => {
      if (typeof CSSAnimation === "undefined" || !(animation instanceof CSSAnimation)) return
      const effect = animation.effect as KeyframeEffect | null
      const target = effect?.target
      if (!target || effect.getTiming().iterations !== Infinity) return
      const host = target.closest("[data-loop-scope]") ?? target
      if (gated.has(host)) return
      gated.add(host)
      host.setAttribute("data-loop-gated", "")
      observer.observe(host)
    }

    // 読み込み時点で動いているループと、あとから始まるループ(画面に入って .is-in が付いたときなど)
    document.getAnimations().forEach(gate)
    const handleStart = (event: AnimationEvent) => {
      const target = event.target as Element
      for (const animation of target.getAnimations({ subtree: true })) {
        if ((animation.effect as KeyframeEffect | null)?.target === target) gate(animation)
      }
    }
    document.addEventListener("animationstart", handleStart)

    return () => {
      document.removeEventListener("animationstart", handleStart)
      observer.disconnect()
      for (const element of gated) {
        element.removeAttribute("data-loop-gated")
        element.removeAttribute("data-live")
      }
    }
  }, [])

  return null
}

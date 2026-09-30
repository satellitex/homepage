"use client"

import { useEffect, useState } from "react"

// 同じメディアクエリを何度も解析しないよう、MediaQueryList を使い回す
const queries = new Map<string, MediaQueryList>()

function mediaQuery(query: string) {
  let list = queries.get(query)
  if (!list) {
    list = window.matchMedia(query)
    queries.set(query, list)
  }
  return list
}

/** メディアクエリに今一致しているか(クライアントでのみ有効。サーバーでは false) */
export function matches(query: string) {
  return typeof window !== "undefined" && mediaQuery(query).matches
}

/** 動きを減らす設定かどうか */
export function prefersReducedMotion() {
  return matches("(prefers-reduced-motion: reduce)")
}

/** マウスなど精密なポインターを持つ端末かどうか */
export function hasFinePointer() {
  return matches("(hover: hover) and (pointer: fine)")
}

/** メディアクエリの一致状態を追いかける(サーバー描画と最初の描画では false) */
export function useMediaQuery(query: string) {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const list = mediaQuery(query)
    const update = () => setValue(list.matches)
    update()
    list.addEventListener("change", update)
    return () => list.removeEventListener("change", update)
  }, [query])
  return value
}

/** CSS 変数 --intro-delay(イントロ演出の長さ)をミリ秒で読む */
export function introDelayMs() {
  const raw = getComputedStyle(document.documentElement).getPropertyValue("--intro-delay").trim()
  const value = parseFloat(raw)
  if (Number.isNaN(value)) return 0
  return raw.endsWith("ms") ? value : value * 1000
}

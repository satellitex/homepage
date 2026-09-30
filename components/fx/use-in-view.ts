"use client"

import { useEffect, type RefObject } from "react"

type InViewOptions = {
  /** 要素の何割が見えたら発火するか */
  threshold?: number
  rootMargin?: string
}

// 同じ条件(threshold と rootMargin)の要素は 1 つの IntersectionObserver にまとめて監視する
const observers = new Map<string, { observer: IntersectionObserver; callbacks: Map<Element, () => void> }>()

function observeOnce(element: Element, threshold: number, rootMargin: string, onEnter: () => void) {
  const key = `${threshold}|${rootMargin}`
  let entry = observers.get(key)
  if (!entry) {
    const callbacks = new Map<Element, () => void>()
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) {
          if (!record.isIntersecting) continue
          callbacks.get(record.target)?.()
          callbacks.delete(record.target)
          observer.unobserve(record.target)
        }
      },
      { threshold, rootMargin },
    )
    entry = { observer, callbacks }
    observers.set(key, entry)
  }
  const { observer, callbacks } = entry
  callbacks.set(element, onEnter)
  observer.observe(element)
  return () => {
    callbacks.delete(element)
    observer.unobserve(element)
  }
}

/**
 * 要素が画面内に入ったら一度だけ .is-in を付ける。
 * アニメーション自体は CSS 側(.reveal / .split-inview / .is-in 配下)で定義する。
 */
export function useInViewClass(
  ref: RefObject<Element | null>,
  { threshold = 0.2, rootMargin = "0px 0px -8% 0px" }: InViewOptions = {},
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === "undefined") {
      element.classList.add("is-in")
      return
    }
    return observeOnce(element, threshold, rootMargin, () => element.classList.add("is-in"))
  }, [ref, threshold, rootMargin])
}

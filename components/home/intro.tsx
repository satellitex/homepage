"use client"

import { useLayoutEffect, useState } from "react"

function readSeen() {
  try {
    return sessionStorage.getItem("intro-seen") === "1"
  } catch {
    return false
  }
}

/**
 * 初回訪問時のイントロ演出。ロゴの下線が画面いっぱいの光の線になり、その線で画面が上下に開く。
 * 動きは CSS(.intro)だけで完結する。同じセッションで再読み込みしたときは描画前スクリプトが、
 * ページ内遷移で戻ってきたときはここで、描画前に .intro-seen を付けて演出を省く。
 */
export function Intro() {
  // 最初の描画の時点で「このセッションで既に見たか」を読む(StrictMode の再実行でも同じ値になる)
  const [seenBefore] = useState(readSeen)

  useLayoutEffect(() => {
    if (seenBefore) {
      document.documentElement.classList.add("intro-seen")
      return
    }
    try {
      sessionStorage.setItem("intro-seen", "1")
    } catch {
      // ストレージが使えない環境では再読み込みのたびに再生するだけ
    }
  }, [seenBefore])

  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-panel intro-panel-top" />
      <div className="intro-panel intro-panel-bottom" />
      <p className="intro-logo">
        PUBLIC<span className="text-gradient">下線</span>
      </p>
      <div className="intro-beam" />
    </div>
  )
}

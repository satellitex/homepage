const DIGITS = "0123456789"
const LATIN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const KANJI = "線下公共構想実装運用戦略技術事業設計開発連鎖"

function glyphFor(ch: string) {
  const pool = /[0-9]/.test(ch) ? DIGITS : /[A-Za-z]/.test(ch) ? LATIN : /[぀-ヿ一-鿿]/.test(ch) ? KANJI : null
  if (!pool) return ch
  return pool[Math.floor(Math.random() * pool.length)]
}

type ScrambleOptions = {
  /** 解読し終わるまでの時間(ms) */
  duration?: number
  /** 最初の文字が確定するまでの割合(0〜1)。以降は左から順に確定する */
  head?: number
  /** 文字を入れ替える間隔(ms) */
  interval?: number
}

/**
 * テキストノードの文字を、ランダムな文字から左順に本来の文字へ「解読」する。
 * React が保持するテキストノードの値だけを書き換えるので再レンダリングは起きない。
 * 解読中は乱れた文字が支援技術に読まれないよう、親要素を aria-hidden にして、
 * 本来の文字を持つ sr-only の兄弟要素を一時的に置く。戻り値で中断でき、そのときも本来の文字に戻す。
 */
export function scrambleText(node: Text, { duration = 1100, head = 0.25, interval = 45 }: ScrambleOptions = {}) {
  const text = node.nodeValue ?? ""
  const chars = Array.from(text)
  const parent = node.parentElement
  let twin: HTMLSpanElement | null = null
  if (parent) {
    parent.setAttribute("aria-hidden", "true")
    twin = document.createElement("span")
    twin.className = "sr-only"
    twin.textContent = text
    parent.after(twin)
  }
  const restore = () => {
    node.nodeValue = text
    parent?.removeAttribute("aria-hidden")
    twin?.remove()
    twin = null
  }

  const start = performance.now()
  let frame = 0
  let last = 0
  const tick = (now: number) => {
    const progress = Math.min(1, (now - start) / duration)
    if (progress === 1) {
      restore()
      return
    }
    if (now - last > interval) {
      last = now
      node.nodeValue = chars
        .map((ch, index) => (progress >= head + (index / chars.length) * (1 - head) ? ch : glyphFor(ch)))
        .join("")
    }
    frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)

  return () => {
    cancelAnimationFrame(frame)
    restore()
  }
}

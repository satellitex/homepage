type PointerLike = { pointerType: string; clientX: number; clientY: number }

/**
 * マウスの位置を、光を描く要素自身の座標で CSS 変数 --mx / --my に書き込む。
 * (--mx / --my は継承しない登録済みプロパティなので、読む要素に直接書く)
 * タッチ操作では何もしない。書き込んだ座標と要素の矩形を返す。
 */
export function trackPointer(event: PointerLike, target: HTMLElement | null) {
  if (!target || event.pointerType !== "mouse") return null
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  target.style.setProperty("--mx", `${x}px`)
  target.style.setProperty("--my", `${y}px`)
  return { x, y, rect }
}

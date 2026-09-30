"use client"

import {
  cloneElement,
  isValidElement,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react"
import { cn } from "@/lib/utils"
import { useInViewClass } from "@/components/fx/use-in-view"

type Counter = { i: number }
type ElementProps = { children?: ReactNode; className?: string; style?: CSSProperties; "data-split"?: string }

// 英数字の単語はひとかたまりに、和文は1文字ずつ。句読点・括弧は前後の文字とくっつけて行頭・行末禁則を守る
const TOKEN = /[A-Za-z0-9@&.\-_'’/]+|\s+|[（「『]*[\s\S][、。，．）」』！？]*/gu

function charSpan(ch: string, counter: Counter, key: string | number) {
  return (
    <span key={key} className="split-char" style={{ "--i": counter.i++ } as CSSProperties}>
      {ch}
    </span>
  )
}

function splitString(text: string, counter: Counter, keyPrefix: string): ReactNode[] {
  const tokens = text.match(TOKEN) ?? []
  return tokens.map((token, t) => {
    if (/^\s+$/.test(token)) return " "
    const chars = Array.from(token)
    if (chars.length === 1) return charSpan(token, counter, `${keyPrefix}-${t}`)
    return (
      <span key={`${keyPrefix}-${t}`} className="split-word">
        {chars.map((ch, c) => charSpan(ch, counter, c))}
      </span>
    )
  })
}

function splitNode(node: ReactNode, counter: Counter, key: string): ReactNode {
  if (node === null || node === undefined || typeof node === "boolean") return node
  if (typeof node === "string" || typeof node === "number") return splitString(String(node), counter, key)
  if (Array.isArray(node)) return node.map((child, index) => splitNode(child, counter, `${key}.${index}`))
  if (isValidElement(node)) {
    const element = node as ReactElement<ElementProps>
    if (element.type === "br") return cloneElement(element, { key })
    // data-split="none" の要素は分割せず、ひとかたまりで立ち上げる(グラデーション文字など)
    if (element.props["data-split"] === "none") {
      return cloneElement(element, {
        key,
        className: cn(element.props.className, "split-unit"),
        style: { ...element.props.style, "--i": counter.i++ } as CSSProperties,
      })
    }
    return cloneElement(element, { key }, splitNode(element.props.children, counter, key))
  }
  return node
}

function textOf(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isValidElement(node)) {
    const element = node as ReactElement<ElementProps>
    if (element.type === "br") return ""
    return textOf(element.props.children)
  }
  return ""
}

type SplitTextProps = {
  as?: ElementType
  className?: string
  /** load: ページ読み込み時(イントロ後)に再生 / inview: 画面内に入ったら再生 */
  trigger?: "load" | "inview"
  /** 1文字ごとの遅延(ms) */
  stagger?: number
  /** 全体の開始遅延(ms) */
  delay?: number
  id?: string
  children: ReactNode
}

/**
 * 文字を1文字ずつ分割し、ぼかしを解きながら順番に立ち上げる。
 * 見出しでは aria-label に元の文を入れ、分割した文字は読み上げ対象から外す。
 */
export function SplitText({
  as: Tag = "span",
  className,
  trigger = "inview",
  stagger,
  delay,
  id,
  children,
}: SplitTextProps) {
  const ref = useRef<HTMLElement | null>(null)
  useInViewClass(ref, { threshold: 0.3, rootMargin: "0px 0px -5% 0px" })

  const content = splitNode(children, { i: 0 }, "s")
  const isHeading = typeof Tag === "string" && /^h[1-6]$/.test(Tag)
  const style = {
    ...(stagger !== undefined ? { "--split-stagger": `${stagger}ms` } : null),
    ...(delay !== undefined ? { "--split-delay": `${delay}ms` } : null),
  } as CSSProperties

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn(trigger === "load" ? "split-load" : "split-inview", className)}
      style={style}
      aria-label={isHeading ? textOf(children) : undefined}
    >
      {isHeading ? <span aria-hidden="true">{content}</span> : content}
    </Tag>
  )
}

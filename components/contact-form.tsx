"use client"

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import Link from "next/link"
import { prefersReducedMotion } from "@/components/fx/env"
import { Magnetic } from "@/components/fx/magnetic"
import { SpotlightCard } from "@/components/fx/spotlight-card"
import { inquiryTypes } from "@/lib/content"
import { company } from "@/lib/site"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Check, ChevronDown, Copy, Mail, Send, TriangleAlert } from "lucide-react"
import styles from "./contact-form.module.css"

// サインアップ不要のフォーム送信サービス。宛先アドレス側で初回のみ有効化が必要
const formEndpoint = `https://formsubmit.co/ajax/${company.email}`

// 入力欄: 暗いガラスの面。フォーカスで縁が青く光り、外側にやわらかい光の輪が広がる
const inputClass = cn(
  styles.field,
  "w-full appearance-none rounded-xl border border-hairline-strong bg-[rgba(8,11,19,0.6)] px-4 py-3.5 text-base text-fg outline-none",
  "transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-fg-muted",
  "hover:border-[rgba(0,181,255,0.4)] focus:border-beam-azure focus:bg-[rgba(8,11,19,0.85)] focus:shadow-[0_0_0_4px_rgba(0,181,255,0.15)]",
  "[&:user-invalid]:border-[rgba(255,160,60,0.6)] disabled:cursor-not-allowed disabled:opacity-60",
)

type SendStatus = "idle" | "sending" | "sent" | "error"

const consultationNotes = ["初回ヒアリングは無料です。", "秘密保持契約（NDA）の締結に対応します。", "通常2営業日以内にご返信します。"]

/** ラベル付きの入力欄。フォーカスすると、欄の下に光の下線が左から引かれる */
function Field({ label, required, children }: { label: string; required?: boolean; children: ReactNode }) {
  return (
    <label className="group block">
      <span className="mb-2 block text-sm font-medium text-fg transition-colors duration-300 group-focus-within:text-beam-sky">
        {label}
        {required ? (
          <>
            {" "}
            <span className="text-beam-sky">*</span>
          </>
        ) : null}
      </span>
      <span className="relative block">
        {children}
        <span
          className="pointer-events-none absolute inset-x-4 -bottom-px h-px origin-left scale-x-0 rounded-full bg-beam shadow-[0_0_12px_rgba(0,181,255,0.9)] transition-transform duration-700 ease-out-expo group-focus-within:scale-x-100"
          aria-hidden="true"
        />
      </span>
    </label>
  )
}

/** サイドカードの見出し。下に短い光の線があり、カードにカーソルを乗せると伸びる */
function CardHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-sm font-semibold tracking-wide text-fg">
      {children}
      <span
        className="mt-3 block h-px w-10 bg-beam shadow-[0_0_10px_rgba(0,181,255,0.7)] transition-[width] duration-700 ease-out-expo group-hover:w-20"
        aria-hidden="true"
      />
    </h2>
  )
}

export function ContactForm() {
  const [name, setName] = useState("")
  const [org, setOrg] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState(inquiryTypes[0])
  const [message, setMessage] = useState("")
  const [honeypot, setHoneypot] = useState("")
  const [status, setStatus] = useState<SendStatus>("idle")
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sentCard = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    }
  }, [])

  // 送信完了カードに切り替わると、ページが縮んで画面の外に出ることがある。見える位置へそっと戻す
  useEffect(() => {
    if (status !== "sent") return
    const card = sentCard.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    if (rect.top >= 96 && rect.bottom <= window.innerHeight) return
    card.scrollIntoView({
      block: "center",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }, [status])

  const subject = `【お問い合わせ】${type} - ${name}`

  // 直接送信に失敗した場合のフォールバック: メールソフトを起動
  const mailtoHref = () => {
    const bodyLines = [
      `お名前: ${name}`,
      org ? `会社名・所属: ${org}` : null,
      email ? `ご連絡先メール: ${email}` : null,
      `ご相談内容の種別: ${type}`,
      "",
      "--- ご相談内容 ---",
      message,
    ].filter((line): line is string => line !== null)

    return `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n"),
    )}`
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (status === "sending") return
    setStatus("sending")

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "お名前": name,
          "会社名・所属": org || "（未記入）",
          "ご連絡先メール": email || "（未記入）",
          "ご相談内容の種別": type,
          "ご相談内容": message,
          _subject: subject,
          _template: "table",
          _replyto: email || undefined,
          _honey: honeypot,
        }),
      })
      const data = await response.json().catch(() => null)
      if (response.ok && data && String(data.success) === "true") {
        setStatus("sent")
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(company.email)
      setCopied(true)
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // クリップボードが使えない環境ではアドレスの手動コピーに任せる
    }
  }

  return (
    <div className="grid items-start gap-5 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
      {status === "sent" ? (
        <div ref={sentCard} className={styles.cardIn}>
          <SpotlightCard className="p-8 backdrop-blur-[14px] sm:p-12">
            <span
              className="top-glow inset-x-10 opacity-70"
              aria-hidden="true"
            />
            <div className={styles.badge} aria-hidden="true">
              <span className={styles.ring} />
              <svg viewBox="0 0 64 64" fill="none">
                <defs>
                  <linearGradient id="contact-check-beam" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#7dd8ff" />
                    <stop offset="0.55" stopColor="#00b5ff" />
                    <stop offset="1" stopColor="#6366ff" />
                  </linearGradient>
                </defs>
                <circle cx="32" cy="32" r="30" stroke="rgba(160,190,240,0.14)" strokeWidth="1.5" />
                <circle
                  className={styles.circle}
                  cx="32"
                  cy="32"
                  r="24.2"
                  stroke="url(#contact-check-beam)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  transform="rotate(-90 32 32)"
                />
                <path
                  className={styles.tick}
                  d="M22 33.5l7.2 7.2L43 25.5"
                  stroke="url(#contact-check-beam)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={cn(
                styles.beamLine,
                "mt-8 h-[2px] rounded-full bg-beam shadow-[0_0_12px_rgba(0,181,255,0.8)]",
              )}
              aria-hidden="true"
            />
            <h2 className="mt-6 text-2xl font-bold tracking-[-0.01em] text-fg sm:text-3xl">送信しました</h2>
            <p className="mt-4 text-[0.95rem] leading-[1.9] text-fg-muted [word-break:auto-phrase] sm:text-base">
              お問い合わせありがとうございます。内容を確認のうえ、通常2営業日以内にご返信いたします。
              お急ぎの場合は X（{company.xHandle}）のDMもご利用ください。
            </p>
            <button
              type="button"
              onClick={() => {
                setName("")
                setOrg("")
                setEmail("")
                setType(inquiryTypes[0])
                setMessage("")
                setStatus("idle")
              }}
              className="btn-ghost mt-8"
            >
              続けて別の内容を送る
            </button>
          </SpotlightCard>
        </div>
      ) : (
        <SpotlightCard className="p-6 backdrop-blur-[14px] sm:p-9">
          <span
            className="top-glow inset-x-10 opacity-60"
            aria-hidden="true"
          />
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="お名前" required>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  disabled={status === "sending"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClass}
                  placeholder="山田 太郎"
                />
              </Field>
              <Field label="会社名・所属">
                <input
                  type="text"
                  name="organization"
                  autoComplete="organization"
                  disabled={status === "sending"}
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className={inputClass}
                  placeholder="株式会社◯◯"
                />
              </Field>
            </div>
            <Field label="ご連絡先メールアドレス">
              <input
                type="email"
                name="email"
                autoComplete="email"
                disabled={status === "sending"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </Field>
            <Field label="ご相談内容の種別" required>
              <select
                name="inquiry-type"
                disabled={status === "sending"}
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={cn(inputClass, "cursor-pointer pr-11")}
              >
                {inquiryTypes.map((item) => (
                  <option key={item} value={item} className="bg-[#0b0f18] text-fg">
                    {item}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-muted transition-colors duration-300 group-focus-within:text-beam-sky"
                aria-hidden="true"
              />
            </Field>
            <Field label="ご相談内容" required>
              <textarea
                name="message"
                required
                rows={7}
                disabled={status === "sending"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(inputClass, "min-h-[10rem] resize-y leading-relaxed")}
                placeholder="プロジェクトの背景、課題、希望時期などをご記入ください"
              />
            </Field>
            {/* スパムボット対策のハニーポット(人間には見えない) */}
            <input
              type="text"
              name="_honey"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <Magnetic className="w-full sm:w-auto">
              <button
                type="submit"
                disabled={status === "sending"}
                className={cn("btn-primary group w-full sm:w-auto", status === "sending" && cn(styles.sending, "cursor-wait"))}
              >
                <Send
                  className={cn(
                    "mr-1 h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                    status === "sending" && styles.sendingIcon,
                  )}
                  aria-hidden="true"
                />
                {status === "sending" ? "送信中…" : "送信する"}
              </button>
            </Magnetic>
            {status === "error" ? (
              <div
                className={cn(
                  styles.errorIn,
                  "flex items-start gap-3 rounded-xl border border-[rgba(255,160,60,0.3)] bg-[rgba(255,140,0,0.08)] p-4 text-sm leading-relaxed text-fg [word-break:auto-phrase]",
                )}
                role="alert"
              >
                <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-[#ffb35c]" aria-hidden="true" />
                <p>
                  送信に失敗しました。お手数ですが、
                  <a href={mailtoHref()} className="nav-underline font-medium text-beam-sky">
                    メールソフトで送信
                  </a>
                  いただくか、右のメールアドレス宛に直接お送りください。
                </p>
              </div>
            ) : (
              <p className="text-xs leading-relaxed text-fg-muted [word-break:auto-phrase]">
                入力内容はこのページからそのまま当社宛メールとして送信されます。送信内容の取扱いは
                <Link href="/privacy" className="nav-underline text-beam-sky">
                  プライバシーポリシー
                </Link>
                をご覧ください。
              </p>
            )}
          </form>
        </SpotlightCard>
      )}

      <aside className="space-y-4 lg:sticky lg:top-28">
        <SpotlightCard className="group p-6 sm:p-7">
          <CardHeading>メールで直接送る</CardHeading>
          <p className="mt-5 break-all rounded-xl border border-hairline bg-[rgba(8,11,19,0.6)] px-3.5 py-3 font-mono text-[0.8rem] text-fg">
            {company.email}
          </p>
          <button
            type="button"
            onClick={copyEmail}
            className="nav-underline mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-beam-sky"
          >
            {copied ? (
              <Check className={cn("h-3.5 w-3.5", styles.pop)} aria-hidden="true" />
            ) : (
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copied ? "コピーしました" : "アドレスをコピー"}
          </button>
          <p className="mt-3">
            <a
              href={`mailto:${company.email}`}
              className="nav-underline inline-flex items-center gap-1.5 text-sm font-medium text-beam-sky"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              メールソフトで書く
            </a>
          </p>
        </SpotlightCard>
        <SpotlightCard className="group p-6 sm:p-7">
          <CardHeading>XのDMで相談する</CardHeading>
          <p className="mt-5 text-sm leading-relaxed text-fg-muted [word-break:auto-phrase]">
            カジュアルなご相談・ご質問はXのDMでも受け付けています。
          </p>
          <a
            href={company.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-underline mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-beam-sky"
          >
            <span className="font-mono" aria-hidden="true">
              𝕏
            </span>
            {company.xHandle}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </SpotlightCard>
        <SpotlightCard className="group p-6 sm:p-7">
          <CardHeading>ご相談にあたって</CardHeading>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed text-fg-muted [word-break:auto-phrase]">
            {consultationNotes.map((note) => (
              <li
                key={note}
                className="relative pl-5 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-3 before:bg-beam"
              >
                {note}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </aside>
    </div>
  )
}

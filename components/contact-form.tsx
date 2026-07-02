"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { company } from "@/lib/site"
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react"

const inquiryTypes = [
  "ITコンサルティング",
  "ブロックチェーン・Web3開発",
  "Forward Deployed Engineering",
  "技術顧問・アドバイザリー",
  "その他",
]

// サインアップ不要のフォーム送信サービス。宛先アドレス側で初回のみ有効化が必要
const formEndpoint = `https://formsubmit.co/ajax/${company.email}`

const inputClass =
  "w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#0057d9] focus:ring-1 focus:ring-[#0057d9] disabled:opacity-60"

type SendStatus = "idle" | "sending" | "sent" | "error"

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

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    }
  }, [])

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
    <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
      {status === "sent" ? (
        <div className="border border-border bg-white p-10">
          <div className="brand-line h-[3px] w-12" aria-hidden="true" />
          <h2 className="mt-6 font-display text-2xl font-semibold">送信しました</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            お問い合わせありがとうございます。内容を確認のうえ、通常2営業日以内にご返信いたします。
            お急ぎの場合は X（{company.xHandle}）のDMもご利用ください。
          </p>
          <Button
            type="button"
            onClick={() => {
              setName("")
              setOrg("")
              setEmail("")
              setType(inquiryTypes[0])
              setMessage("")
              setStatus("idle")
            }}
            variant="outline"
            className="mt-8 rounded-none"
          >
            続けて別の内容を送る
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                お名前 <span className="text-[#0057d9]">*</span>
              </span>
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
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">会社名・所属</span>
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
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">ご連絡先メールアドレス</span>
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
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              ご相談内容の種別 <span className="text-[#0057d9]">*</span>
            </span>
            <select
              name="inquiry-type"
              disabled={status === "sending"}
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={inputClass}
            >
              {inquiryTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">
              ご相談内容 <span className="text-[#0057d9]">*</span>
            </span>
            <textarea
              name="message"
              required
              rows={7}
              disabled={status === "sending"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
              placeholder="プロジェクトの背景、課題、希望時期などをご記入ください"
            />
          </label>
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
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="rounded-none bg-[#0b1f33] px-8 text-base font-medium text-white hover:bg-[#16324d]"
          >
            <Send className="mr-1 h-4 w-4" />
            {status === "sending" ? "送信中…" : "送信する"}
          </Button>
          {status === "error" ? (
            <div className="border border-[#c2410c]/30 bg-[#fff7ed] p-4 text-sm leading-relaxed" role="alert">
              送信に失敗しました。お手数ですが、
              <a href={mailtoHref()} className="nav-underline font-medium text-[#0057d9]">
                メールソフトで送信
              </a>
              いただくか、右のメールアドレス宛に直接お送りください。
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-muted-foreground">
              入力内容はこのページからそのまま当社宛メールとして送信されます。送信内容の取扱いは
              <Link href="/privacy" className="nav-underline text-[#0057d9]">
                プライバシーポリシー
              </Link>
              をご覧ください。
            </p>
          )}
        </form>
      )}

      <aside className="space-y-8 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <div>
          <h2 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">メールで直接送る</h2>
          <p className="mt-4 break-all font-mono text-sm">{company.email}</p>
          <button
            type="button"
            onClick={copyEmail}
            className="nav-underline mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0057d9]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "コピーしました" : "アドレスをコピー"}
          </button>
          <p className="mt-3">
            <a
              href={`mailto:${company.email}`}
              className="nav-underline inline-flex items-center gap-1.5 text-sm font-medium text-[#0057d9]"
            >
              <Mail className="h-3.5 w-3.5" />
              メールソフトで書く
            </a>
          </p>
        </div>
        <div>
          <h2 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">XのDMで相談する</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            カジュアルなご相談・ご質問はXのDMでも受け付けています。
          </p>
          <a
            href={company.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-underline mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[#0057d9]"
          >
            <span className="font-mono" aria-hidden="true">
              𝕏
            </span>
            {company.xHandle}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div>
          <h2 className="border-b-2 border-[#0b1f33] pb-2 text-sm font-semibold tracking-wide">ご相談にあたって</h2>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <li>初回ヒアリングは無料です。</li>
            <li>秘密保持契約（NDA）の締結に対応します。</li>
            <li>通常2営業日以内にご返信します。</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { company } from "@/lib/site"
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react"

const inquiryTypes = [
  "ITコンサルティング",
  "ブロックチェーン・Web3開発",
  "Forward Deployed Engineering",
  "技術顧問・アドバイザリー",
  "その他",
]

const inputClass =
  "w-full border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#0057d9] focus:ring-1 focus:ring-[#0057d9]"

export function ContactForm() {
  const [name, setName] = useState("")
  const [org, setOrg] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState(inquiryTypes[0])
  const [message, setMessage] = useState("")
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current)
    }
  }, [])

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const subject = `【お問い合わせ】${type} - ${name}`
    const bodyLines = [
      `お名前: ${name}`,
      org ? `会社名・所属: ${org}` : null,
      email ? `ご連絡先メール: ${email}` : null,
      `ご相談内容の種別: ${type}`,
      "",
      "--- ご相談内容 ---",
      message,
    ].filter((line): line is string => line !== null)

    const mailto = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      bodyLines.join("\n"),
    )}`
    window.location.href = mailto
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
          <select name="inquiry-type" value={type} onChange={(e) => setType(e.target.value)} className={inputClass}>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
            placeholder="プロジェクトの背景、課題、希望時期などをご記入ください"
          />
        </label>
        <Button
          type="submit"
          size="lg"
          className="rounded-none bg-[#0b1f33] px-8 text-base font-medium text-white hover:bg-[#16324d]"
        >
          <Mail className="mr-1 h-4 w-4" />
          メールソフトを開いて送信
        </Button>
        <p className="text-xs leading-relaxed text-muted-foreground">
          送信ボタンを押すと、入力内容が本文に入った状態でお使いのメールソフトが起動します。
          メールソフトが起動しない場合は、右のメールアドレス宛に直接お送りいただくか、XのDMをご利用ください。
        </p>
      </form>

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

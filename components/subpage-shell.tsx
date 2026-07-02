import Link from "next/link"
import type { ReactNode } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { cn } from "@/lib/utils"

type SubpageShellProps = {
  label: string
  title: string
  /** main 要素への追加クラス(幅の変更など) */
  className?: string
  children: ReactNode
}

export function SubpageShell({ label, title, className, children }: SubpageShellProps) {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className={cn("container mx-auto max-w-3xl px-4 py-16", className)}>
        <p className="font-mono text-xs tracking-[0.35em] text-line-blue">{label}</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
          <span className="reveal-underline is-revealed">{title}</span>
        </h1>
        {children}
        <Link href="/" className="nav-underline mt-12 inline-block text-sm font-medium text-line-blue">
          ← トップページへ戻る
        </Link>
      </main>
      <SiteFooter />
    </div>
  )
}

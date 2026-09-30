import Link from "next/link"
import { cn } from "@/lib/utils"

/** 浮かぶガラスのピル(トップページとサブページのヘッダーで共通) */
export const glassPill =
  "border-hairline bg-[rgba(8,11,19,0.72)] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl"

/** ロゴマーク(favicon と同じ「P + 下線」) */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("h-7 w-7 shrink-0", className)}>
      <defs>
        <linearGradient id="logo-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#7dd8ff" />
          <stop offset="0.5" stopColor="#00b5ff" />
          <stop offset="1" stopColor="#6366ff" />
        </linearGradient>
      </defs>
      <rect x="0.5" y="0.5" width="31" height="31" rx="9" fill="rgba(148,178,230,0.06)" stroke="rgba(160,190,240,0.22)" />
      <path d="M11.5 22V9.5h5.2a3.9 3.9 0 0 1 0 7.8h-5.2" fill="none" stroke="#eaf0f8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="8" y="24.2" width="16" height="2" rx="1" fill="url(#logo-beam)" />
    </svg>
  )
}

export function SiteLogo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex shrink-0 items-center gap-2 whitespace-nowrap sm:gap-2.5"
      aria-label="PUBLIC下線合同会社 トップページ"
    >
      <LogoMark className="transition-transform duration-500 ease-out-expo group-hover:-rotate-6 group-hover:scale-105" />
      <span className="flex items-baseline gap-1 sm:gap-1.5">
        <span className="text-[0.98rem] font-bold tracking-tight text-fg sm:text-[1.05rem]">
          PUBLIC<span className="name-underline">下線</span>
        </span>
        <span className="text-[0.62rem] text-fg-muted sm:text-[0.68rem]">合同会社</span>
      </span>
    </Link>
  )
}

/** サブページ用のシンプルなヘッダー。ロゴだけの小さなガラスのピルを本文の左端にそろえて置く */
export function SiteHeader({ className }: { className?: string }) {
  return (
    <header className="sticky top-0 z-50 pt-3">
      <div className={cn("container", className)}>
        <div className={cn("inline-flex items-center rounded-full border px-3 py-2", glassPill)}>
          <SiteLogo />
        </div>
      </div>
    </header>
  )
}

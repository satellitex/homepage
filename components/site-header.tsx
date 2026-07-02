import Link from "next/link"

export function SiteLogo() {
  return (
    <Link href="/" className="flex items-baseline gap-2" aria-label="PUBLIC下線合同会社 トップページ">
      <span className="font-display text-xl font-semibold tracking-tight">
        PUBLIC<span className="name-underline">下線</span>
      </span>
      <span className="text-xs text-muted-foreground">合同会社</span>
    </Link>
  )
}

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-white">
      <div className="container mx-auto px-4 py-4">
        <SiteLogo />
      </div>
    </header>
  )
}

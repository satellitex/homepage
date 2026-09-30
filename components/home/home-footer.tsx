import Link from "next/link"
import { FooterWordmark } from "@/components/home/footer-wordmark"
import { Reveal } from "@/components/reveal"
import { navItems } from "@/lib/content"
import { company } from "@/lib/site"

const linkClass = "nav-underline inline-block text-sm text-fg-muted transition-colors duration-300 hover:text-fg"

const pageLinks = [
  { href: "/contact", label: "お問い合わせ" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/terms", label: "利用規約" },
]

export function HomeFooter() {
  return (
    <footer className="relative isolate overflow-hidden">
      <div className="hairline-x" aria-hidden="true" />
      {/* 足元に滲む光(ワードマークの背後) */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(60%_90%_at_50%_100%,rgba(0,87,217,0.26),transparent_72%)]"
        aria-hidden="true"
      />

      <div className="container pt-16 sm:pt-24">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-24">
          <Reveal>
            <p className="text-2xl font-bold tracking-tight text-fg sm:text-[1.75rem]">
              PUBLIC<span className="name-underline">下線</span>
              <span className="ml-1.5 text-xs font-normal text-fg-muted">合同会社</span>
            </p>
            <p className="mt-5 max-w-md text-sm leading-[1.9] text-fg-muted">
              <span className="inline-block">ITコンサルティング・ブロックチェーン開発。</span>
              <span className="inline-block">構想から実装まで、</span>
              <span className="inline-block">事業を貫く一本の線。</span>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <nav aria-label="フッターナビゲーション" className="grid grid-cols-2 gap-x-8 sm:gap-x-16 lg:max-w-md">
              <ul className="flex flex-col gap-3.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={linkClass}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-col gap-3.5">
                {pageLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>

        <Reveal delay={200} as="p" className="mt-16 border-t border-hairline pt-6 text-xs text-fg-muted sm:mt-20">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </Reveal>
      </div>

      <FooterWordmark />
    </footer>
  )
}

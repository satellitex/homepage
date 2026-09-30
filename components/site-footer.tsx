import { company } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="relative pb-10 sm:pb-12">
      {/* 両端が消える線。中央だけ、うっすら光る */}
      <div className="hairline-x relative" aria-hidden="true">
        <span className="top-glow inset-x-[35%] opacity-50" />
      </div>
      <div className="container pt-8">
        <p className="text-center text-xs tracking-wide text-fg-muted">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

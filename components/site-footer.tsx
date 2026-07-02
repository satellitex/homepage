import { company } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-white py-8">
      <div className="container mx-auto px-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {company.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

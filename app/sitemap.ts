import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-02")

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/contact/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/it-consulting-blockchain-development/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/privacy/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms/`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]
}

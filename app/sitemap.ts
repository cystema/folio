import type { MetadataRoute } from "next"
import { getPublishedNotes } from "@/lib/notes"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shubh.ink"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const notes = await getPublishedNotes()

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...notes.map((note) => ({
      url: `${baseUrl}${note.href}`,
      lastModified: note.date,
    })),
  ]
}

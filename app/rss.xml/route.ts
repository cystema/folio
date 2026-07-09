import RSS from "rss"
import { getPublishedNotes } from "@/lib/notes"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shubh.ink"

export async function GET() {
  const feed = new RSS({
    title: "Shubham Mazumder",
    description: "Notes from Shubham Mazumder.",
    feed_url: `${siteUrl}/rss.xml`,
    site_url: siteUrl,
    language: "en",
  })
  const notes = await getPublishedNotes()

  for (const note of notes) {
    const url = `${siteUrl}${note.href}`

    feed.item({
      title: note.title,
      description: note.summary,
      url,
      guid: url,
      date: new Date(`${note.date}T00:00:00.000Z`),
    })
  }

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

import { getPublishedNotes } from "@/lib/notes"

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://shubh.ink").replace(
  /\/$/,
  "",
)

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export async function GET() {
  const notes = await getPublishedNotes()
  const items = notes
    .map((note) => {
      const url = `${siteUrl}${note.href}`
      const date = new Date(`${note.date}T00:00:00.000Z`).toUTCString()

      return [
        "    <item>",
        `      <title>${escapeXml(note.title)}</title>`,
        `      <description>${escapeXml(note.summary)}</description>`,
        `      <link>${escapeXml(url)}</link>`,
        `      <guid>${escapeXml(url)}</guid>`,
        `      <pubDate>${date}</pubDate>`,
        "    </item>",
      ].join("\n")
    })
    .join("\n")

  const feed = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0">',
    "  <channel>",
    "    <title>Shubham Mazumder</title>",
    "    <description>Notes from Shubham Mazumder.</description>",
    `    <link>${escapeXml(siteUrl)}</link>`,
    `    <atom:link href="${escapeXml(`${siteUrl}/rss.xml`)}" rel="self" type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"/>`,
    "    <language>en</language>",
    items,
    "  </channel>",
    "</rss>",
  ]
    .filter(Boolean)
    .join("\n")

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

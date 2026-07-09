import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getNoteBySlug, getPublishedNotes } from "@/lib/notes"
import { renderMarkdownContent } from "./renderMarkdownContent"

type NotePageProps = {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

const longDateFormatter = new Intl.DateTimeFormat("en", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function formatNoteDate(date: string) {
  return longDateFormatter.format(new Date(`${date}T00:00:00.000Z`))
}

export async function generateStaticParams() {
  const notes = await getPublishedNotes()

  return notes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return {
    title: note.title,
    description: note.summary,
    alternates: {
      canonical: note.href,
    },
    openGraph: {
      type: "article",
      title: note.title,
      description: note.summary,
      url: note.href,
      publishedTime: note.date,
      tags: note.tags,
    },
  }
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params
  const note = await getNoteBySlug(slug)

  if (!note) {
    notFound()
  }

  return (
    <main className="archive-page archive-page--narrow">
      <div className="archive-topline">
        <Link href="/notes" className="archive-back-link">
          Back to notes
        </Link>
      </div>

      <article className="note-article">
        <header className="note-article__header">
          <time dateTime={note.date} className="note-article__date">
            {formatNoteDate(note.date)}
          </time>
          <h1>{note.title}</h1>
          <p>{note.summary}</p>
        </header>

        <div className="note-prose">{renderMarkdownContent(note.content)}</div>
      </article>
    </main>
  )
}

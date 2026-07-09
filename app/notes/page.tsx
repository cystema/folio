import type { Metadata } from "next"
import Link from "next/link"
import { getPublishedNotes } from "@/lib/notes"

export const metadata: Metadata = {
  title: "Notes",
  description: "Public notes from Shubham Mazumder.",
  alternates: {
    canonical: "/notes",
  },
}

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function formatNoteDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00.000Z`))
}

export default async function NotesPage() {
  const notes = await getPublishedNotes()

  return (
    <main className="archive-page archive-page--narrow">
      <div className="archive-topline">
        <Link href="/" className="archive-back-link">
          Back to archive
        </Link>
      </div>

      <section className="notes-index" aria-labelledby="notes-heading">
        <h1 id="notes-heading" className="notes-page-title">
          Notes
        </h1>

        {notes.length > 0 ? (
          <ul className="notes-list">
            {notes.map((note) => (
              <li key={note.slug} className="note-row">
                <time className="note-row__date" dateTime={note.date}>
                  {formatNoteDate(note.date)}
                </time>
                <div className="note-row__body">
                  <Link href={note.href} className="note-row__title">
                    {note.title}
                  </Link>
                  <p className="note-row__summary">{note.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="notes-empty">No public notes yet.</p>
        )}
      </section>
    </main>
  )
}

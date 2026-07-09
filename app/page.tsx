import Link from "next/link"
import FaceTracker from "@/components/FaceTracker"
import { getPublishedNotes } from "@/lib/notes"

const archiveLinks = [
  { label: "Email", href: "mailto:shubham.mazumder@gmail.com" },
  { label: "GitHub", href: "https://github.com/cystema" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mazumders/" },
  { label: "RSS", href: "/rss.xml" },
]

const noteDateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

function formatNoteDate(date: string) {
  return noteDateFormatter.format(new Date(`${date}T00:00:00.000Z`))
}

export default async function HomePage() {
  const notes = await getPublishedNotes()

  return (
    <main className="archive-page">
      <div className="archive-masthead">
        <aside className="archive-rail" aria-label="Identity and links">
          <div className="face-signature" aria-hidden="true">
            <FaceTracker basePath="/faces/" />
          </div>

          <div className="archive-identity">
            <p className="archive-name">Shubham Mazumder</p>
          </div>

          <nav className="archive-links" aria-label="Contact links">
            {archiveLinks.map((link) => {
              const isExternal = link.href.startsWith("http")

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noreferrer" : undefined}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>
        </aside>

        <section className="archive-main" aria-labelledby="archive-title">
          <h1 id="archive-title">
            Founding engineer focused on the operational layer of AI products.
          </h1>
          <p className="archive-summary">
            I work on the services, checks, boundaries, and feedback loops that
            make agentic systems reliable after the demo.
          </p>

          <section className="field-notes" aria-labelledby="field-notes-heading">
            <div className="field-notes__header">
              <h2 id="field-notes-heading">Field Notes</h2>
              <Link href="/notes">Index</Link>
            </div>

            {notes.length > 0 ? (
              <ol className="notes-list">
                {notes.slice(0, 4).map((note) => (
                  <li key={note.slug} className="note-row">
                    <time dateTime={note.date} className="note-row__date">
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
              </ol>
            ) : (
              <p className="notes-empty">No public notes yet.</p>
            )}
          </section>
        </section>
      </div>
    </main>
  )
}

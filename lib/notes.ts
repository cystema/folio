import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

const notesDirectory = path.join(process.cwd(), "content", "notes")

export type Note = {
  title: string
  slug: string
  date: string
  summary: string
  published: boolean
  tags: string[]
  content: string
  href: string
}

type NoteFrontmatter = {
  title?: unknown
  slug?: unknown
  date?: unknown
  summary?: unknown
  published?: unknown
  tags?: unknown
}

type NoteQuery = {
  includeDrafts?: boolean
}

function isMissingDirectoryError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ENOENT"
  )
}

function asString(value: unknown, fieldName: string, fileName: string) {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim()
  }

  throw new Error(`Invalid ${fieldName} frontmatter in ${fileName}`)
}

function asBoolean(value: unknown) {
  return typeof value === "boolean" ? value : false
}

function asTags(value: unknown, fileName: string) {
  if (value === undefined) {
    return []
  }

  if (Array.isArray(value) && value.every((tag) => typeof tag === "string")) {
    return value.map((tag) => tag.trim()).filter(Boolean)
  }

  throw new Error(`Invalid tags frontmatter in ${fileName}`)
}

function slugFromFileName(fileName: string) {
  return fileName.replace(/\.mdx$/, "")
}

function normalizeNote(fileName: string, raw: string): Note {
  const parsed = matter(raw)
  const data = parsed.data as NoteFrontmatter
  const slug = typeof data.slug === "string" && data.slug.trim().length > 0
    ? data.slug.trim()
    : slugFromFileName(fileName)

  return {
    title: asString(data.title, "title", fileName),
    slug,
    date: asString(data.date, "date", fileName),
    summary: asString(data.summary, "summary", fileName),
    published: asBoolean(data.published),
    tags: asTags(data.tags, fileName),
    content: parsed.content.trim(),
    href: `/notes/${slug}`,
  }
}

function sortNotesByDateDescending(notes: Note[]) {
  return notes.sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })
}

async function readNoteFiles() {
  try {
    const entries = await fs.readdir(notesDirectory)
    return entries.filter((entry) => entry.endsWith(".mdx"))
  } catch (error) {
    if (isMissingDirectoryError(error)) {
      return []
    }

    throw error
  }
}

export async function getAllNotes(query: NoteQuery = {}) {
  const files = await readNoteFiles()
  const notes = await Promise.all(
    files.map(async (fileName) => {
      const raw = await fs.readFile(path.join(notesDirectory, fileName), "utf8")
      return normalizeNote(fileName, raw)
    }),
  )

  const filteredNotes = query.includeDrafts
    ? notes
    : notes.filter((note) => note.published)

  return sortNotesByDateDescending(filteredNotes)
}

export async function getPublishedNotes() {
  return getAllNotes({ includeDrafts: false })
}

export async function getNoteBySlug(slug: string, query: NoteQuery = {}) {
  const notes = await getAllNotes(query)
  return notes.find((note) => note.slug === slug)
}

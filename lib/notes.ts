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

function asDate(value: unknown, fileName: string) {
  let parsed: Date

  if (value instanceof Date) {
    parsed = value
  } else if (typeof value === "string" && value.trim().length > 0) {
    parsed = new Date(value.trim())
  } else {
    throw new Error(`Invalid date frontmatter in ${fileName}`)
  }

  if (!Number.isFinite(parsed.getTime())) {
    throw new Error(`Invalid date frontmatter in ${fileName}`)
  }

  return parsed.toISOString().slice(0, 10)
}

function asPublished(value: unknown, fileName: string) {
  if (value === undefined) {
    return false
  }

  if (typeof value === "boolean") {
    return value
  }

  throw new Error(`Invalid published frontmatter in ${fileName}`)
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

function getSlug(data: NoteFrontmatter, fileName: string) {
  return typeof data.slug === "string" && data.slug.trim().length > 0
    ? data.slug.trim()
    : slugFromFileName(fileName)
}

function normalizeNote(
  fileName: string,
  data: NoteFrontmatter,
  content: string,
  published: boolean,
): Note {
  const slug = getSlug(data, fileName)

  return {
    title: asString(data.title, "title", fileName),
    slug,
    date: asDate(data.date, fileName),
    summary: asString(data.summary, "summary", fileName),
    published,
    tags: asTags(data.tags, fileName),
    content: content.trim(),
    href: `/notes/${slug}`,
  }
}

function validateUniqueSlugs(notes: Note[]) {
  const slugs = new Set<string>()

  for (const note of notes) {
    if (slugs.has(note.slug)) {
      throw new Error(`Duplicate note slug "${note.slug}"`)
    }

    slugs.add(note.slug)
  }
}

function sortNotesByDateDescending(notes: Note[]) {
  return notes.sort((left, right) => {
    return new Date(right.date).getTime() - new Date(left.date).getTime()
  })
}

async function readNoteFiles() {
  try {
    const entries = await fs.readdir(notesDirectory, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name)
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
      const parsed = matter(raw)
      const data = parsed.data as NoteFrontmatter
      const published = asPublished(data.published, fileName)

      if (!query.includeDrafts && !published) {
        return undefined
      }

      return normalizeNote(fileName, data, parsed.content, published)
    }),
  )

  const includedNotes = notes.filter((note): note is Note => note !== undefined)
  validateUniqueSlugs(includedNotes)

  return sortNotesByDateDescending(includedNotes)
}

export async function getPublishedNotes() {
  return getAllNotes({ includeDrafts: false })
}

export async function getNoteBySlug(slug: string, query: NoteQuery = {}) {
  const notes = await getAllNotes(query)
  return notes.find((note) => note.slug === slug)
}

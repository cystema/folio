import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"

const notesDirectory = path.join(process.cwd(), "content", "notes")
const noteSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/

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

function invalidDateError(fileName: string) {
  return new Error(
    `Invalid date frontmatter in ${fileName}; expected YYYY-MM-DD`,
  )
}

function normalizeDateString(value: string, fileName: string) {
  const match = value.match(dateOnlyPattern)

  if (!match) {
    throw invalidDateError(fileName)
  }

  const [, yearValue, monthValue, dayValue] = match
  const year = Number(yearValue)
  const month = Number(monthValue)
  const day = Number(dayValue)
  const parsed = new Date(Date.UTC(year, month - 1, day))
  parsed.setUTCFullYear(year)

  if (parsed.toISOString().slice(0, 10) !== value) {
    throw invalidDateError(fileName)
  }

  return value
}

function unquoteYamlString(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1)
  }

  return value
}

function getRawDateValue(rawMatter: string | undefined) {
  if (rawMatter === undefined) {
    return undefined
  }

  const dateLine = rawMatter
    .split(/\r?\n/)
    .find((line) => line.startsWith("date:"))

  if (dateLine === undefined) {
    return undefined
  }

  const rawValue = dateLine
    .slice("date:".length)
    .trim()
    .replace(/\s+#.*$/, "")

  return unquoteYamlString(rawValue)
}

function asDate(value: unknown, fileName: string, rawMatter?: string) {
  const rawDate = getRawDateValue(rawMatter)

  if (rawDate !== undefined) {
    return normalizeDateString(rawDate, fileName)
  }

  if (value instanceof Date) {
    if (!Number.isFinite(value.getTime())) {
      throw invalidDateError(fileName)
    }

    return value.toISOString().slice(0, 10)
  }

  if (typeof value === "string") {
    return normalizeDateString(value, fileName)
  }

  throw invalidDateError(fileName)
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

function asSlug(value: string, fileName: string) {
  if (noteSlugPattern.test(value)) {
    return value
  }

  throw new Error(
    `Invalid note slug ${JSON.stringify(value)} in ${fileName}; expected lowercase letters, digits, and hyphens`,
  )
}

function getSlug(data: NoteFrontmatter, fileName: string) {
  if (data.slug === undefined) {
    return asSlug(slugFromFileName(fileName), fileName)
  }

  if (typeof data.slug === "string") {
    return asSlug(data.slug, fileName)
  }

  throw new Error(`Invalid slug frontmatter in ${fileName}`)
}

function normalizeNote(
  fileName: string,
  data: NoteFrontmatter,
  content: string,
  published: boolean,
  rawMatter?: string,
): Note {
  const slug = getSlug(data, fileName)

  return {
    title: asString(data.title, "title", fileName),
    slug,
    date: asDate(data.date, fileName, rawMatter),
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
    const dateOrder =
      new Date(right.date).getTime() - new Date(left.date).getTime()

    if (dateOrder !== 0) {
      return dateOrder
    }

    return left.slug < right.slug ? -1 : left.slug > right.slug ? 1 : 0
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

      return normalizeNote(
        fileName,
        data,
        parsed.content,
        published,
        parsed.matter,
      )
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

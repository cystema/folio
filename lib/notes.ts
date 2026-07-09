import fs from "node:fs/promises"
import path from "node:path"

const notesDirectory = path.join(process.cwd(), "content", "notes")
const noteFileExtension = ".md"
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

type ParsedNoteFile = {
  data: NoteFrontmatter
  content: string
  matter?: string
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

function stripYamlComment(value: string) {
  let quote: string | undefined

  for (let index = 0; index < value.length; index += 1) {
    const char = value[index]

    if (quote !== undefined) {
      if (char === quote) {
        quote = undefined
      }

      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      continue
    }

    if (char === "#" && (index === 0 || /\s/.test(value[index - 1]))) {
      return value.slice(0, index).trim()
    }
  }

  return value.trim()
}

function parseYamlScalar(value: string): unknown {
  const normalizedValue = stripYamlComment(value)

  if (normalizedValue === "true") {
    return true
  }

  if (normalizedValue === "false") {
    return false
  }

  if (normalizedValue.startsWith("[") && normalizedValue.endsWith("]")) {
    const listValue = normalizedValue.slice(1, -1).trim()

    if (listValue.length === 0) {
      return []
    }

    return listValue
      .split(",")
      .map((item) => unquoteYamlString(stripYamlComment(item).trim()))
      .filter(Boolean)
  }

  return unquoteYamlString(normalizedValue)
}

function parseNoteFile(raw: string): ParsedNoteFile {
  const normalizedRaw = raw.replace(/^\uFEFF/, "")
  const lines = normalizedRaw.split(/\r?\n/)

  if (lines[0]?.trim() !== "---") {
    return {
      data: {},
      content: raw,
    }
  }

  const closingIndex = lines.findIndex(
    (line, index) => index > 0 && line.trim() === "---",
  )

  if (closingIndex === -1) {
    throw new Error("Unclosed note frontmatter block")
  }

  const matterLines = lines.slice(1, closingIndex)
  const data: Record<string, unknown> = {}

  for (let index = 0; index < matterLines.length; index += 1) {
    const line = matterLines[index]
    const trimmedLine = line.trim()

    if (trimmedLine.length === 0 || trimmedLine.startsWith("#")) {
      continue
    }

    const match = line.match(/^([A-Za-z][A-Za-z0-9_-]*):(?:\s*(.*))?$/)

    if (!match) {
      throw new Error(`Invalid note frontmatter line: ${line}`)
    }

    const [, key, rawValue = ""] = match

    if (rawValue.trim().length > 0) {
      data[key] = parseYamlScalar(rawValue)
      continue
    }

    const listItems: unknown[] = []

    while (
      index + 1 < matterLines.length &&
      /^\s*-\s+/.test(matterLines[index + 1])
    ) {
      index += 1
      listItems.push(
        parseYamlScalar(matterLines[index].replace(/^\s*-\s+/, "")),
      )
    }

    data[key] = listItems.length > 0 ? listItems : ""
  }

  return {
    data: data as NoteFrontmatter,
    content: lines.slice(closingIndex + 1).join("\n"),
    matter: matterLines.join("\n"),
  }
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
  return fileName.slice(0, -noteFileExtension.length)
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
      .filter(
        (entry) => entry.isFile() && entry.name.endsWith(noteFileExtension),
      )
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
      const parsed = parseNoteFile(raw)
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

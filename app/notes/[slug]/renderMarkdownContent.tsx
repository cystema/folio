import type { ReactNode } from "react"

function safeHref(href: string) {
  if (
    href.startsWith("/") ||
    href.startsWith("#") ||
    href.startsWith("https://") ||
    href.startsWith("http://") ||
    href.startsWith("mailto:")
  ) {
    return href
  }

  return "#"
}

function renderInline(text: string) {
  const parts: ReactNode[] = []
  const pattern = /(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
  let cursor = 0
  let index = 0

  for (const match of text.matchAll(pattern)) {
    if (match.index === undefined) {
      continue
    }

    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index))
    }

    const token = match[0]

    if (token.startsWith("`")) {
      parts.push(<code key={index}>{token.slice(1, -1)}</code>)
    } else if (token.startsWith("**")) {
      parts.push(<strong key={index}>{token.slice(2, -2)}</strong>)
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)

      if (linkMatch) {
        parts.push(
          <a key={index} href={safeHref(linkMatch[2])}>
            {linkMatch[1]}
          </a>,
        )
      } else {
        parts.push(token)
      }
    }

    cursor = match.index + token.length
    index += 1
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor))
  }

  return parts.length > 0 ? parts : text
}

function isBlockBoundary(line: string) {
  return (
    line.trim().length === 0 ||
    /^#{1,3}\s+/.test(line) ||
    /^-\s+/.test(line) ||
    line.startsWith("```")
  )
}

export function renderMarkdownContent(source: string) {
  const lines = source.split(/\r?\n/)
  const blocks: ReactNode[] = []
  let index = 0

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = lines[lineIndex]

    if (line.trim().length === 0) {
      continue
    }

    if (line.startsWith("```")) {
      const codeLines: string[] = []
      lineIndex += 1

      while (lineIndex < lines.length && !lines[lineIndex].startsWith("```")) {
        codeLines.push(lines[lineIndex])
        lineIndex += 1
      }

      blocks.push(
        <pre key={index}>
          <code>{codeLines.join("\n")}</code>
        </pre>,
      )
      index += 1
      continue
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/)

    if (headingMatch) {
      const level = headingMatch[1].length
      const children = renderInline(headingMatch[2])

      if (level === 3) {
        blocks.push(<h3 key={index}>{children}</h3>)
      } else {
        blocks.push(<h2 key={index}>{children}</h2>)
      }

      index += 1
      continue
    }

    if (/^-\s+/.test(line)) {
      const items: ReactNode[] = []

      while (lineIndex < lines.length && /^-\s+/.test(lines[lineIndex])) {
        const item = lines[lineIndex].replace(/^-\s+/, "")
        items.push(<li key={lineIndex}>{renderInline(item)}</li>)
        lineIndex += 1
      }

      lineIndex -= 1
      blocks.push(<ul key={index}>{items}</ul>)
      index += 1
      continue
    }

    const paragraphLines = [line.trim()]

    while (
      lineIndex + 1 < lines.length &&
      !isBlockBoundary(lines[lineIndex + 1])
    ) {
      lineIndex += 1
      paragraphLines.push(lines[lineIndex].trim())
    }

    blocks.push(<p key={index}>{renderInline(paragraphLines.join(" "))}</p>)
    index += 1
  }

  return blocks
}

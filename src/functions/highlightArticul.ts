export type ArticulHighlightParts = {
  before: string
  match: string
  after: string
}

const isArticulSeparator = (char: string) => /[\s\-./]/.test(char)

const buildNormalized = (text: string) => {
  const indexMap: number[] = []
  let normalized = ''

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    if (isArticulSeparator(char)) continue

    normalized += char.toLowerCase()
    indexMap.push(i)
  }

  return { normalized, indexMap }
}

export const getArticulHighlightParts = (
  name: string,
  query: string
): ArticulHighlightParts | null => {
  const { normalized: normalizedName, indexMap } = buildNormalized(name)
  const { normalized: normalizedQuery } = buildNormalized(query)

  if (!normalizedQuery) return null

  const matchStart = normalizedName.indexOf(normalizedQuery)
  if (matchStart === -1) return null

  const matchEnd = matchStart + normalizedQuery.length - 1
  const origStart = indexMap[matchStart]
  const origEnd = indexMap[matchEnd] + 1

  return {
    before: name.slice(0, origStart),
    match: name.slice(origStart, origEnd),
    after: name.slice(origEnd),
  }
}

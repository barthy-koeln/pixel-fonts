const gap = [[0]]

const areTouching = (first, second) => {
  for (let i = 0; i < first.length; ++i) {
    if (first[i] && first[i][first[i].length - 1] === 1) {
      for (let j = -1; j <= 1; ++j) {
        if (second[i + j] && second[i + j][0] === 1) {
          return true
        }
      }
    }
  }
}

const renderLine = (text, font) => {
  const characters = []
  let maxHeight = 0

  for (const letter of text) {
    const glyph = font.glyphs[letter] || null

    if (!glyph) {
      console.error(`Missing letter ${letter}`)
      continue
    }

    let newCharacter = []

    glyph.pixels.forEach((row, index) => {
      newCharacter[index + glyph.offset] = row
    })

    maxHeight = Math.max(maxHeight, newCharacter.length)

    const touching = characters.length && areTouching(characters[characters.length - 1], newCharacter)

    if (font.isFixedWidth || touching) {
      characters.push(gap)
    }

    characters.push(newCharacter)
  }

  const emptyRows = Array(maxHeight).fill(0).map(_ => [])

  return characters.reduce((filledRows, character) => {
    const characterWidth = character[character.length - 1].length
    const blankRow = Array(characterWidth).fill(0)

    for (let i = 0; i < maxHeight; ++i) {
      const row = character[i] || blankRow
      filledRows[i].push(...row)
    }

    return filledRows
  }, emptyRows)
}

export function renderPixels (text, font) {
  const lines = text
    .split('\n')
    .map(line => [
      ...gap,
      ...renderLine(line, font)
    ])

  lines[0].shift()

  return [...lines]
}
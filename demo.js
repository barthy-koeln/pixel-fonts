import { renderPixels } from './index.js'
import sevenPlus from './data/seven-plus.js'
import slumbers from './data/slumbers.js'

let allCharacters = ''
for (let charCode = 33; charCode < 127; ++charCode) {
  if (charCode % 32 === 0) {
    allCharacters += '\n'
  }

  allCharacters += String.fromCharCode(charCode)
}

const fonts = [
  sevenPlus,
  slumbers
]

for (const font of fonts) {
  const pixels = renderPixels(allCharacters, font)

  const h2 =document. createElement('h2')
  h2.innerHTML = `Font name: <em>${font.name}</em>`
  document.body.append(h2)

  const p = document. createElement('p')
  p.innerText = font.description
  document.body.append(p)

  for(const line of pixels) {
    const code = document.createElement('code')

    for(const row of line) {
      code.innerHTML += row.join('').replaceAll('1', '█').replaceAll('0', '&nbsp;') + '<br>'
    }

    document.body.append(code)
  }
}
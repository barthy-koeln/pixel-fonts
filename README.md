# js-pixel-fonts
Pixel fonts in pure JS

![Sample of Seven plus font](https://github.com/barthy-koeln/pixel-fonts/raw/main/samples/sevenPlus.png)

> NOTE: this is a browser-targeted fork of [@hgcummings'](https://github.com/hgcummings/pixel-fonts) node.js library. It does not include the PNG rendering function.

## Installation

```shell
npm install barthy-koeln/pixel-fonts --save
yarn add barthy-koeln/pixel-fonts
```

## Usage

### Examples

Render as an array of pixels, for using elsewhere (e.g. drawing to canvas, controlling LEDs):

```javascript
import { renderPixels } from 'js-pixel-fonts'
import sevenPlus from 'js-pixel-fonts/data/seven-plus.js'

const pixels = renderPixels("Hi!", sevenPlus);

/**
 * pixels === [
 *   [
 *     [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1 ],
 *     [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ],
 *     [ 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1 ],
 *     [ 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1 ],
 *     [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1 ],
 *     [ 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0 ],
 *     [ 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1 ]
 *   ]
 * ]
 */
```

### API

#### `renderPixels(text, font)`

Renders the supplied `text` string in the specified `font`.

Structure of the returned array:
```
array[lineIndex]      // text line, one per \n in the input string
array[lineIndex][rowindex]    // row, one of several per text line
array[lineIndex][rowindex][columnIndex]  // column in row, either 1 or 0
```

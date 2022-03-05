# js-pixel-fonts
Pixel fonts in pure JS

![Sample of Seven plus font](https://github.com/barthy-koeln/pixel-fonts/raw/main/samples/sevenPlus.png)

> NOTE: this is a browser-targeted fork of [@hgcummings'](https://github.com/hgcummings/pixel-fonts) node.js library. It does not include the PNG rendering function.

## Installation

```npm install js-pixel-fonts --save```

## Usage

### Examples

Render as an array of pixels, for using elsewhere (e.g. drawing to canvas, controlling LEDs):

```javascript
import { renderPixels } from 'js-pixel-fonts'
import sevenPlus from 'js-pixel-fonts/data/seven-plus.js'

const pixels = renderPixels("Hi!", fonts.sevenPlus);

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

Renders the supplied `text` string in the specified `font` as an array of arrays of pixels. Each array represents a single row, with each element (`1` or `0`) representing whether the pixel should be active or not.
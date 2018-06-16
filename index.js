const log = require('loglevel');
const { PNG } = require('node-png');

const fonts = {
    sevenPlus: require('./data/seven-plus.json')
};

const gap = [[0]];

const renderLine  = (text, font) => {
    const letters = text.split("");
    const characters = [];
    let maxHeight = 0;
    for (let letter of letters) {
        let glyph = font.glyphs[""];
        if (font.glyphs[letter]) {
            glyph = font.glyphs[letter]
        } else {
            log.warn(`Missing letter ${letter}`)
        }
        let newCharacter = [];
        glyph.pixels.forEach((row, index) => {
            newCharacter[index + glyph.offset] = row;
        });
        maxHeight = Math.max(maxHeight, newCharacter.length);
        if (characters.length) {
            characters.push(gap);
        }
        characters.push(newCharacter);
    }
    return characters.reduce((acc, cur) => {
        const blankRow = Array(cur[cur.length - 1].length).fill(0);
        for (let i = 0; i < maxHeight; ++i) {
            const row = cur[i] || blankRow;
            acc[i].push(...row);
        }
        return acc;
    }, Array(maxHeight).fill(0).map(_ => []));
}

const render = (text, font) => {
    const lines = text.split("\n").map(line => [[0]].concat(renderLine(line, font)));
    lines[0].shift();
    return [].concat(...lines);
};

const renderPNG = (text, font, background, foreground, scale = 1) => {
    const pixels = render(text, font);
    const width = pixels.reduce((acc, cur) => Math.max(acc, cur.length), 0);
    const height = pixels.length;
    const png = new PNG({
        width: width * scale,
        height: height * scale
    });
    for (let y = 0; y < height; ++y) {
        for(let x = 0; x < width; ++x) {
            const colour = pixels[y][x] ? foreground : background;
            for(let j = 0; j < scale; ++j) {
                for (let i = 0; i < scale; ++i) {
                    for(let component = 0; component < 4; ++component) {
                        png.data[(((x * scale + i) + ((y * scale + j) * png.width)) << 2) + component] = colour[component] || 0;
                    }
                }
            }
        }
    }
    return png.pack();
}

module.exports = {
    fonts,
    render,
    renderPNG
}
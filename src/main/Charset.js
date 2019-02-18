import { Canvas2D } from './Canvas2D';
import { Texture, BaseTexture } from 'pixi.js';

function createTexture(canvas = document.createElement('canvas')) {
  return new Texture(new BaseTexture.fromCanvas(canvas));
}

function createCharsArray(start = 0, end = 0) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
}

function createCharset(name = '', startCode = 0, endCode = 0) {
  return {
    name,
    startCode,
    endCode,
    chars: createCharsArray(startCode, endCode)
  };
}

export class Charset {
  static style = {
    fontSize: 18,
    fillStyle: '#fff',
    fontFamily: 'Arial'
  };
  static Hirogana = createCharset('Hirogana', 12353, 12438);
  static Katakana = createCharset('Katakana', 65382, 65436);
  static Digit = createCharset('Digit', 48, 57);
  static Latin = createCharset('Latin', 65, 90);
  constructor({
    fontSize = Charset.style.fontSize,
    fillStyle = Charset.style.fillStyle,
    fontFamily = Charset.style.fontFamily
  } = {}) {
    const chars = [
      ...Charset.Katakana.chars,
      ...Charset.Digit.chars,
      ...Charset.Latin.chars
    ];

    const textures = [];
    const shadowBlur = 10;
    const cellSize = fontSize + shadowBlur / 2;

    const spriteSheet = new Canvas2D(cellSize * chars.length, cellSize, {
      fontSize,
      fillStyle,
      fontFamily
    });
    spriteSheet.ctx.shadowColor = fillStyle;
    spriteSheet.ctx.shadowBlur = shadowBlur;

    const getCharImg = (index = 0) => {
      const canvas = document.createElement('canvas');
      canvas.width = cellSize;
      canvas.height = cellSize;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        spriteSheet.output,
        index * cellSize,
        0,
        cellSize,
        cellSize,
        0,
        0,
        cellSize,
        cellSize
      );

      return canvas;
    };

    chars.forEach((char, i) => {
      spriteSheet.ctx.fillText(char, i * cellSize + cellSize / 2, cellSize / 2);
      textures.push(createTexture(getCharImg(i)));
    });

    return this.shuffle(textures);
  }

  shuffle(array = []) {
    const copy = [];
    const ids = new Array(array.length).fill(0).map((i, id) => i + id);
    while (ids.length) {
      const id = Math.floor(Math.random() * ids.length);
      copy.push(array[ids[id]]);
      ids.splice(id, 1);
    }
    return copy;
  }
}

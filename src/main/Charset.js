import { Canvas2D } from './Canvas2D';
import { Texture, BaseTexture } from 'pixi.js';

function createTexture(canvas = document.createElement('canvas')) {
  return new Texture(new BaseTexture.fromCanvas(canvas));
}

export class Charset {
  static style = {
    fontSize: 18,
    fillStyle: '#fff',
    fontFamily: 'Arial'
  };
  static Hirogana = {
    startCode: 12353,
    endCode: 12438
  };
  constructor({
    charset = Charset.Hirogana,
    fontSize = Charset.style.fontSize,
    fillStyle = Charset.style.fillStyle,
    fontFamily = Charset.style.fontFamily
  } = {}) {
    let i = charset.startCode;
    let spriteIndex = 0;
    
    const end = charset.endCode;
    const textures = [];
    const shadowBlur = 10;
    const cellSize = fontSize + shadowBlur / 2;

    const spriteSheet = new Canvas2D(cellSize * (end - i), cellSize, {
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

    for (i; i <= end; i++) {
      spriteSheet.ctx.fillText(
        String.fromCharCode(i),
        spriteIndex * cellSize + cellSize / 2,
        cellSize / 2
      );
      textures.push(createTexture(getCharImg(spriteIndex)));
      spriteIndex++;
    }

    return textures;
  }
}

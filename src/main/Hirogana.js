import * as PIXI from 'pixi.js';

const incrementCode = (i = 0, index = 0) => i + index;
const getChar = (i = 0) => String.fromCharCode(i);
export class Hirogana {
  static startCode = 12353;
  static endCode = 12438;
  constructor({ fontSize = 18, fill = 0x46b843, fontFamily = 'Arial' } = {}) {
    const chars = new Array(Hirogana.endCode + 1 - Hirogana.startCode)
      .fill(Hirogana.startCode)
      .map(incrementCode)
      .map(getChar);
    const style = {fontFamily, fontSize, fill, align : 'center'};
    this.symbols = chars.map(char => new PIXI.Text(char, style));
  }
}

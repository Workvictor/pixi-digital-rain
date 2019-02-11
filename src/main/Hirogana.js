import { Canvas2D } from './Canvas2D';

const incrementCode = (i = 0, index = 0) => i + index;
const getChar = (i = 0) => String.fromCharCode(i);
const createBMP = ({
  char,
  options: { fontSize = 18, fillStyle = '#46b843', fontFamily = 'Arial' }
}) => {
  const canvas = new Canvas2D(fontSize, fontSize, {
    fontSize,
    fillStyle,
    fontFamily
  });
  canvas.ctx.fillText(char, fontSize / 2, fontSize / 2);
  return canvas.output;
};
export class Hirogana {
  static startCode = 12353;
  static endCode = 12438;
  constructor({
    fontSize = 18,
    fillStyle = '#46b843',
    fontFamily = 'Arial'
  } = {}) {
    this.props = {
      fontFamily,
      fontSize,
      fillStyle
    };
    this.chars = new Array(Hirogana.endCode + 1 - Hirogana.startCode)
      .fill(Hirogana.startCode)
      .map(incrementCode)
      .map(getChar);
    this.bmp = this.chars
      .map(char => ({ char, options: this.props }))
      .map(createBMP);
  }
}

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
export class Charset {
  static Hirogana = {
    startCode: 12353,
    endCode: 12438
  };
  constructor(charset = Charset.Hirogana, {
    fontSize = 18,
    fillStyle = '#46b843',
    fontFamily = 'Arial'
  } = {}) {
    this.props = {
      fontFamily,
      fontSize,
      fillStyle,
      charset
    };
    this.chars = new Array(charset.endCode + 1 - charset.startCode)
      .fill(charset.startCode)
      .map(incrementCode)
      .map(getChar);
    this.bmp = this.chars
      .map(char => ({ char, options: this.props }))
      .map(createBMP);
  }
}

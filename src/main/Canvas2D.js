export class Canvas2D {
  constructor(
    width = 18,
    height = 18,
    {
      fontSize = 18,
      textAlign = 'center',
      fillStyle = '#46b843',
      textBaseline = 'middle',
      fontFamily = 'Arial',
      fontWeight = 'normal'
    } = {}
  ) {
    this.output = document.createElement('canvas');
    this.output.width = width;
    this.output.height = height;
    this.ctx = this.output.getContext('2d');
    this.ctx.fillStyle = fillStyle;
    this.ctx.textAlign = textAlign;
    this.ctx.textBaseline = textBaseline;
    this.ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  }
}

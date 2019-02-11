import * as PIXI from 'pixi.js';
import { Hirogana } from './Hirogana';
import { Canvas2D } from './Canvas2D';

export class Chain {
  constructor({
    charSet = new Hirogana(),
    refreshTime = 500,
    maxLength = 15,
    startX = 0,
    startY = 0,
    cols = 16,
    rows = 9,
    cellSize = 18
  } = {}) {
    this.props = {
      charSet,
      refreshTime,
      maxLength
    };
    this.stepSize = charSet.props.fontSize;
    this.tail = this.generate();
    this.sprite = new PIXI.Sprite(this.texture());
    this.sprite.x = startX;
    this.sprite.y = startY;
    this.chainStart = Date.now();
  }
  random = (min = 3, max = 5) => {
    return min + Math.floor(Math.random() * (max - min));
  };
  randomChar = () => {
    const { charSet } = this.props;
    return charSet.bmp[this.random(0, charSet.chars.length)];
  };
  generate = () => {
    return new Array(this.random()).fill(0).map(this.randomChar);
  };
  texture = () => {
    const canvas = new Canvas2D(
      this.stepSize,
      this.stepSize * this.tail.length
    );
    this.tail.forEach((img, index) => {
      canvas.ctx.drawImage(img, 0, this.stepSize * index);
    });
    return new PIXI.Texture(new PIXI.BaseTexture(canvas.output));
  };
  grow = () => {
    if (this.tail.length + 1 <= this.props.maxLength) {
      this.tail = [this.randomChar, ...this.tail];
    }
  };
  dropChain = () => {
    this.sprite.y += this.stepSize;
  };
  renewChars = () => {
    this.tail = this.tail.map(this.randomChar);
    this.sprite.texture = this.texture();
  };
  update = () => {
    const timeNow = Date.now();
    if (this.chainStart + this.props.refreshTime < timeNow) {
      this.chainStart = timeNow;
      this.grow();
      this.renewChars();
      this.dropChain();
    }
  };
}

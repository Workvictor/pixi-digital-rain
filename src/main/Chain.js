import * as PIXI from 'pixi.js';
import { Char } from './Char';

export class Chain {
  static tint = 0x15b519;
  static tintHighlight = 0xe2fe70;
  constructor({
    textures,
    size = 18,
    gridHeight = 0,
    stepSizePerFrame = 0.25 + Math.random() * 0.5,
    growTimeout = 10 + Math.random() * 5,
    getRandomX = () => 0,
    getRandomY = () => 0,
    onRemove = () => null,
    getEmptyId = () => 0
  } = {}) {
    this.onRemove = onRemove;
    this.getEmptyId = getEmptyId;
    this.textures = textures;
    this.gridHeight = gridHeight;
    this.getRandomX = getRandomX;
    this.getRandomY = getRandomY;
    this.shouldRemove = false;
    this.stepSizePerFrameInitial = stepSizePerFrame;
    this.stepSizePerFrame = stepSizePerFrame;
    this.size = size;
    this.growTimeout = growTimeout;
    this.maxLength = Math.floor(gridHeight / size);
    this.chars = [];
    this.tail = new PIXI.Container();
    this.init();
    this.growCount = 0;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(this.dropChain);
    this.ticker.start();
  }

  init = () => {
    if (this.chars.length) {
      this.chars.forEach(char => {
        char.destroy();
        delete char.sprite;
      });
    }
    this.id = this.getEmptyId();
    this.chars = [];
    this.chars = [this.createChar()];
    this.chars[this.chars.length - 1].sprite.tint = Chain.tintHighlight;
    this.tail.removeChildren();
    this.tail.x = this.getRandomX(this.id);
    this.tail.y = this.getRandomY();
    this.tail.addChild(this.chars[this.chars.length - 1].sprite);
  };

  createChar = () => {
    return new Char({
      size: this.size,
      textures: this.textures,
      refreshRate: this.growTimeout // 10 + Math.random() * 10
    });
  };

  grow = () => {
    if (this.chars.length <= this.maxLength) {
      this.stepSizePerFrame *= 1.1;
      this.chars.push(this.createChar());
      const index = this.chars.length - 1;
      this.chars[index].sprite.y =
        this.chars.length * this.chars[index].sprite.height;
      this.chars[index].sprite.tint = Chain.tintHighlight;
      this.chars.forEach(({ sprite }, id) => {
        sprite.alpha = 1 - (this.chars.length - id) / this.chars.length;
        if (id < index) sprite.tint = Chain.tint;
      });
      this.tail.addChild(this.chars[index].sprite);
    }
  };

  remove = () => {
    this.stepSizePerFrame = this.stepSizePerFrameInitial;
    this.onRemove(this.id);
    this.init();
  };

  dropChain = dt => {
    this.tail.y += this.stepSizePerFrame * dt;
    this.growCount += dt;
    if (this.tail.y > this.gridHeight) {
      this.remove();
    }
    if (this.growCount > this.growTimeout) {
      this.growCount = 0;
      this.grow();
    }
  };
}

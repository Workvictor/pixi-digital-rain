import * as PIXI from 'pixi.js';
import { Chain } from './Chain';

export class Grid {
  constructor({ cellSize, width, height, textures } = {}) {
    this.textures = textures;
    this.emptyCols = [];
    this.maxChainsCount = width / cellSize;
    this.setSizes(width, height, cellSize);
    this.container = new PIXI.Container();
    this.container.addChild(
      new PIXI.Graphics()
        .beginFill(0x141e14)
        .drawRect(0, 0, width, height)
        .endFill()
    );
    this.chains = [];
    this.addChain();
    this.addChainTimer = 0;
    this.addChainTimeout = 10;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(this.addChainTicker);
    this.ticker.start();
  }

  setSizes = (width = 0, height = 0, cellSize = this.cellSize) => {
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.cols = Math.ceil(width / cellSize);
    this.rows = Math.ceil(height / cellSize);
    for (let i = 0; i < this.cols; i++) {
      this.emptyCols.push(i);
    }
  };

  addChainTicker = () => {
    this.addChainTimer++;
    if (this.addChainTimer > this.addChainTimeout) {
      this.addChainTimer = 0;
      this.addChain();
    }
  };

  addChain = () => {
    if (this.chains.length <= this.maxChainsCount) {
      this.chains.push(this.createChain(this.chains.length));
      this.container.addChild(this.chains[this.chains.length - 1].tail);
    }
  };

  createChain = () => {
    return new Chain({
      onRemove: id => {
        this.emptyCols.push(id);
      },
      getEmptyId: () => {
        const index = Math.floor(Math.random() * this.emptyCols.length);
        const id = this.emptyCols.splice(index, 1)[0];
        return id;
      },
      textures: this.textures,
      gridHeight: this.height,
      getRandomX: this.randomX,
      getRandomY: this.randomY
    });
  };

  randomY = () => {
    const top = this.height / 4;
    return -top + Math.floor(Math.random() * top);
  };

  randomX = id => {
    return id * this.cellSize;
  };
}

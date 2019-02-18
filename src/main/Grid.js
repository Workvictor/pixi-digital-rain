import * as PIXI from 'pixi.js';
import { Tail } from './Tail';
import { MAIN_CONSTANTS, getRange } from './Main';

export class Grid {
  constructor({
    cellSize,
    width,
    height,
    textures,
    growRateRange = MAIN_CONSTANTS.growRateRange
  } = {}) {
    this.cellSize = cellSize;
    this.textures = textures;
    this.growRateRange = growRateRange;

    this.init(width, height, cellSize, textures);
  }

  init = (
    width,
    height,
    cellSize = this.cellSize,
    textures = this.textures
  ) => {
    const maxChainsCount = Math.floor(width / cellSize);
    this.container = new PIXI.Container();
    for (let i = 0; i < maxChainsCount; i++) {
      this.container.addChild(
        new Tail({
          textures,
          maxLength: Math.ceil(height / cellSize),
          x: i * cellSize,
          growRate: getRange(this.growRateRange),
        })
      );
    }
  };
}

import * as PIXI from 'pixi.js';
import { Charset } from './Charset';
import { Chain } from './Chain';

export class Grid {
  constructor({ charSet, cols = 20, rows = 10, cellSize = 18 } = {}) {
    this.props = {
      cols,
      rows,
      charSet,
      cellSize
    };
    this.init();
  }
  init = () => {
    const { cols, rows, charSet, cellSize } = this.props;
    this.updateSteps = new Array(cols).fill(0).map((i, id)=>id);
    this.charSet =
      charSet ||
      new Charset(Charset.Hirogana, {
        fontSize: cellSize
      });
    this.chains = new Array(cols).fill(0).map((i, id) => {
      return new Chain({
        charSet: this.charSet,
        startX: (cellSize + 8) * id,
        startY: 0,
        cols,
        rows,
        cellSize
      });
    });
    this.pushContainer(this.chains.map(chain => chain.sprite));
  };
  pushContainer = (sprites = []) => {
    this.container = new PIXI.Container();
    sprites.forEach(sprite => {
      this.container.addChild(sprite);
    });
  };
  resize = (width = 0, height = 0, cellSize = this.props.cellSize) => {
    this.props = {
      ...this.props,
      cols: Math.ceil(width / cellSize),
      rows: Math.ceil(height / cellSize),
      cellSize
    };
    this.init();
  };
  update = () => {
    if (this.updateSteps.length > 0) {
      const step = Math.floor(Math.random() * this.updateSteps.length);
      const stepIndex = this.updateSteps[step];
      this.updateSteps = [
        ...this.updateSteps.slice(0, step),
        ...this.updateSteps.slice(step+1),
      ]
      this.chains[stepIndex].update();
    } else {
      const { cols } = this.props;
      this.updateSteps = new Array(cols).fill(0).map((i, id)=>id);
    }
    this.pushContainer(this.chains.map(chain => chain.sprite));
  };
}

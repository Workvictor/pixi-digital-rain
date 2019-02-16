import * as PIXI from 'pixi.js';

function shuffle(array = []) {
  const copy = [];
  const ids = new Array(array.length).fill(0).map((i, id) => i + id);
  while (ids.length) {
    const id = Math.floor(Math.random() * ids.length);
    copy.push(array[ids[id]]);
    ids.splice(id, 1);
  }
  return copy;
}

export class Char {
  constructor({ refreshRate = 20, textures } = {}) {
    this.sprite = new PIXI.extras.AnimatedSprite(shuffle(textures));
    this.timerCount = 0;
    this.refreshRate = refreshRate;
    this.shouldUpdate = false;
    this.ticker = new PIXI.ticker.Ticker();
    this.ticker.add(this.update);
    this.ticker.start();
    // this.timer();
  }

  timer=()=>{
    const tId = setTimeout(()=>{
      console.log('timer', tId);
    }, 1000)
  }

  update = dt => {
    this.timerCount += dt;
    if (this.timerCount > this.refreshRate && this.sprite) {
        this.sprite.gotoAndStop(this.sprite.currentFrame + 1);
        this.timerCount = 0;
    }
  };
  
  destroy = () => {
    this.ticker.stop();
    this.sprite.destroy();
  };
}

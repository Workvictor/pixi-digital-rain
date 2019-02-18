import * as PIXI from 'pixi.js';
import { MAIN_CONSTANTS, getRange } from './Main';
import { Timer } from './Timer';
import { Charset } from './Charset';

export class Tail {
  constructor({
    textures = new Charset(),
    x = 0,
    coolDownRange = MAIN_CONSTANTS.coolDownRange,
    growRate = MAIN_CONSTANTS.growRate,
    fadeRate = MAIN_CONSTANTS.fadeRate,
    tint = MAIN_CONSTANTS.tint,
    highlightTint = MAIN_CONSTANTS.highlight,
    chanceToRevertChar = MAIN_CONSTANTS.chanceToRevertChar,
    minPlayCount = MAIN_CONSTANTS.minPlayCount,
    maxPlayCount = MAIN_CONSTANTS.maxPlayCount,
    maxLength = MAIN_CONSTANTS.maxLength,
    playFramesTimeout = MAIN_CONSTANTS.playFramesTimeout,
  } = {}) {
    let headIndex = 0;

    const decayRate = growRate / (maxLength * fadeRate);

    const getPlayCount = () =>
      minPlayCount + Math.floor(Math.random() * maxPlayCount);

    const playFrames = (
      sprite = new PIXI.extras.AnimatedSprite(textures),
      playCount = 0,
      timeout = 120
    ) => {
      if (playCount > 0) {
        new Timer({
          timeout: playFramesTimeout,
          onTick: ()=>{
            sprite.gotoAndStop(sprite.currentFrame + 1);
            playCount--;
            playFrames(sprite, playCount, timeout);
          }
        });
      }
    };

    const eachSpriteDo = (sprites = [], ...funcs) => {
      sprites.forEach(sprite => {
        funcs.forEach(func => {
          if (func instanceof Function) func(sprite);
        });
      });
    };

    const highlight = (
      container = new PIXI.Container(),
      color = tint,
      colorHighlight = highlightTint
    ) => {
      if (container.children[headIndex - 1]) {
        container.children[headIndex - 1].tint = color;
      }
      if (container.children[headIndex]) {
        container.children[headIndex].tint = colorHighlight;
        container.children[headIndex].visible = true;
        headIndex++;
      }
    };

    const playAnimation = (
      sprite = new PIXI.extras.AnimatedSprite(textures)
    ) => {
      if (Math.random() > 1 - chanceToRevertChar) {
        playFrames(sprite, getPlayCount());
      }
    };

    const fadeSprite = (sprite = new PIXI.extras.AnimatedSprite(textures)) => {
      if (sprite.visible) {
        sprite.alpha -= decayRate;
        playAnimation(sprite);
        if (sprite.alpha <= 0) {
          sprite.visible = false;
          sprite.alpha = 1;
        }
      }
    };

    const initTail = (
      container = new PIXI.Container(),
      length = maxLength,
      color = tint
    ) => {
      for (let i = 0; i <= length; i++) {
        const sprite = new PIXI.extras.AnimatedSprite(textures);
        sprite.y = i * sprite.height;
        sprite.tint = color;
        sprite.visible = false;
        sprite.gotoAndStop(Math.floor(Math.random() * sprite.totalFrames));
        container.addChild(sprite);
      }
      container.x = x;
      return container;
    };

    const onFadeTimer = () => {
      eachSpriteDo(tail.children, fadeSprite);
      return true;
    };

    const initFadeTimer = () => {
      new Timer({
        timeout: growRate,
        onTick: onFadeTimer
      });
    };

    const initGrowTimer = () => {
      headIndex = 0;
      new Timer({
        timeout: growRate,
        onTick: onGrowTimer
      });
    };

    const initCooldownTimer = () => {
      new Timer({
        timeout: getRange(coolDownRange),
        onTick: initGrowTimer
      });
    };

    const onGrowTimer = () => {
      highlight(tail);
      if (headIndex === maxLength) {
        initCooldownTimer();
      }
      return headIndex < maxLength;
    };

    const tail = initTail();
    initCooldownTimer();
    initFadeTimer();

    return tail;
  }
}

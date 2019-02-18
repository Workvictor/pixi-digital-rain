import React, { Component } from 'react';

import { App } from './App';

export const MAIN_CONSTANTS = {
  textures: [],
  coolDownRange: [100, 3000],
  growRate: 150,
  growRateRange: [100, 300],
  fadeRate: 80,
  playFramesTimeout: 120,
  backgroundColor: 0x141e14,
  tint: 0x15b519,
  highlight: 0xe2fe70,
  chanceToRevertChar: 0.1,
  minPlayCount: 1,
  maxPlayCount: 4,
  maxLength: 10,
  cellSize: 20,
  PixelateFilterOptions: {
    x: 2,
    y: 2
  },
  CRTFilterOptions: {
    curvature: 0.4,
    lineWidth: 0.5,
    lineContrast: 0.8,
    vignetting: 0.1,
    noise: 0.08
  }
};

export const getRange = (range = [0, 1]) =>
  range[0] + Math.random() * (range[1] - range[0]);

export class Main extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

  onKeyDown = ({ keyCode }) => {};

  onKeyUp = () => {};

  render() {
    return <App />;
  }
}

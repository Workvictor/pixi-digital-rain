import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';
import { Grid } from './Grid';
import { CRTFilter } from '@pixi/filter-crt';
import { AdvancedBloomFilter } from '@pixi/filter-advanced-bloom';
import { PixelateFilter } from '@pixi/filter-pixelate';
import { Charset } from './Charset';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export class App extends Component {
  display = React.createRef();

  componentDidMount = () => {
    this.initMain();
  };

  onResize = () => {
    const { offsetWidth, offsetHeight } = this.display.current;
    this.app.renderer.resize(offsetWidth, offsetHeight);
  };

  initMain = () => {
    if (this.display) {
      const cellSize = 26;
      const { offsetWidth, offsetHeight } = this.display.current;
      window.addEventListener('resize', this.onResize);

      const hiroganaTextures = new Charset({ fontSize: cellSize });

      this.crtFilter = new CRTFilter({
        curvature: 0.4,
        lineWidth: 0.5,
        lineContrast: 0.8,
        vignetting: 0.1,
        noise: 0.08
      });

      this.app = new PIXI.Application({
        width: offsetWidth,
        height: offsetHeight,
        backgroundColor: 0x141e14
      });

      const grid = new Grid({
        cellSize,
        textures: hiroganaTextures,
        width: offsetWidth,
        height: offsetHeight
      });

      const bg = new PIXI.Graphics()
        .beginFill(0x141e14)
        .drawRect(0, 0, offsetWidth, offsetHeight)
        .endFill();
        bg.cacheAsBitmap = true;

      this.display.current.appendChild(this.app.view);
      this.app.start();
      this.app.stage.filters = [
        new AdvancedBloomFilter(),
        new PixelateFilter({
          x: 2,
          y: 2
        }),
        this.crtFilter
      ];
      this.app.stage.addChild(bg);
      this.app.stage.addChild(grid.container);
      this.app.ticker.add(this.gameLoop);
    }
  };

  gameLoop = dt => {
    this.crtFilter.seed = Math.random();
  };

  render() {
    return <Wrapper ref={this.display} />;
  }
}

import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';
import { Grid } from './Grid';
import { Chain } from './Chain';
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
    this.grid.resize(offsetWidth, offsetHeight);
  };

  initMain = () => {
    if (this.display) {
      const cellSize = 22;
      const { offsetWidth, offsetHeight } = this.display.current;
      window.addEventListener('resize', this.onResize);

      this.app = new PIXI.Application({
        width: offsetWidth,
        height: offsetHeight,
        backgroundColor: 0x141e14
      });

      const charSet = new Charset(Charset.Hirogana, {
        fontSize: cellSize
      });
      this.grid = new Grid({
        charSet,
        cellSize,
        cols: Math.ceil(offsetWidth / cellSize),
        rows: Math.ceil(offsetHeight / cellSize)
      });

      this.display.current.appendChild(this.app.view);
      this.app.start();
      this.app.ticker.add(this.gameLoop);
    }
  };

  gameLoop = () => {
    this.grid.update();
    this.app.stage.addChild(this.grid.container);
  };

  render() {
    return <Wrapper ref={this.display} />;
  }
}

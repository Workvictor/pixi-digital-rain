import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';

import { App } from './App';

// const Wrapper = styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   overflow: hidden;
// `;

export class Main extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

    onKeyDown = ({ keyCode }) => {
    };

    onKeyUp = () => {
    };

  //   gameLoop = dt => {
  //     const dvY = this.friction + this.night_raider.accelerationY * dt;
  //     const dvX = this.night_raider.accelerationX * dt;
  //     if (this.night_raider.velosityY + dvY < 0) {
  //       this.night_raider.velosityY += dvY;
  //     } else {
  //       this.night_raider.velosityY = 0;
  //     }
  //     this.night_raider.velosityX += dvX;
  //     this.night_raider.y += this.night_raider.velosityY * dt;
  //     this.night_raider.x += this.night_raider.velosityX * dt;
  //   };

  render() {
    return <App />;
  }
}

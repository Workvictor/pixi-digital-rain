import React, { Component } from 'react';
import * as PIXI from 'pixi.js';
import styled from 'styled-components';
import { Hirogana } from './Hirogana';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export class App extends Component {
  display = React.createRef();
  resources = {};

  componentDidMount = () => {
    const loader = new PIXI.loaders.Loader();
    loader.add('btn', './assets/btn.png');
    loader.load(this.initMain);
    this.hirogana = new Hirogana();
  };

  onResize = () => {
    this.app.renderer.resize(this.display.current.offsetWidth, this.display.current.offsetHeight);
  };

  initMain = (loader, resources) => {
    this.resources = { ...resources };
    if (this.display) {
      window.addEventListener('resize', this.onResize);
      this.app = new PIXI.Application({
        width: this.display.current.offsetWidth,
        height: this.display.current.offsetHeight,
        backgroundColor: 0x141e14
      });
      this.app.stop();
      this.UIContainer = new PIXI.Container();
      this.display.current.appendChild(this.app.view);
      this.app.start();
      this.btn = new PIXI.Sprite(this.resources['btn'].texture);
      this.btn.x = 130;
      this.btn.y = 400;
      this.UIContainer.addChild(this.btn);
      this.app.stage.addChild(this.UIContainer);
      this.hirogana.symbols.forEach((sprite, id)=>{
        sprite.x = sprite.width * id;
        this.app.stage.addChild(sprite);
      })
      
    }
  };


  render() {
    return <Wrapper ref={this.display} />;
  }
}

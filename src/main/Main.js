import React, { Component } from 'react';

import { App } from './App';

export class Main extends Component {
  componentDidMount = () => {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  };

    onKeyDown = ({ keyCode }) => {
    };

    onKeyUp = () => {
    };

  render() {
    return <App />;
  }
}

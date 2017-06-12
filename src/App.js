import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1> Conway's Game of life</h1>
        <p>Toggle life by clicking cells</p>
        <p>See what happens to them over generations</p>
        <p> For full details on <a href='https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Conway's game of Life, read about it here</a></p>

        <Board />
      </div>
    );
  }
}



export default App;

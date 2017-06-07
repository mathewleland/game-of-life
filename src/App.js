import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.js'

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1> Conway's Game of life</h1>
        <p>Toggle life by clicking cells</p>
        <p>See what happens to them over generations</p>

        <Board />
      </div>
    );
  }
}

export default App;

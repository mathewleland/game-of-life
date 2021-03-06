import React from 'react';
import Cell from './Cell.js';
import Counter from './Counter.js';

class Board extends React.Component {
  constructor() {
    super();

    this.toggleCell = this.toggleCell.bind(this);
    this.countNeighbors = this.countNeighbors.bind(this);
    this.stepOneGeneration = this.stepOneGeneration.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.randomBoard = this.randomBoard.bind(this);
    this.startGenerations = this.startGenerations.bind(this);
    this.stopRunning = this.stopRunning.bind(this);

    this.state = {
      board: [],
      generation: 1,
      running: false
    };
  }

  toggleCell(x,y) {
    const newBoard = this.state.board;
    newBoard[x][y] = newBoard[x][y] ? false : true;
    this.setState({ newBoard});
  }



  stepOneGeneration() {
    let newBoard = this.state.board;

    newBoard = newBoard.map((row, y) => {
      return row.map((cell, x) => {
        const alreadyAlive = this.state.board[y][x];

        const neighbors = this.countNeighbors(y, x);
        if (alreadyAlive && (neighbors === 2 || neighbors === 3)) {
          return true;
        } else if (!alreadyAlive && neighbors === 3) {
          return true;
        } else return false;
      })
    })

    this.setState({
      board: newBoard,
      generation: this.state.generation + 1
    });
  }

  startGenerations() {
    this.setState({ running: true })
    this.interval = setInterval(() => {
      this.stepOneGeneration();
    },200);
  }

  stopRunning() {
    clearInterval(this.interval);
    this.setState({ running: false})
  }

  countNeighbors(row,col) {
    let neighbors = 0;
    const lastRow = this.state.board.length - 1;
    const lastCol = this.state.board[0].length - 1;
    const board = this.state.board;

    //each statement includes a qualifier to make sure you don't try to count a space off of the board
    if ( row < lastRow && board[row+1][col] ) neighbors++; //bottom
    if ( row > 0 && board[row-1][col] ) neighbors++; //top
    if ( col < lastCol && board[row][col+1] ) neighbors++; // right
    if ( col > 0 && board[row][col-1] ) neighbors++; // left
    if ( col < lastCol && row < lastRow && board[row+1][col+1] ) neighbors++; //bottom right
    if ( row < lastRow && col > 0 && board[row+1][col-1] ) neighbors++; //bottom left
    if ( row > 0 && col < lastCol && board[row-1][col+1] ) neighbors++; // top right
    if ( row > 0 && col > 0 && board[row-1][col-1] ) neighbors++; //top left

    return neighbors;
  }

  clearBoard() {
    this.stopRunning();
    let newBoard = this.state.board;

    newBoard = newBoard.map((row, y) => {
      return row.map((cell, x) => {
        return false;
      })
    })

    this.setState({ board: newBoard, generation: 1 })
  }

  randomBoard() {
    this.stopRunning();
    let newBoard = [];
    for (let i=0; i<16; i++) {
      const tempRow = [];
      for (let j=0; j<30; j++) {
        tempRow.push(false);
      }
      newBoard.push(tempRow);
    }

    newBoard = newBoard.map((row, y) => {
      return row.map((cell, x) => {
        const randomNumber = Math.floor( Math.random() * 3);
        if (randomNumber < 1) return true;
        else return false;
      })
    });

    this.setState( {board: newBoard, generation: 1} );
  }

  componentDidMount() {
    this.randomBoard();
  }

  render() {

    let playButton =
      this.state.running ?
      <button onClick={this.stopRunning} >||</button>
      :
      <button onClick={this.startGenerations}>▶</button>;


    return (
      <div>
        <Counter generation={this.state.generation}/>

        <div className='buttons'>
          {playButton}
          <button onClick={this.clearBoard}>Clear</button>
          <button onClick={this.randomBoard}>New Board </button>
          <button onClick={this.stepOneGeneration}> Step</button>
        </div>



        <div className='board'>

        {this.state.board.map((row, i) => {
          return row.map((cell, j) => {
            return <Cell
              key={10*i + j}
              row={i}
              col={j}
              alive={this.state.board[i][j]}
              toggleCell={this.toggleCell}
            />
          })
        })}
        </div>

        <div className="nucleus"></div>
      </div>
    )
  }
}

export default Board;

import React from 'react';

class Cell extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      onceAlive: false
    }
  }

  componentDidUpdate() {
    if (this.props.alive) {
      if (this.state.onceAlive) {
        return;
      } else {
        this.setState({ onceAlive: true })
      }

    }
  }

  handleClick() {
    let x = this.props.col;
    let y = this.props.row;
    this.props.toggleCell(y,x);
  }

  render() {
    let aliveOrDead = this.props.alive ? "alive" : "";
    let onceAlive = this.state.onceAlive ? "onceAlive" : '';
    let cssClasses = `cell ${aliveOrDead} ${onceAlive}`;

      return (
      <div className={cssClasses} onClick={this.handleClick}></div>
      )
  }
}

export default Cell;

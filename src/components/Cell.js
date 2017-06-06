import React from 'react';

class Cell extends React.Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      onceAlive: false
    }
  }

  // darken cells if they were once alive
  // componentDidUpdate() {
  //   if (this.props.alive === 0) {
  //     this.setState( { onceAlive: false });
  //   }
  //   else if (this.props.alive) {
  //     if (this.state.onceAlive) {
  //       return;
  //     } else {
  //       this.setState({ onceAlive: true })
  //     }
  //
  //   }
  // }


  handleClick() {
    let x = this.props.col;
    let y = this.props.row;
    this.props.toggleCell(y,x);
  }

  render() {
    let aliveOrDead = this.props.alive ? "alive" : "";
    let onceAlive = this.state.onceAlive ? "onceAlive" : '';
    let cssClasses = `cell ${aliveOrDead} ${onceAlive}`;
    let nucleus = this.props.alive ? 'Φ' : ""

      return (
      <div className={cssClasses} onClick={this.handleClick}> <p><span className="nucleus">{nucleus}</span></p></div>
      )
  }
}

export default Cell;

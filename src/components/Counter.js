import React from 'react';

class Counter extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="counter">
        <p> GENERATION </p>
        <h1> {this.props.generation} </h1>
      </div>
    )
  }
}

export default Counter;

import React, { Component } from 'react';
import './App.css';

class App extends Component<any, { counter: number, errorMsg?: string | null }> {
  constructor(props: any) {
    super(props);

    this.state = {
      counter: 0
    };
  }



  decrementCounter = () => {
    if (this.state.counter > 0) {
      this.setState(p => ({ counter: p.counter - 1 }));
    } else {
      this.setState({ ...this.state, errorMsg: 'Counter cannot be less than 0.' });
    }
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        {this.state.errorMsg && <h2 data-test="error-message" style={{ color: 'red' }}>{this.state.errorMsg}</h2>}
        <button
          data-test="increment-button"
          onClick={() => this.setState(p => ({ counter: p.counter + 1, errorMsg: null }))}>Increment counter</button>
        <button data-test="decrement-button"
          onClick={this.decrementCounter}>Decrement counter</button>
      </div>
    );
  }
}

export default App;

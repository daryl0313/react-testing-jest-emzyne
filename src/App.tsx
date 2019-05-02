import React, { Component } from 'react';
import './App.css';

import Congrats from './Congrats';
import { GuessedWords } from './GuessedWords';

class App extends Component<any, { counter: number, errorMsg?: string | null }> {
  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={true} />
        <GuessedWords guessedWords={[
          { guessedWord: 'train', letterMatchCount: 3 }
        ]} />
      </div>
    );
  }
}

export default App;

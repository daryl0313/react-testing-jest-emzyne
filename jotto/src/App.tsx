import React, { Component } from 'react';
import './App.css';

import Congrats from './Congrats';
import { GuessedWords } from './GuessedWords';
import { connect } from 'react-redux';
import { State } from './reducers';
import { getSecretWord } from "./actions";
import { GuessedWord } from './reducers/guessedWordsReducer';
import Input from './Input';

export interface IAppProps {
  success: boolean;
  guessedWords: GuessedWord[];
  secretWord?: string | null;
  getSecretWord: typeof getSecretWord;
}

interface IAppState {
}

class UnconnectedApp extends Component<IAppProps, IAppState> {
  componentDidMount() {
    this.props.getSecretWord();
  }

  render() {
    return (
      <div className="container">
        <h1>Jotto</h1>
        <Congrats success={this.props.success} />
        <Input />
        <GuessedWords guessedWords={this.props.guessedWords} />
      </div>
    );
  }
}

const mapStateToProps = (state: State): IAppProps => {
  const { success, guessedWords, secretWord } = state;
  return { success: success!, guessedWords: guessedWords!, secretWord } as IAppProps;
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);

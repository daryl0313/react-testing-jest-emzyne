import React, { Component, Dispatch } from 'react';
import './App.css';

import Congrats from './Congrats';
import { GuessedWords } from './GuessedWords';
import { connect } from 'react-redux';
import { State } from './reducers';
import { getSecretWord, ActionTypes } from "./actions";
import { GuessedWord } from './reducers/guessedWordsReducer';
import { Action } from 'redux';
import Input from './Input';

export interface IAppProps {
  success: boolean;
  guessedWords: GuessedWord[];
  secretWord?: string | null;
  getSecretWord: () => () => Promise<void>;

}

interface IAppState {
  counter: number,
  errorMsg?: string | null
}

export class UnconnectedApp extends Component<IAppProps, IAppState> {
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

const mapStateToProps = (state: State): Pick<IAppProps, 'success' | 'guessedWords' | 'secretWord'> => {
  const { success, guessedWords, secretWord } = state;
  return { success: success!, guessedWords: guessedWords!, secretWord };
};

export default connect(mapStateToProps, { getSecretWord })(UnconnectedApp);

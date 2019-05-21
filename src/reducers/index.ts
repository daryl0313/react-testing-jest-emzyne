import { combineReducers } from 'redux';
import success from './successReducer';
import guessedWords, { GuessedWord } from './guessedWordsReducer';
import secretWord from './secretWordReducer';

export default combineReducers<State>({
    success,
    guessedWords,
    secretWord
});

export interface State {
    success?: boolean;
    guessedWords?: GuessedWord[];
    secretWord?: string | null;
}

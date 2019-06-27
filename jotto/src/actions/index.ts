import axios from 'axios';
import { State } from "../reducers";
import { getLetterMatchCount } from '../helpers';
import { GuessedWord } from "../reducers/guessedWordsReducer";
import { Dispatch, Action, AnyAction } from "redux";

export enum ActionTypes {
    CORRECT_GUESS = 'CORRECT_GUESS',
    GUESS_WORD = 'GUESS_WORD',
    SET_SECRET_WORD = 'SET_SECRET_WORD'
};

export const guessWord = (guessedWord: string) => (dispatch: Dispatch<Action<ActionTypes>>, getState: () => State) => {
    const { secretWord } = getState();
    const letterMatchCount = secretWord ? getLetterMatchCount(guessedWord, secretWord) : 0;
    dispatch({
        type: ActionTypes.GUESS_WORD,
        payload: <GuessedWord>{ guessedWord, letterMatchCount }
    });
    if (guessedWord === secretWord) {
        dispatch({ type: ActionTypes.CORRECT_GUESS });
    }
};

export const getSecretWord = () => {
    return async (dispatch: Dispatch<Action<ActionTypes>>) => {
        const response = await axios.get('http://localhost:3030');
        dispatch({
            type: ActionTypes.SET_SECRET_WORD,
            payload: response.data
        });
    }
}

export interface GuessWordAction extends Action<ActionTypes> {
    type: ActionTypes.GUESS_WORD,
    payload: GuessedWord
}
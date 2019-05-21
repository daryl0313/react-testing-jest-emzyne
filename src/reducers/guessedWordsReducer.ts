import { Action } from "redux";
import { ActionTypes, GuessWordAction } from "../actions";

export default (state: GuessedWord[] = [], action: GuessWordAction): GuessedWord[] => {
    switch (action.type) {
        case ActionTypes.GUESS_WORD:
            return [...state, action.payload]
        default:
            return state;
    }
}

export interface GuessedWord {
    guessedWord: string,
    letterMatchCount: number
}
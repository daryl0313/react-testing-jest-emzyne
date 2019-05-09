import { correctGuess, ActionTypes } from "./";

describe('correctGuess', () => {
    test('returns an action with type "CORRECT_GUESS"', () => {
        const action = correctGuess();
        expect(action).toEqual({ type: ActionTypes.CORRECT_GUESS });
    });
});
import { ActionTypes } from "../actions";
import successReducer from "./successReducer";

test('returns default initial state of "false" when no action is passed', () => {
    const newState = successReducer();
    expect(newState).toEqual(false);
});
test('return state of true upon receiving an action of type "CORRECT_GUESS', () => {
    const newState = successReducer(undefined, { type: ActionTypes.CORRECT_GUESS });
    expect(newState).toEqual(true);
});
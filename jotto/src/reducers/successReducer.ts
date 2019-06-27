import { Action } from "redux";
import { ActionTypes } from "../actions";

const reducer = (state = false, action?: Action<ActionTypes>): boolean => {
    if (action && action.type === ActionTypes.CORRECT_GUESS) {
        state = true;
    }
    return state;
};

export default reducer;
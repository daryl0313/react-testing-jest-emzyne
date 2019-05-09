import { Action } from "redux";
import { ActionTypes } from "../actions";

const reducer = (state = false, action?: Action<ActionTypes>): boolean => {
    return !!action && action.type === ActionTypes.CORRECT_GUESS;
};

export default reducer;
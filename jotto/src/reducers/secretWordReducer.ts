import { AnyAction } from "redux";
import { ActionTypes } from '../actions';

export default (state: string | null = null, action: AnyAction): string | null => {
    switch (action.type) {
        case ActionTypes.SET_SECRET_WORD:
            return action.payload;
        default:
            return state;
    }
}
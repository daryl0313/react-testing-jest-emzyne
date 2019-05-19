import { Action } from "redux";
import { ActionTypes } from "../actions";

export default (state: string[] = [], action: Action<ActionTypes>): string[] => {
    return state;
}

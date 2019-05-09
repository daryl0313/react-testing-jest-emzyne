import { ShallowWrapper } from "enzyme";
import { createStore } from "redux";

import rootReducer from '../src/reducers';

export const storeFactory = <T>(initialState: T) => {
    return createStore(rootReducer, initialState);
}

export const findByTestAttr = (wrapper: ShallowWrapper, val: string) => {
    return wrapper.find(`[data-test="${val}"]`);
}

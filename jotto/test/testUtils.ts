import { createStore, applyMiddleware } from "redux";

import rootReducer from '../src/reducers';
import { middlewares } from "../src/configureStore";

export const storeFactory = <T>(initialState?: T) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}

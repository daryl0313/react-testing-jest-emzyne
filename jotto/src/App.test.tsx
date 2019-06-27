import React from 'react';
import { render, RenderResult, wait } from "@testing-library/react";

import { storeFactory } from "../test/testUtils";
import App, { UnconnectedApp, IAppProps } from "./App";
import { State } from './reducers';
import { Provider } from 'react-redux';
import { getSecretWord } from './actions';

const setup = (state: Pick<State, 'success' | 'guessedWords'>, getSecretWord: () => () => Promise<void>) => {
    const store = storeFactory(state || {});
    return render(<Provider store={store}><UnconnectedApp success={state.success!} guessedWords={state.guessedWords!} getSecretWord={getSecretWord} /></Provider>);
}

test('"getSecretWord" runs on App mount', async () => {
    const getSecretWordMock = jest.fn();
    const props = {
        success: false,
        guessedWords: []
    }
    setup(props, getSecretWordMock);

    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
});

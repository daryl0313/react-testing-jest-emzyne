import React from 'react';
import { shallow } from 'enzyme';

import { storeFactory } from "../test/testUtils";
import App, { UnconnectedApp, IAppProps } from "./App";
import { State } from './reducers';

const setup = (state?: State) => {
    const store = storeFactory(state || {});
    const wrapper = shallow(<App store={store} />).dive().dive();
    return wrapper;
}

describe('redux properties', () => {
    test('has access to success state', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('has access to "secretWord" state', () => {
        const secretWord = 'party';
        const wrapper = setup({ secretWord });
        const successProp = wrapper.instance().props.secretWord;
        expect(successProp).toBe(secretWord);
    });
    test('has access to "guessedWords" state', () => {
        const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
        const wrapper = setup({ guessedWords })
        const guessedWordsProp = wrapper.instance().props.guessedWords;
        expect(guessedWordsProp).toBe(guessedWords);
    });
    test('"guessWord" action creator is a function prop', () => {
        const wrapper = setup();
        const getSecretWordProp = wrapper.instance().props.getSecretWord;
        expect(getSecretWordProp).toBeInstanceOf(Function);
    });
});

test('"getSecretWord" runs on App mount', () => {
    const getSecretWordMock = jest.fn();
    const props: IAppProps = {
        getSecretWord: getSecretWordMock,
        success: false,
        guessedWords: []
    }
    const wrapper = shallow(<UnconnectedApp {...props} />);

    wrapper.instance().componentDidMount!();

    const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
    expect(getSecretWordCallCount).toBe(1);
});
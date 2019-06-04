import React from "react";
import { shallow, ShallowWrapper } from "enzyme";

import { findByTestAttr, storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput, IInputProps } from "./Input";

const setup = (initialState?: Partial<IInputProps>) => {
    const store = storeFactory(initialState);
    const wrapper = shallow(<Input store={store} />).dive().dive();
    return wrapper;
}

describe('render', () => {
    describe('word has not been guessed', () => {
        let wrapper: ShallowWrapper;
        beforeEach(() => {
            const initialState = { success: false };
            wrapper = setup(initialState);
        });
        test('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('renders input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(1);
        });
        test('renders submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(1);
        });
    });
    describe('word has been guessed', () => {
        let wrapper: ShallowWrapper;
        beforeEach(() => {
            const initialState = { success: true };
            wrapper = setup(initialState);
        });
        xtest('renders component without error', () => {
            const component = findByTestAttr(wrapper, 'component-input');
            expect(component.length).toBe(1);
        });
        test('does not render input box', () => {
            const inputBox = findByTestAttr(wrapper, 'input-box');
            expect(inputBox.length).toBe(0);
        });
        test('does not render submit button', () => {
            const submitButton = findByTestAttr(wrapper, 'submit-button');
            expect(submitButton.length).toBe(0);
        });
    });
});

describe('render props', () => {
    test('has success piece of state as prop', () => {
        const success = true;
        const wrapper = setup({ success });
        const successProp = wrapper.instance().props.success;
        expect(successProp).toBe(success);
    });
    test('"guessWord" action creator is a function prop', () => {
        const wrapper = setup();
        const guessWordProp = wrapper.instance().props.guessWord;
        expect(guessWordProp).toBeInstanceOf(Function);
    });
});

describe('input submit', () => {
    let guessWordMock: jest.Mock;
    let wrapper: ShallowWrapper<IInputProps, {}, UnconnectedInput>;
    const guessedWord = 'train';
    beforeEach(() => {
        guessWordMock = jest.fn();
        wrapper = shallow(<UnconnectedInput success={false} guessWord={guessWordMock} />);

        wrapper.instance().inputBox.current = { value: 'train' };

        findByTestAttr(wrapper, 'submit-button').simulate('click', { preventDefault() { } });
    });
    test('should call "guessWord" when button is clicked', () => {
        expect(guessWordMock.mock.calls.length).toBe(1);
    });
    test('calls guessWord with input value as argument', () => {
        const [guessWordArg] = guessWordMock.mock.calls[0];
        expect(guessWordArg).toBe(guessedWord);
    });
});

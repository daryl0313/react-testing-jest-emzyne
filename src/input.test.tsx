import React from "react";
import { render, RenderResult, cleanup, fireEvent, getByText } from "@testing-library/react";

import { storeFactory } from "../test/testUtils";
import Input, { UnconnectedInput, IInputProps } from "./Input";

const setup = (initialState?: Partial<IInputProps>): RenderResult => {
    const store = storeFactory(initialState);
    return render(<Input store={store} />);
}

afterEach(cleanup);

describe('render', () => {
    describe('word has not been guessed', () => {
        let initialState: { success: boolean };
        beforeEach(() => {
            initialState = { success: false };
        });
        test('renders component without error', () => {
            const { getByTestId } = setup(initialState);
            getByTestId('component-input');
        });
        test('renders input box', () => {
            const { getByTestId } = setup(initialState);
            getByTestId('input-box');
        });
        test('renders submit button', () => {
            const { getByTestId } = setup(initialState);
            getByTestId('submit-button');
        });
    });
    describe('word has been guessed', () => {
        let initialState: { success: boolean };
        beforeEach(() => {
            initialState = { success: true };
        });
        xtest('renders component without error', () => {
            const { getByTestId } = setup(initialState);
            getByTestId('component-input');
        });
        test('does not render input box', () => {
            const { queryByTestId } = setup(initialState);
            const el = queryByTestId('input-box');
            expect(el).toBeFalsy();
        });
        test('does not render submit button', () => {
            const { queryByTestId } = setup(initialState);
            const el = queryByTestId('submit-button');
            expect(el).toBeFalsy();
        });
    });
});

// describe('render props', () => {
//     test('has success piece of state as prop', () => {
//         const success = true;
//         const wrapper = setup({ success });
//         const successProp = wrapper.instance().props.success;
//         expect(successProp).toBe(success);
//     });
//     test('"guessWord" action creator is a function prop', () => {
//         const wrapper = setup();
//         const guessWordProp = wrapper.instance().props.guessWord;
//         expect(guessWordProp).toBeInstanceOf(Function);
//     });
// });

describe('input submit', () => {
    let guessWordMock: jest.Mock;
    const guessedWord = 'train';
    let inputBox: HTMLInputElement;
    beforeEach(() => {
        guessWordMock = jest.fn();
        const { getByPlaceholderText, getByText } = render(<UnconnectedInput success={false} guessWord={guessWordMock} />);

        inputBox = getByPlaceholderText('enter guess') as HTMLInputElement;
        inputBox.value = guessedWord;

        fireEvent.click(getByText('Submit'));
    });
    test('should call "guessWord" when button is clicked', () => {
        expect(guessWordMock.mock.calls.length).toBe(1);
    });
    test('calls guessWord with input value as argument', () => {
        const [guessWordArg] = guessWordMock.mock.calls[0];
        expect(guessWordArg).toBe(guessedWord);
    });
    test('inputBox clears on submit', () => {
        expect(inputBox.value).toBe('');
    });
});

import React from "react";
import { render, RenderResult, cleanup, fireEvent } from "@testing-library/react";

import Input, { IInputProps } from "./Input";

jest.mock('react-redux', () => ({ connect: () => (UnconnectedComponent: any) => UnconnectedComponent }));

const setup = (initialState: Partial<IInputProps> = {}): RenderResult => {
    const UnconnectedInput: React.ComponentClass<IInputProps> = Input as any;
    return render(<UnconnectedInput guessWord={initialState.guessWord!} success={initialState.success!} />);
}

afterEach(cleanup);

describe('render', () => {
    describe('word has not been guessed', () => {
        let initialState: { success: boolean };
        beforeEach(() => {
            initialState = { success: false };
        });
        test('renders input box', () => {
            const { getByPlaceholderText } = setup(initialState);
            expect(getByPlaceholderText('enter guess')).not.toBeNull();
        });
        test('renders submit button', () => {
            const { getByText } = setup(initialState);
            expect(getByText('Submit')).not.toBeNull();
        });
    });
    describe('word has been guessed', () => {
        let initialState: { success: boolean };
        beforeEach(() => {
            initialState = { success: true };
        });
        test('does not render input box', () => {
            const { queryByPlaceholderText } = setup(initialState);
            expect(queryByPlaceholderText('enter guess')).toBeNull();
        });
        test('does not render submit button', () => {
            const { queryByText } = setup(initialState);
            expect(queryByText('Submit')).toBeNull();
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
        const { getByPlaceholderText, getByText } = setup({ success: false, guessWord: guessWordMock });

        inputBox = getByPlaceholderText('enter guess') as HTMLInputElement;
        inputBox.value = guessedWord;

        fireEvent.click(getByText('Submit'));
    });
    test('should call "guessWord" when button is clicked', () => {
        expect(guessWordMock).toHaveBeenCalled();
    });
    test('calls guessWord with input value as argument', () => {
        const [guessWordArg] = guessWordMock.mock.calls[0];
        expect(guessWordArg).toBe(guessedWord);
    });
    test('inputBox clears on submit', () => {
        expect(inputBox.value).toBe('');
    });
});

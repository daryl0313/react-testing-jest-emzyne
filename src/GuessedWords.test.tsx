import React from 'react';

import { render, cleanup, RenderResult } from "@testing-library/react";

import { GuessedWords, IGuessedWordsProps } from './GuessedWords';

const defaultProps: Partial<IGuessedWordsProps> = {
    guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }]
};

const setup = (props: IGuessedWordsProps | {} = {}) => {
    const setupProps = { ...defaultProps, ...props } as IGuessedWordsProps;
    return render(<GuessedWords {...setupProps} />);
}

afterEach(cleanup);

describe('if there are no words guessed', () => {
    let getByTestId: RenderResult['getByTestId'];
    beforeEach(() => {
        getByTestId = setup({ guessedWords: [] }).getByTestId;
    })
    test('renders without error', () => {
        const el = getByTestId('component-guessed-word');
        expect(el).toBeTruthy();
    });
    test('renders instructions to guess a word', () => {
        const el = getByTestId('guess-instructions');
        expect(el.textContent).not.toBeNull();
        expect(el.textContent!.length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {
    let getAllByTestId: RenderResult['getAllByTestId'];
    const guessedWords: IGuessedWordsProps['guessedWords'] = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ]
    beforeEach(() => {
        getAllByTestId = setup({ guessedWords }).getAllByTestId;
    })
    test('renders without error', () => {
        const els = getAllByTestId('component-guessed-word');
        expect(els.length).toBe(1);
    });
    test('renders "guessed words" section', () => {
        const els = getAllByTestId('guessed-words');
        expect(els.length).toBe(1);
    });
    test('correct number of guessed words', () => {
        const els = getAllByTestId('guessed-word');
        expect(els.length).toBe(guessedWords.length);
    });
});

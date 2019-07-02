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

const expectedInitialInstructions = 'Try to guess the secret word!';
const expectedGuessedWordsTableTitle = 'Guessed Words';

describe('if there are no words guessed', () => {
    test('renders instructions to guess a word', () => {
        const { getByText } = setup({ guessedWords: [] });
        expect(getByText(expectedInitialInstructions)).not.toBeNull();
    });
    test('does not render "guessed words" section', () => {
        const { queryByText } = setup({ guessedWords: [] });
        expect(queryByText(expectedGuessedWordsTableTitle)).toBeNull();
    })
});

describe('if there are words guessed', () => {
    const guessedWords: IGuessedWordsProps['guessedWords'] = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ]
    test('renders "guessed words" section', () => {
        const { getByText } = setup({ guessedWords });
        expect(getByText(expectedGuessedWordsTableTitle)).not.toBeNull();
    });
    test('does not render instructions to guess a word', () => {
        const { queryByText } = setup({ guessedWords });
        expect(queryByText(expectedInitialInstructions)).toBeNull();
    });
    test('correct number of guessed words', () => {
        const { getAllByTestId } = setup({ guessedWords });
        const els = getAllByTestId('guessed-word');
        expect(els.length).toBe(guessedWords.length);
    });
    test('displays `guessedWord` for each guessed word object', () => {
        const { getByText } = setup({ guessedWords });
        guessedWords.forEach(gw => { getByText(gw.guessedWord) });
    });
});

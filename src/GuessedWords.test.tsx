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
    let getByText: RenderResult['getByText'];
    beforeEach(() => {
        const renderResult = setup({ guessedWords: [] });
        getByTestId = renderResult.getByTestId;
        getByText = renderResult.getByText;
    })
    test('renders without error', () => {
        getByTestId('component-guessed-word');
    });
    test('renders instructions to guess a word', () => {
        getByText('Try to guess the secret word!');
    });
});

describe('if there are words guessed', () => {
    const guessedWords: IGuessedWordsProps['guessedWords'] = [
        { guessedWord: 'train', letterMatchCount: 3 },
        { guessedWord: 'agile', letterMatchCount: 1 },
        { guessedWord: 'party', letterMatchCount: 5 },
    ]
    test('renders without error', () => {
        const { getByTestId } = setup({ guessedWords });
        getByTestId('component-guessed-word');
    });
    test('renders "guessed words" section', () => {
        const { getByTestId } = setup({ guessedWords });
        getByTestId('guessed-words');
    });
    test('correct number of guessed words', () => {
        const { getAllByTestId } = setup({ guessedWords });
        const els = getAllByTestId('guessed-word');
        expect(els.length).toBe(guessedWords.length);
    });
});

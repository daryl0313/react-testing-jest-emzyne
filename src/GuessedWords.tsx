import React from 'react';

export interface IGuessedWordsProps {
    secretWord: string;
    success: boolean;
    guessedWords: { guessedWord: string, letterMatchCount: number }[]
}

export function GuessedWords(props: IGuessedWordsProps) {
    let contents: JSX.Element | null = null;
    if (props.guessedWords.length === 0) {
        contents = (
            <span data-test="guess-instructions">
                Try to guess the secret word!
            </span>
        );
    }
    return (
        <div data-test="component-guessed-word">
            {contents}
        </div>
    );
}

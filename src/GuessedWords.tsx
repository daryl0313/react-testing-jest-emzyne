import React from 'react';

export interface IGuessedWordsProps {
    secretWord?: string;
    success?: boolean;
    guessedWords: { guessedWord: string, letterMatchCount: number }[]
}

export function GuessedWords(props: IGuessedWordsProps) {
    let contents: JSX.Element;
    if (props.guessedWords.length === 0) {
        contents = (
            <>
                Try to guess the secret word!
            </>
        );
    } else {
        const guessedwordsRows = props.guessedWords.map((word, index) => (
            <tr data-testid="guessed-word" key={index}>
                <td>{word.guessedWord}</td>
                <td>{word.letterMatchCount}</td>
            </tr>
        ));
        contents = (
            <div data-testid="guessed-words">
                <h3>Guessed Words</h3>
                <table className="table table-sm">
                    <thead className="thead-light">
                        <tr>
                            <th>Guess</th>
                            <th>Matching Letters</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guessedwordsRows}
                    </tbody>
                </table>
            </div>
        )
    }
    return (
        <div data-testid="component-guessed-word">
            {contents}
        </div>
    );
}

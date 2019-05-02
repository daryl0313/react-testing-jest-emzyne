import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import { GuessedWords, IGuessedWordsProps } from './GuessedWords';

const defaultProps: Partial<IGuessedWordsProps> = {
    guessedWords: [{ guessedWord: 'train', letterMatchCount: 3 }]
};

const setup = (props: IGuessedWordsProps | {} = {}) => {
    const setupProps = { ...defaultProps, ...props } as IGuessedWordsProps;
    return shallow(<GuessedWords {...setupProps} />);
}

describe('if there are no words guessed', () => {
    let wrapper: ShallowWrapper;
    beforeEach(() => {
        wrapper = setup({guessedWords: []});
    })
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-word');
        expect(component.length).toBe(1);
    });
    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {

});

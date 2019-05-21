import { storeFactory } from '../test/testUtils';
import { guessWord } from './actions';
import { Store } from 'redux';
import { State } from './reducers';
import { GuessedWord } from './reducers/guessedWordsReducer';

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';
    describe('no guessed words', () => {
        let store: Store;
        const initialState: State = { secretWord };
        beforeEach(() => {
            store = storeFactory(initialState);
        });
        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState: State = {
                ...initialState,
                success: false,
                guessedWords: [{
                    guessedWord: unsuccessfulGuess,
                    letterMatchCount: 3
                }]
            };

            expect(newState).toEqual(expectedState);
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState: State = {
                ...initialState,
                success: true,
                guessedWords: [{
                    guessedWord: secretWord,
                    letterMatchCount: 5
                }]
            };
            expect(newState).toEqual(expectedState);
        });
    });
    describe('some guessed words', () => {
        const guessedWords: GuessedWord[] = [{
            guessedWord: 'agile', letterMatchCount: 1
        }];
        const initialState: State = { guessedWords, secretWord };
        let store: Store;
        beforeEach(() => {
            store = storeFactory(initialState);
        });
        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState: State = {
                secretWord,
                success: false,
                guessedWords: [
                    ...guessedWords,
                    { guessedWord: unsuccessfulGuess, letterMatchCount: 3 }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState: State = {
                secretWord,
                success: true,
                guessedWords: [
                    ...guessedWords,
                    { guessedWord: secretWord, letterMatchCount: 5 }
                ]
            };
            expect(newState).toEqual(expectedState);
        });
    });
});

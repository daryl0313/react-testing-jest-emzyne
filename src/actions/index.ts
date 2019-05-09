export enum ActionTypes {
    CORRECT_GUESS = 'CORRECT_GUESS',
};

export function correctGuess() {
    return { type: ActionTypes.CORRECT_GUESS };
}
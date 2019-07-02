import React from 'react';
import { render, RenderResult, wait } from "@testing-library/react";

import App, { IAppProps } from "./App";
import { State } from './reducers';
import { getSecretWord } from './actions';

jest.mock('react-redux', () => ({ connect: () => (UnconnectedApp: any) => UnconnectedApp }));

const setup = (props: Pick<State, 'success' | 'guessedWords'>, gsw: typeof getSecretWord) => {
    const UnconnectedApp: React.ComponentClass<IAppProps> = App as any;
    return render(<UnconnectedApp success={props.success!} guessedWords={props.guessedWords!} getSecretWord={gsw} />)
}

test('"getSecretWord" runs on App mount', async () => {
    const getSecretWordMock = jest.fn().mockReturnValue('test value');
    const props = { success: false, guessedWords: [] };

    setup(props, getSecretWordMock);

    expect(getSecretWordMock).toHaveBeenCalled();
});

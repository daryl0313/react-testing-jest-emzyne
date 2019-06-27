import React from 'react';

import { cleanup, render, RenderResult } from "@testing-library/react";

import Congrats, { ICongratsProps } from './Congrats';

const defaultProps: ICongratsProps = { success: false };

const setup = (props?: ICongratsProps) => {
    const setupProps = { ...defaultProps, ...props };
    return render(<Congrats {...setupProps} />)
}

afterEach(cleanup);

test('renders without error', () => {
    const { getByTestId } = setup();
    getByTestId('component-congrats');
});
test('renders no text when "success" prop is false', () => {
    const { getByTestId } = setup({ success: false });
    const component = getByTestId('component-congrats');
    expect(component.textContent).toBe('');
});
test('renders congrats message when "success" prop is true', () => {
    const { getByText } = setup({ success: true });
    getByText('Congratulations! You guessed the word!');
});

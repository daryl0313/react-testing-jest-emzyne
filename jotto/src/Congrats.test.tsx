import React from 'react';

import { cleanup, render, RenderResult } from "@testing-library/react";

import Congrats, { ICongratsProps } from './Congrats';

const defaultProps: ICongratsProps = { success: false };

const setup = (props?: ICongratsProps) => {
    const setupProps = { ...defaultProps, ...props };
    return render(<Congrats {...setupProps} />)
}

afterEach(cleanup);

const expectedSuccessMessage = 'Congratulations! You guessed the word!';

test('renders no text when "success" prop is false', () => {
    const { queryByText } = setup({ success: false });
    expect(queryByText(expectedSuccessMessage)).toBeNull();
});
test('renders congrats message when "success" prop is true', () => {
    const { getByText } = setup({ success: true });
    expect(getByText(expectedSuccessMessage)).toBeTruthy();
});

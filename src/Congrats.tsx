import React from 'react';

export interface ICongratsProps {
    success: boolean;
}

export default (props: ICongratsProps) => {
    if (props.success) {
        return (
            <div data-test="component-test" className="alert alert-success">
                <span data-test="congrats-message">
                    Congratulations! You guessed the word!
                </span>
            </div>
        );
    }
    return (
        <div data-test="component-congrats" />
    );
}

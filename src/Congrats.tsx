import React from 'react';

export interface ICongratsProps {
    success: boolean;
}

export default (props: ICongratsProps) => {
    if (props.success) {
        return (
            <div data-testid="component-test" className="alert alert-success">
                <span>
                    Congratulations! You guessed the word!
                </span>
            </div>
        );
    }
    return (
        <div data-testid="component-congrats" />
    );
}

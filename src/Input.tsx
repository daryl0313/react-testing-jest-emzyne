import React, { Component } from "react";
import { connect } from "react-redux";
import { guessWord } from "./actions";
import { State } from "./reducers";

export interface IInputProps {
    success: boolean;
    guessWord: (guessedWord: string) => Promise<void>;
}

export class UnconnectedInput extends Component<IInputProps> {
    public inputBox = React.createRef<HTMLInputElement>();

    submitGuessedWord = (e: React.MouseEvent) => {
        e.preventDefault();
        const guessedWord = this.inputBox.current!.value;
        if (guessedWord) {
            this.props.guessWord(guessedWord);
        }
    }

    render() {
        const contents = !this.props.success
            && (
                <form className="form-inline">
                    <input type="text"
                        ref={this.inputBox}
                        data-test="input-box"
                        className="mb-2 mx-sm-3"
                        id="word-guess"
                        placeholder="enter guess" />
                    <button type="submit"
                        onClick={this.submitGuessedWord}
                        data-test="submit-button"
                        className="btn btn-primary mb-2">
                        Submit
                    </button>
                </form>
            );
        return (
            <div data-test="component-input">
                {contents}
            </div>
        )
    }
}

const mapStateToProps = ({ success }: State): Pick<IInputProps, 'success'> => {
    return { success: success! };
}

export default connect(mapStateToProps, { guessWord })(UnconnectedInput);
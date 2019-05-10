import React, { Component } from "react";
import { connect } from "react-redux";

export interface IInputProps {
    success: boolean;
}

class Input extends Component<IInputProps> {
    render() {
        const contents = !this.props.success
            && (
                <form className="form-inline">
                    <input type="text"
                        data-test="input-box"
                        className="mb-2 mx-sm-3"
                        id="word-guess"
                        placeholder="enter guess" />
                    <button type="submit"
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

const mapStateToProps = ({ success }: IInputProps) => {
    return { success };
}

export default connect(mapStateToProps)(Input);
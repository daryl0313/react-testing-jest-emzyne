import React, { Component } from "react";
import { connect } from "react-redux";

class Input extends Component<any> {
    render(){
        return (<div>Hi!</div>)
    }
}

const mapStateToProps = (state: any) => {
    return {};
}

export default connect(mapStateToProps)(Input);
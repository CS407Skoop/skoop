import React, { Component } from 'react';
import { store } from '../../store';
import { openLeftPane } from '../../actions'

class LeftPaneButton extends Component {
    openPaneLeft() {
        store.dispatch(openLeftPane());

    }
    render() {
        return (
            <div onClick={this.openPaneLeft}>
                SP
            </div>
            )
    }
}

export default LeftPaneButton;
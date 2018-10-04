import React, { Component } from 'react';
import { store } from '../../store';
import { openLeftPane } from '../../actions';

class LeftPaneButton extends Component {
    openPaneLeft() {
        store.dispatch(openLeftPane());

    }
    render() {
    console.log(store.getState())
    var fn;
    var ln;
    if(store.getState().firstName){
        fn = store.getState().firstName.charAt(0);
        ln=store.getState().lastName.charAt(0);
    }else
        {
            fn = 'T';
            ln = 'U';
        }
        return (
            <div onClick={this.openPaneLeft}>
                {fn}{ln}
            </div>
            )
    }
}

export default LeftPaneButton;

import React, { Component } from 'react';
import { store } from '../../store';
import { openRightPane } from '../../actions';

class RightPaneButton extends Component {
  openPaneRight() {
      store.dispatch(openRightPane());

  }
  render() {
  console.log(store.getState())
      return (
          <div onClick={this.openPaneRght}>
              expand
          </div>
          )
  }
}

export default RightPaneButton;

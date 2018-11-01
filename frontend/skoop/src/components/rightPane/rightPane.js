import React, { Component } from 'react';
import { store } from '../../store';
import './rightPane.css'
import './ArticleFrame';
import ArticleFrame from './ArticleFrame';
import { hideArticleInformation } from '../../actions'

class RightPane extends Component {
    onClick() {
        store.dispatch(hideArticleInformation());
    }
    render() {
        if (store.getState().showArticleFrame) {
            console.log(store.getState().articleDetails);
            return (
                <div className="rightPaneDiv">
                    <div className="frameHeader">
                        <div className="articleTitle">
                            <p className="articleTitleText"> <b> {store.getState().articleDetails.title} </b> </p> 
                            
                        </div>
                        <div className="articleTitle">
                            <a onClick={this.onClick}> Hide </a>

                        </div>
                    </div>
                    <ArticleFrame />
                </div>
            );
        }
        else return (<div/>)
    }
}

export default RightPane;

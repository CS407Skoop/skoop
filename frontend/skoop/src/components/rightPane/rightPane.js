import React, { Component } from 'react';
import { store } from '../../store';
import './rightPane.css'
import './ArticleFrame';
import ArticleFrame from './ArticleFrame';
import { hideArticleInformation, closeRightPane } from '../../actions'

class RightPane extends Component {
    onClick() {
        store.dispatch(hideArticleInformation());
    }

    // showArticleItems() {
    //     console.log(store.getState())
    //     if (store.getState().favoriteArticles) {
    //
    //         const articleItems = store.getState().favoriteArticles.map(function (article) {
    //             return <ListGroupItem > {article} </ListGroupItem>
    //         })
    //         return articleItems;
    //     }
    //     else
    //     return <div />
    // }

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

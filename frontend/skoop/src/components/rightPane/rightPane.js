import React, { Component } from 'react';
import { store } from '../../store';
import './rightPane.css'
import './ArticleFrame';
import { Button } from 'reactstrap';
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
                            <Button color="danger" style={{marginTop: "3px"}} onClick={this.onClick}>Go back to Map</Button>

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

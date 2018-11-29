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

    onLikeArticle() {
        var objToSend = {
            id: store.getState().articleDetails.id
        }
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

                       
                            <Button color="danger" style={{marginTop: "5px", marginLeft: "5px"}} onClick={this.onClick}>Go back to Map</Button>

                       
                       
                            <Button color="danger" style={{marginTop: "5px", marginLeft: "15px"}} onClick={this.onLikeArticle}>Like article</Button>

                       
                    </div>
                    <ArticleFrame />
                </div>
            );
        }
        else return (<div/>)
    }
}

export default RightPane;

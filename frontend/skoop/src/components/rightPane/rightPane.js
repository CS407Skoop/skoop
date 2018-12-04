import React, { Component } from 'react';
import { store } from '../../store';
import './rightPane.css'
import './ArticleFrame';
import { Button } from 'reactstrap';
import ArticleFrame from './ArticleFrame';
import { hideArticleInformation, closeRightPane } from '../../actions'
import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
    LinkedinIcon,    
}
    from 'react-share';

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

                            
                            <Button color="danger" style={{marginTop: "8px", marginLeft: "-120px" }} onClick={this
                            .onClick}>Go back to Map</Button>

                       
                       
                            <Button color="danger" style={{marginTop: "8px", marginLeft: "10px"}} onClick={this.onLikeArticle}>Like article</Button>
                            <div className="shareButtons">
                            <FacebookShareButton

                                url={store.getState().articleDetails.url}>
                                <FacebookIcon
                                size={32}
                                round />
                            </FacebookShareButton>
                            <TwitterShareButton
                                style={{marginLeft: "5px" }}
                                url={store.getState().articleDetails.url}>
                                <TwitterIcon
                                size={32}
                                round />
                            </TwitterShareButton>
                            <GooglePlusShareButton
                                style={{marginLeft: "5px" }}
                                url={store.getState().articleDetails.url}>
                                <GooglePlusIcon
                                size={32}
                                round />
                            </GooglePlusShareButton>
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

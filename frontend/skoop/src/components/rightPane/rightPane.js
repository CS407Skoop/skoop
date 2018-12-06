import React, { Component } from 'react';
import { store } from '../../store';
import './rightPane.css'
import './ArticleFrame';
import { Button } from 'reactstrap';
import ArticleFrame from './ArticleFrame';
import { hideArticleInformation, closeRightPane, likeArticle, getArticles, onTimelineDateChange } from '../../actions'
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

    constructor() {
        super();
        if(store.getState().articleDetails){
        this.state = {
            id: store.getState().articleDetails.id,
            isLiked: store.getState().articleDetails.isLiked
            }
        }
    }

    onClick() {
        store.dispatch(hideArticleInformation());
    }

    onLikeArticle() {
        this.setState ({
            isLiked: !this.state.isLiked
        })
        var objToSend = {
            id: this.state.id,
            username: store.getState().signInUserEmail
        }
        // var articles = store.getState().articles;
        // //console.log(articles);
        // var ind;
        // var id = this.state.id;
        // articles.forEach(function(item, index, array) {
        //     //console.log(item, index);
        //     if(item.id == id) {
        //         if(articles[index].isLiked) {
        //             articles[index].isLiked = false;
        //         }else {
        //             articles[index].isLiked = true;
        //         }
        //         //console.log(articles[index]);
        //         ind = index;
        //     }
        //   });
        //   console.log(ind);
        // console.log(articles[ind]);
        store.dispatch(likeArticle(JSON.stringify(objToSend)));
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
        if(store.getState().articleDetails){
            if(!this.state) {
            this.setState({
                id: store.getState().articleDetails.id,
                isLiked: store.getState().articleDetails.isLiked
                })
            }
            else {
                if(this.state.id != store.getState().articleDetails.id) {
                  this.setState({
                    id: store.getState().articleDetails.id,
                    isLiked: store.getState().articleDetails.isLiked
                  })  
                }
            }
        }
        var likeArticle;
        var text = 'Like Article';
        if(store.getState().favoriteArticleIDs && this.state) {
        if(store.getState().favoriteArticleIDs.includes(this.state.id)) {
            text = 'Unlike article'
            }
        }
        if(store.getState().userLoggedIn) {
            likeArticle = (<Button color="danger" style={{marginTop: "8px", marginLeft: "10px"}} onClick={this.onLikeArticle.bind(this)}>{text}</Button>)            
        }
        else {
            likeArticle =  <div />
        }
        if (store.getState().showArticleFrame) {
            console.log(store.getState().articleDetails);
            return (
                <div className="rightPaneDiv">
                    <div className="frameHeader">

                            
                            <Button color="danger" style={{marginTop: "8px", marginLeft: "-120px" }} onClick={this
                            .onClick}>Go back to Map</Button>

                       
                       
                            {likeArticle}
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

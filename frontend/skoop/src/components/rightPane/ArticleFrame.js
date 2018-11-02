import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { store } from '../../store';
import './rightPane.css'

class ArticleFrame extends Component {
    render() {
        console.log("INNNN");
        return (
                <Iframe url={store.getState().articleDetails.url}
                    width="30%"
                    height="92%"    
                    id="myId"
                    className="articleFrame"
                    display="initial"
                />
            )
                
        }
    } 
    
export default ArticleFrame;
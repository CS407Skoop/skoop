import React, { Component } from 'react';
import Iframe from 'react-iframe';
import { store } from '../../store';

class ArticleFrame extends Component {
    render() {
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
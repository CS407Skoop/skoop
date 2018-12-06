import React, { Component } from 'react';
import './leftPane.css';
import { store } from '../../store';
import { ListGroup, ListGroupItem, DropdownButton, ButtonToolbar, MenuItem, Button, Clearfix, Dropdown, Modal } from 'react-bootstrap';
import { closeLeftPane, openPreferencesModal, changeToggle, getLocationCentre, likeArticle, removeArticle } from '../../actions';
import  PreferencesModal from '../preferencesModal/preferencesModal';
import Toggle from 'react-toggle';
import './toggle.css';

class LeftPane extends Component {
    constructor() {
        super();
        this.state = {
            
            showFavArticlesModal: false
        }
    }

    handleToggleChange() {
        
            store.dispatch(changeToggle(!store.getState().toggle))
    }

    closeLeftPane() {
        store.dispatch(closeLeftPane());
    }

    openPreferencesModal() {
        store.dispatch(openPreferencesModal());
    }

    centreLocation(location) {
        store.dispatch(getLocationCentre(location));
    }

    // showLocationItems () {
    //     if (store.getState().favoriteLocations) {
    //         console.log(store.getState().favoriteLocations)
    //         const locationItems = store.getState().favoriteLocations.map(function(location) {
    //         return <ListGroupItem onClick = {this.centreLocation(location)}> {location} </ListGroupItem>
    //     })
    // return locationItems;
    //     }
    //     else
    //     return <div />

    // }

     showArticleItems() {
         
         if (store.getState().favoriteArticleTitles) {

            const articleItems = store.getState().favoriteArticleTitles.map(function (article, index) {
                 return (
                <div className = "articleItem">
                    <ListGroupItem > <a href={store.getState().favoriteArticleLinks[index]}> {article} </a> </ListGroupItem>
                    <Button bsStyle="primary" bsSize="small" onClick = {()=> {store.dispatch(removeArticle(store.getState().favoriteArticleIDs[index]))}}> Remove </Button>
                 </div>
                 )
             })
             return articleItems;
         }
         else
         return <div />
     }
     showCategoryItems () {
        if(store.getState().categories) {
         const categoryItems = store.getState().categories.map(function(category) {
             return <ListGroupItem> {category} </ListGroupItem>
         })
         return  categoryItems;
         }
         else
         return (
            <div />
         );
         }

    showModal() {

        if (store.getState().openPreferencesModal) {
            return (
                <PreferencesModal />
                )
        }
        else
            return (<div />)
    }

    showFavArticles() {
        this.setState({
            showFavArticlesModal: !this.state.showFavArticlesModal
        })
    }

    removeArticles(id) {
        var objToSend = JSON.stringify({
            id: id,
            username: store.getState().signInUserEmail
        })
        store.dispatch(likeArticle(objToSend));
    }


    render() {
        var locationItems;
        var articleItems = <div />;
        // const cont = this;
        // if (store.getState().favoriteArticleTitles) {

        //     articleItems = store.getState().favoriteArticleTitles.map(function (article, index) {
        //          return (
        //         <div className = "articleItem">
        //             <ListGroupItem > <a href={store.getState().favoriteArticleLinks[index]}> {article} </a> </ListGroupItem>
        //             <Button bsStyle="primary" bsSize="small" onClick={cont.removeArticles(store.getState().favoriteArticleIDs[index])}> Remove </Button>
        //          </div>
        //          )
        //      })
        //  }
        const cox = this;
        var blockedCategories = <div />;
        if (store.getState().blockedCategories) {
            blockedCategories = store.getState().blockedCategories.map(function(category) {
            return <ListGroupItem > {category} </ListGroupItem>
            })
        }
        if (store.getState().favoriteLocations) {
            console.log(store.getState().favoriteLocations)
            locationItems = store.getState().favoriteLocations.map(function(location) {
            return <ListGroupItem onClick = {cox.centreLocation.bind(cox, location)}> {location} </ListGroupItem>
            })
        }
        else
            locationItems = <div />
        return (
            
            <div className="leftPaneDiv">
                <Modal bsSize="lg"
                show={this.state.showFavArticlesModal}
                aria-labelledby="contained-modal-title-lg"

            >
                <Modal.Header>
                    <Modal.Title>Favorite Articles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                    <this.showArticleItems />
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.showFavArticles.bind(this)}>Close</Button>
            </Modal.Footer>
            </Modal>
                <this.showModal/>

                <br />
                <h3><label className="nameTag">{store.getState().firstName} {store.getState().lastName}</label><br /><br />
                </h3>

                <Clearfix className="clearfixClass">

                        <h4 id="favoriteLocations">Favorite Locations </h4>
                  <ListGroup>
                 {locationItems}
                 </ListGroup>

                  <div className="favArticlesButton">
                  <Button bsStyle="primary" bsSize="large" onClick = {this.showFavArticles.bind(this)}>Favorite Articles</Button>
                  </div>
                  <ListGroup >
                            <h4 id="Categories">Categories</h4>
                  <this.showCategoryItems />
                  </ListGroup>
                  <ListGroup >
                            <h4 id="Categories">Blocked Categories</h4>
                  {blockedCategories}
                  </ListGroup>
                  <div className="toggleDiv">
                  <label>
                    <Toggle
                    defaultChecked={store.getState().toggle}
                    onChange={this.handleToggleChange.bind(this)} />
                    <span className="toggleText">User preferences</span>
                    
                </label>
                </div> 
                  <ButtonToolbar class="prefbuttons">
                  <Button bsStyle="primary" onClick={this.openPreferencesModal}>Edit</Button>
                  <Button onClick={this.closeLeftPane}>Exit</Button>
                  </ButtonToolbar>

              </Clearfix>




                {/* <ButtonToolbar>
                <Dropdown defaultopen="true">
                <DropdownButton className="prefs"
                  title="Favorite Locations"
                  id="favoriteLocations"
                >
                  <this.showLocationItems />
                </DropdownButton>
              </Dropdown>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <Dropdown defaultopen="true">
                <DropdownButton className="prefs"
                  title="Favorite Articles"
                  id="favoriteArticles"
                >
                  <this.showArticleItems/>
                </DropdownButton>
              </Dropdown>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <Dropdown defaultopen="true">
                <DropdownButton className="prefs"
                  title="Categories"
                  id="Categories"
                >
                  <this.showCategoryItems />
                </DropdownButton>
              </Dropdown>
              </ButtonToolbar><br />  */}



{/*              <ListGroup>Favorite Locations
                <ListGroupItem bsStyle="info">Jaipur</ListGroupItem>
                <ListGroupItem bsStyle="info">Mumbai</ListGroupItem>
                <ListGroupItem bsStyle="info">West Lafayette</ListGroupItem>
              </ListGroup>

              <ListGroup>Favorite Articles
                <ListGroupItem bsStyle="info">Test1</ListGroupItem>
                <ListGroupItem bsStyle="info">Test2</ListGroupItem>
                <ListGroupItem bsStyle="info">Test3</ListGroupItem>
              </ListGroup>

              <ListGroup>Categories
                <ListGroupItem bsStyle="info">Sports</ListGroupItem>
                <ListGroupItem bsStyle="info">Climate</ListGroupItem>
                <ListGroupItem bsStyle="info">Politics</ListGroupItem>
                <ListGroupItem bsStyle="info">Breaking</ListGroupItem>
                <ListGroupItem bsStyle="info">Technology</ListGroupItem>
                <ListGroupItem bsStyle="info">Entertainment</ListGroupItem>
              </ListGroup>
*/}
            </div>
        );
    }
}

export default LeftPane;

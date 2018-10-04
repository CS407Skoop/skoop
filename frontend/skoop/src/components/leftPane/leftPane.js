import React, { Component } from 'react';
import './leftPane.css';
import { store } from '../../store';
import { ListGroup, ListGroupItem, DropdownButton, ButtonToolbar, MenuItem, Button } from 'react-bootstrap';
import { closeLeftPane, openPreferencesModal } from '../../actions';
import  PreferencesModal from '../preferencesModal/preferencesModal';

class LeftPane extends Component {
    closeLeftPane() {
        store.dispatch(closeLeftPane());
    }

    openPreferencesModal() {
        store.dispatch(openPreferencesModal());
    }
    showLocationItems () {
    const locationItems = store.getState().favoriteLocations.map(function(location) {
        return <MenuItem > {location} </MenuItem>
    })
    return locationItems;
    }

    showArticleItems () {
        const articleItems = store.getState().favoriteArticles.map(function(article) {
            return <MenuItem > {article} </MenuItem>
        })
        return articleItems;
        }
     showCategoryItems () {
        if(store.getState().categories !== undefined) {
         const categoryItems = store.getState().categories.map(function(category) {
             return <MenuItem > {category} </MenuItem>
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

    render() {
        return (
            <div className="leftPaneDiv">
                <this.showModal/>

              <br /><h3><label>{store.getState().firstName} {store.getState().lastName}</label><br /><br />
              </h3>
              <ButtonToolbar>
                <DropdownButton className="prefs"
                  title="Favorite Locations"
                  id="favoriteLocations"
                >
                  <this.showLocationItems />
                </DropdownButton>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <DropdownButton className="prefs"
                  title="Favorite Articles"
                  id="favoriteArticles"
                >
                  <this.showArticleItems/>
                </DropdownButton>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <DropdownButton className="prefs"
                  title="Categories"
                  id="Categories"
                >
                  <this.showCategoryItems />
                </DropdownButton>
              </ButtonToolbar><br />

              <ButtonToolbar>
                    <Button bsStyle="primary" onClick={this.openPreferencesModal}>Edit</Button>
                <Button onClick={this.closeLeftPane}>Exit</Button>
              </ButtonToolbar>

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

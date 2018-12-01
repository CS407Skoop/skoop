import React, { Component } from 'react';
import './leftPane.css';
import { store } from '../../store';
import { ListGroup, ListGroupItem, DropdownButton, ButtonToolbar, MenuItem, Button, Clearfix, Dropdown } from 'react-bootstrap';
import { closeLeftPane, openPreferencesModal } from '../../actions';
import  PreferencesModal from '../preferencesModal/preferencesModal';
import Toggle from 'react-toggle';
import './toggle.css';

class LeftPane extends Component {
    constructor() {
        super();
        this.state = {
            userPreferncesMode: false
        }
    }

    handleToggleChange() {
        this.setState({
            userPreferncesMode: !this.state.userPreferncesMode
        })
    }

    closeLeftPane() {
        store.dispatch(closeLeftPane());
    }

    openPreferencesModal() {
        store.dispatch(openPreferencesModal());
    }
    showLocationItems () {
        if (store.getState().favoriteLocations) {
            console.log(store.getState().favoriteLocations)
            const locationItems = store.getState().favoriteLocations.map(function(location) {
            return <ListGroupItem > {location} </ListGroupItem>
        })
    return locationItems;
        }
        else
        return <div />

    }

    showArticleItems() {
        console.log(store.getState())
        if (store.getState().favoriteArticles) {

            const articleItems = store.getState().favoriteArticles.map(function (article) {
                return <ListGroupItem > {article} </ListGroupItem>
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


    render() {
        console.log(this.showCategoryItems);
        return (
            <div className="leftPaneDiv">
                <this.showModal/>

                <br />
                <h3><label className="nameTag">{store.getState().firstName} {store.getState().lastName}</label><br /><br />
                </h3>

                <Clearfix className="clearfixClass">

                        <h4 id="favoriteLocations">Favorite Locations </h4>
                  <ListGroup>
                 <this.showLocationItems />
                 </ListGroup>

                 <h4 id="favoriteArticles">Favorite Articles </h4>

                  <ListGroup>

                  <this.showArticleItems />
                  </ListGroup>

                  <ListGroup >
                            <h4 id="Categories">Categories</h4>
                  <this.showCategoryItems />
                  </ListGroup>
                  <ListGroup >
                            <h4 id="Categories">Blocked Categories</h4>
                  <this.showCategoryItems />
                  </ListGroup>
                  <div className="toggleDiv">
                  <label>
                    <Toggle
                    defaultChecked={this.userPreferncesMode}
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

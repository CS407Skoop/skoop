import React, { Component } from 'react';
import './leftPane.css';
import { store } from '../../store';
import { ListGroup, ListGroupItem, DropdownButton, ButtonToolbar, MenuItem, Button } from 'react-bootstrap';


class LeftPane extends Component {
    render() {
        return (
            <div className="leftPaneDiv">
              <ButtonToolbar>
                <Button bsStyle="link">Exit</Button>
                <br />
                <Button>Edit</Button>
              </ButtonToolbar>

              <br /><h1><label>First Last</label><br /><br />
              </h1>
              <ButtonToolbar>
                <DropdownButton
                  title="Favorite Locations"
                  id="favoriteLocations"
                >
                  <MenuItem eventKey="1">Jaipur</MenuItem>
                  <MenuItem eventKey="2">Mumbai</MenuItem>
                  <MenuItem eventKey="3">West Lafayette</MenuItem>
                </DropdownButton>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <DropdownButton
                  title="Favorite Articles"
                  id="favoriteArticles"
                >
                  <MenuItem eventKey="1">Test1</MenuItem>
                  <MenuItem eventKey="2">Test2</MenuItem>
                  <MenuItem eventKey="3">Test3</MenuItem>
                </DropdownButton>
              </ButtonToolbar><br />

              <ButtonToolbar>
                <DropdownButton
                  title="Categories"
                  id="Categories"
                >
                  <MenuItem eventKey="1">Sports</MenuItem>
                  <MenuItem eventKey="2">Climate</MenuItem>
                  <MenuItem eventKey="3">Politics</MenuItem>
                  <MenuItem eventKey="4">Breaking</MenuItem>
                  <MenuItem eventKey="5">Technology</MenuItem>
                  <MenuItem eventKey="6">Entertainment</MenuItem>
                </DropdownButton>
              </ButtonToolbar><br />

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

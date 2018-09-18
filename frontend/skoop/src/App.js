import React, { Component } from 'react';
import SkoopNavbar from './components/SkoopNavbar/SkoopNavbar';
import MapPane from './components/mapPane/mapPane';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './App.css';
import { store } from './store';

class App extends Component {
    render() {
        const test = store.getState().test;
        console.log(test);
      return (
          <div id="mainPageDiv">
              <div className="navbarDiv">
                  <SkoopNavbar />

              </div>
              <Grid fluid>
                  <Row className="showGrid">
                      <Col lg={12}> <MapPane /> </Col>
                  </Row>
              </Grid>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import SkoopNavbar from './components/SkoopNavbar/SkoopNavbar';
import MapPane from './components/mapPane/mapPane';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import UserOptionsModal from './components/userOptionsModal/userOptionsModal';
import LogInModal from './components/logInModal/logInModal';
import SignUpModal from './components/signUpModal/signUpModal';
import './App.css';
import { store } from './store';

class App extends Component {

    toShow() {
        const currState = store.getState();
        if (currState.openOptions)
            return <UserOptionsModal />
        else if (currState.showLogInModal)
            return <LogInModal />
        else if (currState.showSignUpModal)
            return <SignUpModal />
        else if (currState.showMainScreen)
            return <MapPane />
        console.log(currState);
        
    }

    render() {
        //console.log(store.getState());
        return (
            
            <div id="mainPageDiv">
                
              <div className="navbarDiv">
                  <SkoopNavbar />

              </div>
              <Grid fluid>
                    <Row className="showGrid">
                        <Col lg={12}> <this.toShow /> </Col>
                  </Row>
              </Grid>
      </div>
    );
  }
}

export default App;

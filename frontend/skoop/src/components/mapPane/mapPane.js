import React, { Component } from 'react';
import './mapPane.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { store } from '../../store';
import GoogleMap from './GoogleMap';
import NewGoogleMap from './NewGoogleMaps'

class MapPane extends Component {
    render() {
        //console.log(store.getState());
        if(store.getState().zoom<6) {
        return (

            <div className="mapDiv">
                <Grid fluid>
                    <Row className="showGrid">
                        
                        <Col lg={12}>    <GoogleMap/> </Col>
                        
                    </Row>    
                </Grid>
            </div>
            );
        }
        else {

            return (

                        <div className="mapDiv">
                            <Grid fluid>
                                <Row className="showGrid">

                                    <Col lg={12}>    <NewGoogleMap/> </Col>

                                </Row>
                            </Grid>
                        </div>
                        );
        }
    }
}

export default MapPane;

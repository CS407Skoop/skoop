import React, { Component } from 'react';
import './mapPane.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import LeftPane from '../leftPane/leftPane';
import RightPane from '../rightPane/rightPane';


class MapPane extends Component {
    render() {
        return (
            <div className="mapDiv">
                <Grid fluid>
                    <Row className="showGrid">
                        <Col lg={2}> <LeftPane /> </Col>
                        <Col lg={7}>    Map Pane goes here. </Col>
                        <Col lg={3}> <RightPane /> </Col>
                    </Row>    
                </Grid>
            </div>
        );
    }
}

export default MapPane;

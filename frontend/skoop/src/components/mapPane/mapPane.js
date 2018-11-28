import React, { Component } from 'react';
import {onTimelineDateChange} from '../../actions'
import './mapPane.css';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { store } from '../../store';
import GoogleMap from './GoogleMap';
import NewGoogleMap from './NewGoogleMaps'
import HorizontalTimeline from 'react-horizontal-timeline';

class MapPane extends Component {
    constructor() {
        super();
        var oldDate = new Date("2018-11-05");
        var newDate = new Date("2018-11-12");
        var values = new Array();
        var dt = new Date(oldDate);
        while (dt <= newDate) {
            values.push(new Date(dt));
            dt.setDate(dt.getDate() + 1);
        }
        this.state = ({
            values: values,
            index: 7
        })
    }
    onIndexChange(index) {
        console.log(index);
        this.setState({
            index: index
        })
        store.dispatch(onTimelineDateChange(index));
    }
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
                <div style={{ width: '60%', transform: `translate(${0}px, ${10}px)` , height: '100px', margin: '0 auto' }}>
                            <HorizontalTimeline
                                index={this.state.index}
                                indexClick={this.onIndexChange.bind(this)}
                                values={this.state.values} />
                            </div>
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
                            <div style={{ width: '60%', transform: `translate(${0}px, ${10}px)` , height: '100px', margin: '0 auto' }}>
                            <HorizontalTimeline
                                index={this.state.index}
                                indexClick={this.onIndexChange.bind(this)}
                                values={this.state.values} />
                            </div>
                        </div>
                        );
        }
    }
}

export default MapPane;

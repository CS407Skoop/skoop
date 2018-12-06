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
        var today = new Date();
        var previousWeek= today.getTime() - 7 * 24 * 60 * 60 * 1000;

        
        var values = new Array();
        while (previousWeek <= today) {
            var d = new Date(previousWeek);
            values.push(d);
            previousWeek += (24*60*60*1000);
        }
        console.log(values);
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
        // var showTimeline = () => {
        //     if(store.getState().searchValue) {
        //         if(store.getState().searchValue.length>0){
        //             console.log(store.getState().searchValue);
        //             return (
        //                 <div />
        //             )
        //         }
        //     }
        //     console.log("...");
        //     return (
        //     <div style={{ width: '60%', transform: `translate(${0}px, ${10}px)` , height: '100px', margin: '0 auto' }}>
        //                     <HorizontalTimeline
        //                         index={this.state.index}
        //                         indexClick={this.onIndexChange.bind(this)}
        //                         values={this.state.values} />
        //                     </div>
        //     );
        // }
       
        //console.log(store.getState());
        if(store.getState().searchValue) {
            if(store.getState().searchValue.length > 0) {
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
        if(store.getState().zoom<6) {
           
        return (

            <div className="mapDiv">
                <Grid fluid>
                    <Row className="showGrid">
                        
                        <Col lg={12}>    <GoogleMap/> </Col>
                        
                    </Row>    
                </Grid>
                <div style={{ width: '37%', background: '#eaecf2', transform: `translate(${0}px, ${-110}px)` , height: '100px', margin: '0 auto' }}>
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
                            <div style={{ width: '37%', background: '#eaecf2', transform: `translate(${0}px, ${-110}px)` , height: '100px', margin: '0 auto' }}>
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

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';
import LeftPane from '../leftPane/leftPane';
import './googleMap.css'

class GoogleMap extends Component {

    UserLocation = () => {
        console.log(this.props)
        return (
            <div style={GoogleMapsStyle}>
                SP
            </div>
            )
    }

    render() {
        if (store.getState().position) {
            //console.log(store.getState().position)
            const defaultProps = {
                defaultCenter: {
                    lat: 40.424546,
                    lng: -86.921826
                },
                zoom: 11,
                center: {
                    lat: store.getState().position.coords.latitude,
                    lng: store.getState().position.coords.longitude
                },
            }
            return (
                // Important! Always set the container height explicitly
                <div className="mapContainer">
                    <div className="leftPane">
                        <LeftPane />
                    </div>
                    <div className="mapPane">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo' }}
                            defaultCenter={defaultProps.defaultCenter}
                            center={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >



                            <this.UserLocation

                                lat={store.getState().position.coords.latitude}
                                lng={store.getState().position.coords.longitude}
                           

                            />

                        </GoogleMapReact>
                      </div>
                </div>
            );
        }
        else {
            return (
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height="200"
                    width="200"
                />
                )
        }
    }
}



export default GoogleMap;

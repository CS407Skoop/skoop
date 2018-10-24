import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import {updateZoom, updateCenter} from '../../actions'
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';
import LeftPane from '../leftPane/leftPane';
import './googleMap.css';
import LeftPaneButton from '../leftPane/leftPaneButton';
import LogOutModal from '../SkoopNavbar/logOutModal';

class GoogleMap extends Component {

    UserLocation = () => {
        if(store.getState().locationGiven)
        return (
            <div style={GoogleMapsStyle}>
                You
            </div>
            )
        else 
            return <div />
    }


    leftSide() {
        if(store.getState().enterGuestMode)
            return (<div />)
        //console.log(store.getState().openLeftPane)
        if (store.getState().showLogOutModal) {
          return (
            <LogOutModal/>
          )
        }
        else if (store.getState().openLeftPane) {
            console.log(store.getState().openLeftPane)
            return (
                <div className="leftPane">
                    <LeftPane />
                </div>
            )
        }

        else {

            return (
                <div className="leftPaneButton">
                    <LeftPaneButton />
                </div>
                )
        }

    }

    onBoundsChange(center, zoom, bounds, marginBounds) {
        console.log(center);
        store.dispatch(updateZoom(zoom));
        store.dispatch(updateCenter(center));

    }

    onMapClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)
    
    render() {
        if (store.getState().mapLoading) {
            return (
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height="200"
                    width="200"
                />
            )
        }
        if (!store.getState().locationGiven) {
            console.log(store.getState().center);
            const defaultProps = {
                defaultCenter: {
                    lat: 40.424546,
                    lng: -86.921826
                },
            }
           
            return (
                // Important! Always set the container height explicitly
                <div className="mapContainer">
                    <this.leftSide />
                    <div className="mapPane">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo' }}
                            defaultCenter={defaultProps.defaultCenter}
                            center={defaultProps.defaultCenter}
                            zoom={store.getState().zoom}
                            onClick={this.onMapClick}
                            onChange={this.onBoundsChange}
                        >



                         

                        </GoogleMapReact>
                    </div>
                </div>
            );

        }
        if (store.getState().position) {
            console.log(store.getState().position);
            const defaultProps = {
                defaultCenter: {
                    lat: 40.424546,
                    lng: -86.921826
                },
           
                center: {
                    lat: store.getState().position.coords.latitude,
                    lng: store.getState().position.coords.longitude
                },
            }
            //console.log(store.getState().positio
            return (
                // Important! Always set the container height explicitly
                <div className="mapContainer">
                    <this.leftSide />
                    <div className="mapPane">
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo' }}
                            defaultCenter={defaultProps.defaultCenter}
                            center={store.getState().center}
                            zoom={store.getState().zoom}
                            onClick={this.onMapClick}
                            onBoundsChange={this.onBoundsChange}
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
       
    }
}



export default GoogleMap;

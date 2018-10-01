import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {

    UserLocation = () => {
        return (
            <div style={GoogleMapsStyle}>
                {this.props.text}
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
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo' }}
                        defaultCenter={defaultProps.defaultCenter}
                        center={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                    >

                        <this.UserLocation

                            lat={store.getState().position.coords.latitude}
                            lng={store.getState().position.coords.longitude}
                            text={'Your location'}

                        />

                    </GoogleMapReact>
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

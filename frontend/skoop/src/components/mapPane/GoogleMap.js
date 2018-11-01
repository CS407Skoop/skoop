import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import {updateZoom, updateCenter} from '../../actions'
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';
import LeftPane from '../leftPane/leftPane';
import RightPane from '../rightPane/rightPane';
import RightPaneButton from '../rightPane/rightPaneButton';
import Markers from './Markers';
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

    rightSide() {
        if (store.getState().zoom > 15) {
            if (store.getState().showRightPane) {
                return <RightPane />
            }
            return <RightPaneButton />
        }
        return <div />
    }

    onBoundsChange(center, zoom, bounds, marginBounds) {
        console.log(center);
        store.dispatch(updateZoom(zoom));
        store.dispatch(updateCenter(center));

    }

    onMapClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)
    
    render() {
        console.log(store.getState().zoom)
        var articles = [];
        var data = [];
        var markers = [];
        var gradient = []
        var heatMapData = [];
        if (store.getState().articles) {
            
            articles = store.getState().articles;
            console.log(articles);
            
            for (var i = 0; i < articles.length; i++) {
                var coords = {
                    lat: articles[i].latitude,
                    lng: articles[i].longitude
                }
                heatMapData.push(coords);
            }
            
            gradient = [
                'rgba(0, 255, 255, 0)',
                'rgba(0, 255, 255, 1)',
                'rgba(0, 191, 255, 1)',
                'rgba(0, 127, 255, 1)',
                'rgba(0, 63, 255, 1)',
                'rgba(0, 0, 255, 1)',
                'rgba(0, 0, 223, 1)',
                'rgba(0, 0, 191, 1)',
                'rgba(0, 0, 159, 1)',
                'rgba(0, 0, 127, 1)',
                'rgba(63, 0, 91, 1)',
                'rgba(127, 0, 63, 1)',
                'rgba(191, 0, 31, 1)',
                'rgba(255, 0, 0, 1)'
            ]
            data = {
                positions: heatMapData,
                options: {
                    radius: 20,
                    opacity: 0.2,
                    gradient: gradient
                }
            }
            if (store.getState().zoom >= 10) {
                markers = articles.map(function (article) {
                    return <Markers lat={article.latitude} lng={article.longitude} category={article.category} url={article.url} title={article.title}/>
                })
            } else {
                markers = <div />
            }
            
        }
        
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
                    lat: -34.6076,
                    lng: -58.4371
                },
            }
            if (articles.length > 0) {
                return (
                    // Important! Always set the container height explicitly
                    <div className="mapContainer">
                        <this.leftSide />
                        <div className="mapPane">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo', libraries: 'visualization' }}
                                defaultCenter={defaultProps.defaultCenter}
                                center={defaultProps.defaultCenter}
                                zoom={store.getState().zoom}
                                onClick={this.onMapClick}
                                onChange={this.onBoundsChange}
                                heatmapLibrary={true}
                                updateHeatmap={true}
                                heatmap={data}
                            >
                            </GoogleMapReact>
                        </div>
                        <this.rightSide />
                    </div>
                );
            }
            else {
                return (
                    <div className="mapContainer">
                        <this.leftSide />
                        <div className="mapPane">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo', libraries: 'visualization' }}
                                defaultCenter={defaultProps.defaultCenter}
                                center={defaultProps.defaultCenter}
                                zoom={store.getState().zoom}
                                onClick={this.onMapClick}
                                onChange={this.onBoundsChange}
                                heatmapLibrary={true}
                               
                            >
                            </GoogleMapReact>
                        </div>
                        <this.rightSide />
                    </div>
                    )
            } 

        }
        if (store.getState().position) {
            const defaultProps = {
                defaultCenter: {
                    lat: 24.075,
                    lng: 54.940,
                },
           
                center: {
                    lat: store.getState().position.coords.latitude,
                    lng: store.getState().position.coords.longitude
                },
            }
            if (articles.length > 0) {
                console.log(data);
                //console.log(store.getState().positio
                return (
                    // Important! Always set the container height explicitly
                    <div className="mapContainer">
                        <this.leftSide />
                        <div className="mapPane">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo', libraries: 'visualization' }}
                                defaultCenter={defaultProps.defaultCenter}
                                center={store.getState().center}
                                zoom={store.getState().zoom}
                                onClick={this.onMapClick}
                                onBoundsChange={this.onBoundsChange}
                                updateHeatmap={true}
                                heatmapLibrary={true}
                                heatmap={data}
                                
                            >
                                {markers}


                                <this.UserLocation

                                    lat={store.getState().position.coords.latitude}
                                    lng={store.getState().position.coords.longitude}


                                />


                            </GoogleMapReact>
                        </div>
                        <this.rightSide />
                    </div>
                );
            }
            else {
                return (
                    <div className="mapContainer">
                        <this.leftSide />
                        <div className="mapPane">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo', libraries: 'visualization' }}
                                defaultCenter={defaultProps.defaultCenter}
                                center={store.getState().center}
                                zoom={store.getState().zoom}
                                onClick={this.onMapClick}
                                onBoundsChange={this.onBoundsChange}
                                heatmapLibrary={true}
                            >



                                <this.UserLocation

                                    lat={store.getState().position.coords.latitude}
                                    lng={store.getState().position.coords.longitude}


                                />


                            </GoogleMapReact>
                        </div>
                        <this.rightSide />
                    </div>
                    )
            }
        }
       
    }
}



export default GoogleMap;

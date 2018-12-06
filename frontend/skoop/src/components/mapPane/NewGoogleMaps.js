import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import {updateZoom, updateCenter, storePositions} from '../../actions'
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';
import LeftPane from '../leftPane/leftPane';
import RightPane from '../rightPane/rightPane';
import RightPaneButton from '../rightPane/rightPaneButton';
import Markers from './Markers';
import './googleMap.css';
import LeftPaneButton from '../leftPane/leftPaneButton';
import LogOutModal from '../SkoopNavbar/logOutModal';
import Location from '../../images/location.png'

class NewGoogleMaps extends Component {


    constructor() {
        super();
        this.state = {
            articles: store.getState.articles
        }
    }
    UserLocation = () => {
        if(store.getState().locationGiven)
        return (
            <div>
                <img className="testImg" src={Location} />
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
       // if (store.getState().zoom > 10) {
       //     if (store.getState().showRightPane) {
       //         return <RightPane />
       //     }
       //     return <RightPaneButton />
       // }
        // return <div />
        return <RightPane />
    }

    onBoundsChange(center, zoom, bounds, marginBounds) {
        console.log(bounds);
        store.dispatch(updateZoom(zoom));
        store.dispatch(updateCenter(center));

    }

    onMapClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)

    render() {
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
        var articles = store.getState().articles;

                    var markers = articles.map(function (article) {
                        return <Markers lat={article.latitude} lng={article.longitude} category={article.category} url={article.url} title={article.title} id = {article.id} isLiked={article.isLiked}/>
                    })

        if (articles && articles.length > 0) {
            
            //console.log(data);
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
        } else {
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
                    <this.rightSide />
                </div>
            );
        }

     }
}



export default NewGoogleMaps;

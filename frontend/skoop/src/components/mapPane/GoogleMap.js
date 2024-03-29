import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { store } from '../../store';
import {updateZoom, updateCenter, storePositions, onTimelineDateChange} from '../../actions'
import Loader from 'react-loader-spinner';
import { GoogleMapsStyle } from './GoogleMapStyles';
import LeftPane from '../leftPane/leftPane';
import RightPane from '../rightPane/rightPane';
import RightPaneButton from '../rightPane/rightPaneButton';
import Markers from './Markers';
import HorizontalTimeline from 'react-horizontal-timeline';
import './googleMap.css';
import LeftPaneButton from '../leftPane/leftPaneButton';
import LogOutModal from '../SkoopNavbar/logOutModal';
import Location from '../../images/location.png'

class GoogleMap extends Component {

    constructor() {
        super()
        this.state = {
            articles: store.getState().articles
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
        return <RightPane />
    }

    onBoundsChange(center, zoom, bounds, marginBounds) {
        console.log(bounds);
        store.dispatch(updateZoom(zoom));
        store.dispatch(updateCenter(center));

    }

   

    onMapClick = ({ x, y, lat, lng, event }) => console.log(x, y, lat, lng, event)

    render() {
        
        var articles = [];
        var gradient = [];
        var data = [];
        var markers = [];
        var heatMapData = []
        if (store.getState().articles) {
            
            articles = store.getState().articles;

            if(this.state.articles != store.getState().articles) {
                this.setState({
                    articles: articles
                });
                return (
                    <h> Plese wait </h>
                )
            }
            /*

            if(this.state.articles) {
                console.log(this.state.articles)
                console.log(articles.length)
                if(this.state.articles.length == 0) {
                    this.setState({
                        articles: articles
                    })
                }
                if(this.state.articles.length != 0){
                if(this.state.articles.length != articles.length) {
                    console.log("III")
                    this.setState({
                        articles: articles
                    })
                    return (
                        <h> Plese wait </h>
                    )
                }
                }
            }
           
            console.log(articles);
*/
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

            }
            if (store.getState().zoom >=6  ||  articles.length <= 10) {
                markers = articles.map(function (article) {
                    return <Markers lat={article.latitude} lng={article.longitude} category={article.category} url={article.url} title={article.title} id = {article.id} isLiked={article.isLiked}/>
                })
            } else {
                markers = <div />
            }

        }
        const positions = heatMapData

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
            //console.log(store.getState().center);
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
                                heatmap={{positions:heatMapData,
                                        options: {
                                             radius: 20,
                                             opacity: 0.7,
                                        }
                                 }}
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
                                updateHeatmap={true}
                                heatmapLibrary={true}
                                heatmap={{positions:heatMapData,
                                        options: {
                                             radius: 20,
                                             opacity: 0.7,
                                        }
                                 }}

                            >
                               
                            </GoogleMapReact>
                        </div>
                        <this.rightSide />
                    </div>
                    )
            }

        }
        if (store.getState().position) {
        var testData = [
                                                {
                                                  lat: 60.7143,
                                                  lng: 47.0517,
                                                },
                                                {
                                                  lat: 60.7343,
                                                  lng: 47.0617,
                                                },
                                                {
                                                  lat: 60.7543,
                                                  lng: 47.0817,
                                                },
                                                {
                                                  lat: 60.7743,
                                                  lng: 47.1017,
                                                },
                                                {
                                                  lat: 60.8043,
                                                  lng: 47.1117,
                                                },
                                              ]


            var temp1 = {lat: 60.7143,lng: 47.0517,};
            console.log(testData);
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
                console.log(heatMapData)
                console.log(store.getState().showArticleFrame)
                //console.log(data);
                //console.log(store.getState().positio
                return (
                    // Important! Always set the container height explicitly
                    <div className="mapContainer">
                        <this.leftSide />
                       
                        <div className="mapPane">
                            <GoogleMapReact
                                bootstrapURLKeys={{ key: 'AIzaSyAC1PSJ_g70IDwtv61G76vzidpIRs1YxyM', libraries: 'visualization' }}
                                defaultCenter={defaultProps.defaultCenter}
                                center={store.getState().center}
                                zoom={store.getState().zoom}
                                onClick={this.onMapClick}
                                onBoundsChange={this.onBoundsChange}
                                updateHeatmap={true}
                                heatmapLibrary={true}
                                heatmap={{positions:heatMapData,
                                        options: {
                                             radius: 20,
                                             opacity: 0.7,
                                        }
                                 }}


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
                                updateHeatmap={true}
                                heatmapLibrary={true}
                                heatmap={{positions:heatMapData,
                                        options: {
                                             radius: 20,
                                             opacity: 0.7,
                                        }
                                 }}
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
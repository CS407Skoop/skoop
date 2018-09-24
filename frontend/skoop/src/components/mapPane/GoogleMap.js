import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {


  render() {
  const defaultProps = {
      defaultCenter: {
        lat: 40.424546,
        lng: -86.921826
      },
      zoom: 11,
      center: {
        lat: 40.424546,
        lng: -86.921826
      },
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
      {console.log(this.props.center)}
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDt9ySx7K6ddMXjH65Xcxtq7wg3oLLRoEo' }}
          defaultCenter={defaultProps.defaultCenter}
          center={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >

        </GoogleMapReact>
      </div>
    );
  }
}

export default GoogleMap;

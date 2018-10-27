import React, { Component } from 'react';
import './markers.css'

class Markers extends Component {
    render() {
        return (
            <div>
                <img className="testImg" src={require('../../images/food.png')} />
             </div>
            )
    }
}

export default Markers;
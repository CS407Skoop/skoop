import React, { Component } from 'react';
import './markers.css'
import Auto from '../../images/auto.png'
import Business from '../../images/business.png'
import Education from '../../images/education.png'
import Entertainment from '../../images/entertainment.png'
import Food from '../../images/food.png'
import Health from '../../images/health.png'
import Military from '../../images/military.png'
import Politics from '../../images/politics.png'
import Product from '../../images/product.png'
import RealEstate from '../../images/realestate.png'
import Science from '../../images/science.png'
import Sport from '../../images/sport.png'
import World from '../../images/world.png'
import { store } from '../../store';
import { storeArticleDetails } from '../../actions'

class Markers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: this.props.url,
            title: this.props.title,
            category: this.props.category,
            id: this.props.id
        }
    }

    onClick() {
        console.log("IN");
        var toStore = {
            url: this.state.url,
            title: this.state.title,
            id: this.state.id
        }
        store.dispatch(storeArticleDetails(toStore))
    }

    render() {
        var category = this.state.category;
        
        if (category.toUpperCase() === "AUTO") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Auto} />
                </div>
            )
        }
        else if (category.toUpperCase() === "BUSINESS") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Business} />
                </div>
            )
        }
        else if (category.toUpperCase() === "EDUCATION") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Education} />
                </div>
            )
        }
        else if (category.toUpperCase() === "ENTERTAINMENT") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Entertainment} />
                </div>
            )
        }
        else if (category.toUpperCase() === "FOOD") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Food} />
                </div>
            )
        }
        else if (category.toUpperCase() === "HEALTH") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Health} />
                </div>
            )
        }
        else if (category.toUpperCase() === "MILITARY") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Military} />
                </div>
            )
        }
        else if (category.toUpperCase() === "POLITICS") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Politics} />
                </div>
            )
        }
        else if (category.toUpperCase() === "PRODUCT") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Product} />
                </div>
            )
        }
        else if (category.toUpperCase() === "REAL ESTATE") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={RealEstate} />
                </div>
            )
        }
        else if (category.toUpperCase() === "SCIENCE") {
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Science} />
                </div>
            )
        }
        else if (category.toUpperCase() === "SPORT") {
            return(
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={Sport} />
                </div>
            )
        }
        else 
            return (
                <div onClick={this.onClick.bind(this)}>
                    <img className="testImg" src={World} />
                </div>
            )
        
    }
}

export default Markers;
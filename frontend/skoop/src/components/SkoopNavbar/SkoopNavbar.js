import React, { Component } from 'react';
import { Search, Grid, Header, Segment } from 'semantic-ui-react'
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import './SkoopNavbar.css';
import { store } from '../../store';
import { openLogInModal, openSignUpModal, showLogOutModal, enterGuestMode, updateZoom, updateCenter } from '../../actions';
import 'semantic-ui-css/semantic.min.css';
import { FaHome } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Radio, RadioGroup } from 'react-radio-group'; 


class SkoopNavbar extends Component {



    handleNavbarSelect(selectedKey) {
        if (selectedKey === 1) {

            store.dispatch(openLogInModal());


        }

        if (selectedKey === 2) {
            store.dispatch(openSignUpModal());
        }

        if (selectedKey === 3) {
            store.dispatch(showLogOutModal());
        }

        if (selectedKey === 4) {
            store.dispatch(enterGuestMode());
        }
        if (selectedKey === 6) {
            var center = {
                lat: 40.424546,
                lng: -86.921826
            }
            store.dispatch(updateCenter(center))
            store.dispatch(updateZoom(1));
        }
    }

    render() {

        //console.log(store.getState().userLoggedIn)
        if (store.getState().userLoggedIn == false) {
            return (
                <Navbar onSelect={this.handleNavbarSelect.bind(this)}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home"> <p> Skoop </p></a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={5}>
                            <Search
                                showNoResults={false}
                            />
                        </NavItem>
                        <NavItem eventKey={7}> 
                            <RadioGroup
                                name="newsType">
                                <label>
                                    <Radio value="oldNews" />  <p className="radioText"> Old News </p>
                                </label>
                                <label>
                                    <Radio value="newNews" />  <p className="radioText"> Current News </p>
                                </label>
                            </RadioGroup>
                        </NavItem>
                        <NavItem eventKey={6}>

                            <IconContext.Provider value={{ color: "black", size: '2em', style: { margin: '5px 0px 0px 0px'} }}>
                                <div>
                                    <FaHome />
                                </div>
                            </IconContext.Provider>
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            <p> Login </p>
                    </NavItem>
                        <NavItem eventKey={2} href="#">
                            <p> Sign Up </p>
                    </NavItem>

                    </Nav>
                </Navbar>
            );
        }
        else return (
            <Navbar onSelect={this.handleNavbarSelect.bind(this)}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Skoop</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav pullRight>
                    <NavItem eventKey={3} href="#">
                        Log Out
                    </NavItem>
                    <NavItem eventKey={4} href="#">
                        Enter Guest Mode
                    </NavItem>

                </Nav>
            </Navbar>
            );
    }
}

export default SkoopNavbar;

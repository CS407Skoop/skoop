import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import './SkoopNavbar.scss';
import { store } from '../../store';
import { openLogInModal, openSignUpModal, logUserOut, enterGuestMode } from '../../actions';


class SkoopNavbar extends Component {



    handleNavbarSelect(selectedKey) {
        if (selectedKey === 1) {

            store.dispatch(openLogInModal());


        }

        if (selectedKey === 2) {
            store.dispatch(openSignUpModal());
        }

        if (selectedKey === 3) {
            store.dispatch(logUserOut());
        }

        if (selectedKey === 4) {
            store.dispatch(enterGuestMode());
        }
    }

    render() {
        //console.log(store.getState().userLoggedIn)
        if (store.getState().userLoggedIn == false) {
            return (
                <Navbar onSelect={this.handleNavbarSelect.bind(this)}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#home">Skoop</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavItem eventKey={1} href="#">
                            Login
                    </NavItem>
                        <NavItem eventKey={2} href="#">
                            Sign Up
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

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import './SkoopNavbar.scss';
import { store } from '../../store';
import { openLogInModal } from '../../actions';


class SkoopNavbar extends Component {



    handleNavbarSelect(selectedKey) {
        if (selectedKey === 1) {
            
            store.dispatch(openLogInModal());

         
        }
    }

    render() {
       
        return (
            <Navbar onSelect={this.handleNavbarSelect.bind(this)}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#home">Skoop</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
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
}

export default SkoopNavbar;

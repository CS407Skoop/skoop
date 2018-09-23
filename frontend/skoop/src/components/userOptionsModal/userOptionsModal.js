import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { store } from '../../store';
import { openLogInModal, openSignUpModal, enterGuestMode } from '../../actions';

class UserOptionsModal extends Component {
    showSignInModal() {
        store.dispatch(openLogInModal());
    }

    showSignUpModal() {
        store.dispatch(openSignUpModal());
    }

    enterGuestMode() {
        store.dispatch(enterGuestMode());
    }

    render() {
        return (
            <Modal bsSize="large"
                show={store.getState().openOptions}
                aria-labelledby="contained-modal-title-lg"

            >
                
                    <Modal.Header>
                        <Modal.Title>Welcome!</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Welcome to Skoop! Your one stop for news from all around the world.</Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" bsSize="large" block onClick={this.showSignInModal}>Sign In</Button>
                    <Button bsStyle="primary" bsSize="large" block onClick={this.showSignUpModal}>Sign Up</Button>
                    <Button bsSize="large" block onClick={this.enterGuestMode}>Use Guest Mode</Button>
                    </Modal.Footer>
                
            </Modal>
            );
    }
}

export default UserOptionsModal;

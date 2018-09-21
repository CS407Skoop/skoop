import { Modal, Button } from 'react-bootstrap';
import React, { Component } from 'react';
import { store } from '../../store';
import { openLogInModal } from '../../actions';

class UserOptionsModal extends Component {
    showSignInModal() {
        store.dispatch(openLogInModal());
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
                    <Button bsStyle="primary" bsSize="large" block onClick={this.showSignInModal}>Sign Up</Button>
                        <Button bsStyle="primary" bsSize="large" block>Sign In</Button>
                        <Button bsSize="large" block>Use Guest Mode</Button>
                    </Modal.Footer>
                
            </Modal>
            );
    }
}

export default UserOptionsModal;

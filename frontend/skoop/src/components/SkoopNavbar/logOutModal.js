import React, { Component } from 'react';
import './logOutModal.css';
import { store } from '../../store';
import {Modal, Button} from 'react-bootstrap'
import { openLogInModal, openSignUpModal, removeLogOutModal, enterGuestMode, logUserOut } from '../../actions';


class LogOutModal extends Component {
    logUserOut() {
      store.dispatch(logUserOut());
    }

    removeLogOutModal() {
      store.dispatch(removeLogOutModal());
    }

    render() {
    return(
      <Modal bsSize="lg"
          show={true}
          aria-labelledby="contained-modal-title-lg"
        >
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Logging Out</Modal.Title>
          </Modal.Header>

          <Modal.Body>Are you sure you want to log out?</Modal.Body>

          <Modal.Footer>
            <Button bsStyle="primary" onClick = {this.logUserOut}>Yes</Button>
            <Button onClick = {this.removeLogOutModal}>No</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
      );
    }
}

export default LogOutModal;

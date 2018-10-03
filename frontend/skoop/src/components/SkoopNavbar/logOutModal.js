import React, { Component } from 'react';
import './SkoopNavbar.scss';
import { store } from '../../store';
import { openLogInModal, openSignUpModal, logUserOut, enterGuestMode, removeLogOutModal } from '../../actions';


class logOutModal extends Component {
    logUserOut() {
      store.dispatch(logUserOut());
    }

    removeLogOutModal() {
      store.dispatch(removeLogOutModal());
    }
    
    render() {
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
            <Button onClick = {this.logUserOut()}>Yes</Button>
            <Button onClick = {this.removeLogOutModal()}>No</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    }
}

export default logOutModal;

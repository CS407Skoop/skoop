import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {store} from '../../store'
import {closeWarningModal} from '../../actions'

class ErrorModal extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    closeWarningModal() {
        store.dispatch(closeWarningModal());
    }

    render(){

    return(
         <Modal
                show={true}
                bsSize="large"
                aria-labelledby="contained-modal-title-lg"
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-lg">Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {this.props.message}

                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeWarningModal}>Close</Button>
                </Modal.Footer>
              </Modal>
        );
        }

}

export default ErrorModal;
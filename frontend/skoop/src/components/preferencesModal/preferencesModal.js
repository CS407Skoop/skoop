import React, { Component } from 'react';
import { Form, Col, FormControl, Modal, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import {
    
} from '../../actions';
import { store } from '../../store';

class SignUpModal extends Component {

    
    render() {
        return (
            <Modal bsSize="lg"
                show={true}
                aria-labelledby="contained-modal-title-lg"

            >
                <Modal.Header>
                    <Modal.Title>Sign Up!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="favLocations">
                            <Col componentClass={ControlLabel} sm={2}>
                                Favorite Locations
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Location"} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="categories">
                            <Col componentClass={ControlLabel} sm={2}>
                                Categories
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text"} />
                            </Col>
                        </FormGroup>
                        
                        <FormGroup>
                            <Col smOffset={2} sm={2}>
                                <Button bsStyle="primary" >Submit</Button>
                            </Col>
                            <Col smOffset={6} sm={2}>
                                <Button >Cancel</Button>

                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SignUpModal;
import React, { Component } from 'react';
import { Form, Col, FormControl, Modal, FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { signInEmailChange, signInPasswordChange, logInSubmit, initialModalOptions } from '../../actions';
import { store } from '../../store';
import ErrorModal from '../errorModal/errorModal';

class LogInModal extends Component {

    onEmailChange(e) {
        store.dispatch(signInEmailChange(e.target.value));
    }

    onPasswordChange(e) {
        store.dispatch(signInPasswordChange(e.target.value));
    }

    onLogInSubmit() {
        store.dispatch(logInSubmit());
    }

    closeModal() {
        store.dispatch(initialModalOptions());
    }

    showWarning() {
            console.log(store.getState().warningMsg)
            if(store.getState().warning) {
                return <ErrorModal message={store.getState().warningMsg} />
            }else
            return <div />
        }
    render() {
        return (
            <div>
            <this.showWarning />
            <Modal bsSize="lg"
                show={true}
                aria-labelledby="contained-modal-title-lg"

            >
                <Modal.Header>
                    <Modal.Title>Sign In!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="signInEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="signInPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                    <FormControl type="password" onChange={this.onPasswordChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2}>
                                <Button bsStyle="primary" onClick={this.onLogInSubmit}>Sign in</Button>
                              
                            </Col>
                            <Col smOffset={6} sm={2}>
                                <Button onClick={this.closeModal}>Go back</Button>

                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
            </div>
            );
    }
}

export default LogInModal;
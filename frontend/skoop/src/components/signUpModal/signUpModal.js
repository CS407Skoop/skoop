import React, { Component } from 'react';
import { Form, Col, FormControl, Modal, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import {
    signUpEmailChange,
    signUpPasswordChange,
    signUpConfirmPasswordChange,
    signUpSubmit,
    initialModalOptions,
    signUpFirstNameChange,
    signUpLastNameChange
} from '../../actions';
import { store } from '../../store';

class SignUpModal extends Component {

    onFirstNameChange(e) {
        store.dispatch(signUpFirstNameChange(e.target.value))
    }

    onLastNameChange(e) {
        store.dispatch(signUpLastNameChange(e.target.value))
    }

    onEmailChange(e) {
        store.dispatch(signUpEmailChange(e.target.value));
    }

    onPasswordChange(e) {
        store.dispatch(signUpPasswordChange(e.target.value));
    }

    onConfirmPasswordChange(e) {
        store.dispatch(signUpConfirmPasswordChange(e.target.value));
    }

    onSignUpSubmit() {
        store.dispatch(signUpSubmit());
    }

    closeModal() {
        store.dispatch(initialModalOptions());
    }

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
                        <FormGroup controlId="signUpFirstName">
                            <Col componentClass={ControlLabel} sm={2}>
                                First Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="John" onChange={this.onFirstNameChange.bind(this)} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="signUpLastName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Last Name
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Doe" onChange={this.onLastNameChange.bind(this)} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="signUpEmail">
                            <Col componentClass={ControlLabel} sm={2}>
                                Email
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="signUpPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" onChange={this.onPasswordChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="confirmPassword">
                            <Col componentClass={ControlLabel} sm={2}>
                                Re-enter Password
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" onChange={this.onConfirmPasswordChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col smOffset={2} sm={2}>
                                <Button bsStyle="primary" onClick={this.onSignUpSubmit}>Sign up</Button>
                            </Col>
                            <Col smOffset={6} sm={2}>
                                <Button onClick={this.closeModal}>Go back</Button>

                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default SignUpModal;
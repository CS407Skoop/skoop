import React, { Component } from 'react';
import { Form, Col, FormControl, Modal, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {
    closePrefModal,
    changeFirstLocation,
    changeSecondLocation,
    changeThirdLocation,
    submitEditPref
} from '../../actions';
import { store } from '../../store';
import Select from 'react-select';
import { countries } from './countries';
import CategoryCheckbox from './CategoryCheckbox';

class PreferencesModal extends Component {

    closeModal() {
        store.dispatch(closePrefModal())
    }
    submitPref() {
        store.dispatch(submitEditPref());
    }
    categoriesToShow() {
    return (
        <CategoryCheckbox />
        );
    }

    firstOptionChange(e) {
        store.dispatch(changeFirstLocation(e.label))

    }

    secondOptionChange(e) {
            store.dispatch(changeSecondLocation(e.label))
        }
        thirdOptionChange(e) {
                store.dispatch(changeThirdLocation(e.label))
            }

    render() {
        console.log(store.getState());
        
        console.log(store.getState().favoriteLocations)
        var one = store.getState().favoriteLocations[0];
        var two = store.getState().favoriteLocations[1];
        var three = store.getState().favoriteLocations[2];

      for(var i = 0; i<countries.length; i++) {
        if(countries[i].label === store.getState().favoriteLocations[0]) {
            one = i;
        }
        if(countries[i].label === store.getState().favoriteLocations[1]) {
                    two = i;
                }
        if(countries[i].label === store.getState().favoriteLocations[2]) {
                    three = i;
                }
      }

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
                            <Col sm={3}>
                                <Select options={countries} defaultValue={countries[one]} onChange={this.firstOptionChange.bind(this)}/>
                            </Col>
                            <Col sm={3}>
                                <Select options={countries}  defaultValue = {countries[two]} onChange={this.secondOptionChange.bind(this)}/>
                            </Col>
                            <Col sm={3}>
                                <Select options={countries} defaultValue = {countries[three]} onChange={this.thirdOptionChange.bind(this)}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Categories
                            </Col>
                            <Col sm={8}>
                              <this.categoriesToShow />
                              </Col>
                            </FormGroup>
                        
                        <FormGroup>
                            <Col smOffset={2} sm={2}>
                                <Button bsStyle="primary" onClick={this.submitPref} >Submit</Button>
                            </Col>
                            <Col smOffset={6} sm={2}>
                                <Button onClick={this.closeModal} >Cancel</Button>

                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PreferencesModal;
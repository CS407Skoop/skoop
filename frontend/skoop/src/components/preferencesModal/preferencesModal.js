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

    constructor() {
        super();
        var allCats = new Array(store.getState().allCategories.length);
        for(var i = 0; i<store.getState().allCategories.length; i++) {


            var toAdd = {
                value: i,
                label: store.getState().allCategories[i]
            }
            allCats.push(toAdd)
            
        }
        console.log(allCats)
        this.state = {
            allCats: allCats,
            userCats: store.getState().blockedCategories
        }
    }

    onSelectChange(e) {
        this.setState({
            blockedToSend: e
        })
    }

    closeModal() {
        this.setState({
            blockedToSend: []
        })
        store.dispatch(closePrefModal())
    }
    submitPref() {
        store.dispatch(submitEditPref(this.state.blockedToSend));
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
            if(store.getState().userCats){
            if(this.state.userCats.length != store.getState().blockedCategories.length) {
                this.setState({
                    userCats: store.getState().blockedCategories
                })
            }
        }

            
            var userCats = new Array(store.getState().blockedCategories.length);
            for(var i = 0; i<store.getState().allCategories.length; i++) {
                    if(store.getState().blockedCategories.includes(store.getState().allCategories[i])){

                        //console.log("AAAA")
                        //console.log(store.getState().allCategories[i])

                        var toAdd = {
                            value: i,
                            label: store.getState().allCategories[i]
                        }
                        userCats.push(toAdd)
                        }

                        }
        console.log(store.getState().tempFavoriteLocations)
        var one = "";
        var two = "";
        var three = "";
        if(store.getState().tempFavoriteLocations.length > 0)
            one = store.getState().tempFavoriteLocations[0];
        if(store.getState().tempFavoriteLocations.length > 1)
            two = store.getState().tempFavoriteLocations[1];
        if(store.getState().tempFavoriteLocations.length > 2)
            three = store.getState().tempFavoriteLocations[2];

      for(var i = 0; i<countries.length; i++) {
        if(countries[i].label === store.getState().tempFavoriteLocations[0]) {
            one = i;
        }
        if(countries[i].label === store.getState().tempFavoriteLocations[1]) {
                    two = i;
                }
        if(countries[i].label === store.getState().tempFavoriteLocations[2]) {
                    three = i;
                }
      }

        return (
            <Modal bsSize="lg"
                show={true}
                aria-labelledby="contained-modal-title-lg"

            >
                <Modal.Header>
                    <Modal.Title>Edit Preferences</Modal.Title>
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
                            <Col componentClass={ControlLabel} sm={2}>
                               Blocked Categories
                            </Col>
                            <Col sm={8}>
                            <Select
                                defaultValue={userCats}
                                isMulti
                                options={this.state.allCats}
                                onChange={(e) => this.onSelectChange(e)}
                            />
                              </Col>
                            </FormGroup>
                        
                        <FormGroup>
                            <Col smOffset={2} sm={2}>
                                <Button bsStyle="primary" onClick={this.submitPref.bind(this)} >Submit</Button>
                            </Col>
                            <Col smOffset={6} sm={2}>
                                <Button onClick={this.closeModal.bind(this)} >Cancel</Button>

                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}

export default PreferencesModal;
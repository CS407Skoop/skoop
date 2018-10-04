import {Checkbox} from 'react-bootstrap';
import React, {Component} from 'react';
import {store} from '../../store'
import Select from 'react-select'
import {updateNewCategories} from '../../actions'

class CategoryCheckbox extends Component {

    onSelectChange(e) {
        //console.log(event)
        //console.log(e.length);

        console.log("SUPPPP");
        console.log(e)
        var toSend = new Array(e.length);
        for(var i = 0; i<toSend.length; i++) {

            if(e[i] !== undefined && e[i].label !== undefined) {
            var toAdd = e[i].label;

            console.log(toAdd);
            if(toAdd.length !== undefined) {
            toSend.push(toAdd);
            }
            }

        }
        console.log(toSend);


        store.dispatch(updateNewCategories(toSend));
    }
    render() {
    var allCats = new Array(store.getState().allCategories.length);
        for(var i = 0; i<store.getState().allCategories.length; i++) {

            if(store.getState().categories.indexOf(store.getState().allCategories[i])===-1) {
            var toAdd = {
                value: i,
                label: store.getState().allCategories[i]
            }
            allCats.push(toAdd)

            }
            }
            var userCats = new Array(store.getState().categories.length);
            for(var i = 0; i<store.getState().categories.length; i++) {

                        if(store.getState().categories.indexOf(store.getState().allCategories[i])!==-1) {
                        var toAdd = {
                            value: i,
                            label: store.getState().categories[i]
                        }
                        userCats.push(toAdd)

                        }
                        }
    return (
    <Select
        defaultValue={userCats}
        isMulti
        options={allCats}
        onChange={(e) => this.onSelectChange(e)}
      />
      );
      }

}

export default CategoryCheckbox
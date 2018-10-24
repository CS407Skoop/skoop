import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    openOptions: 'true',
    userLoggedIn: false,
    center: {
        lat: 40.424546,
        lng: -86.921826
    }

};

export const store = createStore(reducer, initialState);
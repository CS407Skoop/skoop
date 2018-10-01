import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    openOptions: 'true',
    userLoggedIn: false
};

export const store = createStore(reducer, initialState);
import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = {
    openOptions: 'true'
};

export const store = createStore(reducer, initialState);
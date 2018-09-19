import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = { test: '' };

export const store = createStore(reducer, initialState);
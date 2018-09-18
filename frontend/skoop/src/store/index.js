import { createStore } from 'redux';
import reducer from '../reducers';

const initialState = { test: 'true' };
export const store = createStore(reducer, initialState);
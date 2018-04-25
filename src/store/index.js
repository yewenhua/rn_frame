
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers/index';
import thunkMiddleware from 'redux-thunk';

const applyStoreMiddleware = applyMiddleware(thunkMiddleware)(createStore);
export const store = applyStoreMiddleware(reducers);
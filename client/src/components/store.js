import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootreducer from '../reducers/rootreducer';


const intialstate = {};

const middleware = [thunk];

const store = createStore(rootreducer
    ,intialstate,composeWithDevTools(applyMiddleware(...middleware)))


export default store;
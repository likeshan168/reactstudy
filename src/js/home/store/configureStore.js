import {createStore, applyMiddleWare} from 'redux';

import thunk from 'redux-thunk';

import reducer from '../reducers';
const createStoreWithMiddleware=applyMiddleWare(thunk)(createStore);

export default function configureStore(initialState){
    const store = createStoreWithMiddleware(reducer, initialState);

    if(module.hot){
        module.hot.accept('../reducers',()=>{
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        })
    }

    return store;
}
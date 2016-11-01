import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import reducer from '../reducers';
import logger from '../middleware/logger';
const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);

export default function configureStore(initialState) {
    const store = createStoreWithMiddleware(reducer, initialState);
    console.log(store.getState());
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers');
            store.replaceReducer(nextReducer);
        })
    }

    return store;
}
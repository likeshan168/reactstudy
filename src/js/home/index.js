import React from 'react';
// import { render } from 'react-dom'
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk'
import CounterComponent from './components/Counter';
import couterReducer from './reducers';
const logger = createLogger();
/**中间件是有顺序讲究的，logger中间件一定要放在末尾 */
const store = createStore(couterReducer, applyMiddleware(thunk, logger));
const rootEl = document.getElementById('root');



const render = () => ReactDOM.render(
    <CounterComponent value={store.getState()}
        onInCrement={() => store.dispatch({ type: 'INCREMENT' })}
        onDeCrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
    rootEl
);


store.subscribe(render);
render();

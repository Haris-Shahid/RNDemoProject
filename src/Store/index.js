import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './Reducers';
import logger from 'redux-logger'

const Store = createStore(RootReducer,
    {},
    applyMiddleware(
        thunk,
        logger
    )
);

export default Store;
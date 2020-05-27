import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
// import RavenMiddleware from 'redux-raven-middleware';
import NodeService from '../../util/node-service';
import { INITIAL_STATE } from '../../common/app-const';
import rootReducer from '../root-reducer';
import api from '../middlewares/api';

/**
 * Determine which Redux store to provide based on the
 * Environment Type of Node.js
 * @return {object}    Redux store
 */

const middlewares = [
  thunk,
  api,
];

// middlewares.push(NodeService.isProduction() ? RavenMiddleware() : logger);
if (!NodeService.isProduction()) {
  middlewares.push(logger);
}

// noinspection JSCheckFunctionSignatures
console.log(INITIAL_STATE);
const store = (initialState = INITIAL_STATE) => (
  createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares),
  )
);

export default store;

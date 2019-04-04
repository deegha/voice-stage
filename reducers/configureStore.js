import thunkMiddleware from "redux-thunk"
import {rootReducer} from "../reducers/rootReducer"
import {
    createStore,
    compose,
    applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(
    thunkMiddleware,
))(createStore);

export function initializeStore(initialState = {}) {
  return createStoreWithMiddleware(rootReducer, initialState)
}
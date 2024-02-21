import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import globalReducer from "./reducers/GlobalReducer.jsx";
import { thunk } from 'redux-thunk';

export const reducers = combineReducers({
    global: globalReducer
})

export const store = createStore(reducers, applyMiddleware(thunk));
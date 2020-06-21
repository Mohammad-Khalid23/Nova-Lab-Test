import thunk from 'redux-thunk';
import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Applying thunk middleware
const middleware = applyMiddleware(thunk);
// creating initial store from reducers and redux middleware
const store = createStore(rootReducer, composeEnhancers(middleware));

export default store;
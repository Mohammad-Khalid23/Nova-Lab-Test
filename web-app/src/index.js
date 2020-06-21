import './polyfill'

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import reducers from './reducers';
import thunk from "redux-thunk";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';

import Root from './Root';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))

);

ReactDOM.render(
  <Provider store={store} >
    <Root />
  </Provider>
  ,  document.getElementById('root'));
  registerServiceWorker();
  




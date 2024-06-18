// src/store/store.js

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // Import the devtools extension enhancer
import rootReducer from './reducer'; // Root reducer for your Redux store
import { thunk } from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

// Check if we are in development mode and if the Redux DevTools extension is available
// const isDevelopment = process.env.NODE_ENV === 'development';
// const composeEnhancers = isDevelopment
//   ? composeWithDevTools // Use Redux DevTools if in development
//   : compose; // Use regular compose if in production or DevTools are not available

const store = createStore(
  rootReducer,
  initialState,
  (applyMiddleware(...middleware)) // Apply middleware with the composed enhancers
);

export default store;

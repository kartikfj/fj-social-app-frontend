// src/store/reducer/index.js
import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer'; // Example reducer
import alert from './alert';
import auth from './auth';
import profile from './profile'
// Combine your reducers here
import post from './post'

export default combineReducers({
  example: exampleReducer,
  alert,
  auth,
  profile,
  post,
  // Add other reducers here
});

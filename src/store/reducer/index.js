// src/store/reducer/index.js
import { combineReducers } from 'redux';
import exampleReducer from './exampleReducer'; // Example reducer
import alert from './alert';
import auth from './auth';
import profile from './profile'
// Combine your reducers here
export default combineReducers({
  example: exampleReducer,
  alert,
  auth,
  profile,
  // Add other reducers here
});

import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  // Add other reducers here
});

export default rootReducer;

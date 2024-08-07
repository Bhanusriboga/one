import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import UserReducer from './Users';
import SettingsReducer from './Settings';

const rootReducer = combineReducers({
  auth: AuthReducer,
  // Add other reducers here
  users:UserReducer,
  settings:SettingsReducer
});

export default rootReducer;

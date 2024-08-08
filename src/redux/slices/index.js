import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import UserReducer from './Users';
import SettingsReducer from './Settings';

import RegistrationDetails from './RegistrationDetails';
const rootReducer = combineReducers({
  auth: AuthReducer,
  // Add other reducers here
  users:UserReducer,
  RegistrationDetails:RegistrationDetails,
  settings:SettingsReducer
});

export default rootReducer;

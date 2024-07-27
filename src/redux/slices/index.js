import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import UserReducer from './Users';
import RegistrationDetails from './RegistrationDetails';
const rootReducer = combineReducers({
  auth: AuthReducer,
  // Add other reducers here
  users:UserReducer,
  registration:RegistrationDetails,
});

export default rootReducer;

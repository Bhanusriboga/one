import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import UserReducer from './Users';import StepperSlice from './RegistrationDetails';
import RegistrationDetails from './RegistrationDetails';
const rootReducer = combineReducers({
  auth: AuthReducer,
  registration:RegistrationDetails,
  stepper:StepperSlice,
  // Add other reducers here
  users:UserReducer
});

export default rootReducer;

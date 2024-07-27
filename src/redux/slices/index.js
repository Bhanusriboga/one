import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import StepperSlice from './RegistrationDetails';
import UserSlice from "./users"
import RegistrationDetails from './RegistrationDetails';
const rootReducer = combineReducers({
  auth: AuthReducer,
  registration:RegistrationDetails,
  stepper:StepperSlice,
  user:UserSlice,
  // Add other reducers here
});

export default rootReducer;

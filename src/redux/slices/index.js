import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import StepperSlice from './StepperSlice';
import UserSlice from "./users"
const rootReducer = combineReducers({
  auth: AuthReducer,
  stepper:StepperSlice,
  user:UserSlice
  // Add other reducers here
});

export default rootReducer;

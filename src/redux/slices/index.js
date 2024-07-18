import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './AuthSlice';
import StepperSlice from './StepperSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  stepper:StepperSlice,
  // Add other reducers here
});

export default rootReducer;

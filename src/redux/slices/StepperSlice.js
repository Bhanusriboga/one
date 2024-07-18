import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1,
  formData: {}
};

const stepperSlice = createSlice({
  name: 'stepper',
  initialState,
  reducers: {
    nextStep: (state) => {
      if (state.currentStep < 5) {
        state.currentStep += 1;
      }
    },
    prevStep: (state) => {
      if (state.currentStep > 1) {
        state.currentStep -= 1;
      }
    },
    saveFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    }
  },
});

export const {nextStep, prevStep , saveFormData } = stepperSlice.actions;
export default stepperSlice.reducer;

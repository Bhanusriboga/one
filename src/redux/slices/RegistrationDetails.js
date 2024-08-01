import { createSlice } from "@reduxjs/toolkit";

const RegistrationDetails = createSlice({
  name: "registrationDetails",
  initialState: {
    formData1: {},
    personalData: {},
    ProfessionalData: {},
    textArea: "",
    currentStep: 1,
    uploadedFiles: [],
  },
  reducers: {
    savePersonalData: (state, action) => {
      state.personalData = { ...state.personalData, ...action.payload };
    },
    saveProfessionalData: (state, action) => {
      state.ProfessionalData = { ...state.ProfessionalData, ...action.payload };
    },
    saveTextArea: (state, action) => {
      state.textArea = action.payload;
    },
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
      state.formData1 = { ...state.formData1, ...action.payload };
    },
    saveUploadedFiles: (state, action) => {
      state.uploadedFiles = action.payload;
    },
  },
});

export const {
  savePersonalData,
  saveProfessionalData,
  saveTextArea,
  nextStep,
  prevStep,
  saveFormData,
  saveUploadedFiles,
} = RegistrationDetails.actions;
export default RegistrationDetails.reducer;

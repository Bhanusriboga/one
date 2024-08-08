import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage';

export const BasicDetailsAPICall = createAsyncThunk(
  'registrationDetails/basicDetails',
  async (props, thunkAPI) => {
    const url = `${endPoints.basicDetails}?userId=${Storage.get('userId')}`;

    const data = JSON.stringify({
      dateOfBirth: props.dateOfBirth,
      placeOfBirth: props.placeOfBirth,
      timeOfBirth: "AM",
      religion: props.religion,
      motherTongue: props.motherTongue,
      citizenShip: props.citizenShip,
      languageProficiency: props.languageProficiency,
      instgramId: props.instagramId,
      linkedinId: props.linkedinId || "",
      doorNumber: props.doorNo,
      streetName: props.streetNo,
      city: props.city,
      state: props.state,
      country: props.country,
      postalCode: props.postalCode,
    });
    const headers = {
      'Authorization': `Bearer ${Storage.get('token')}`,
    };
    const { response, error } = await networkCall(url, 'POST', data, headers);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
  }
);

export const personalDetailsAPICall = createAsyncThunk(
  'registrationDetails/personalDetails',
  async (props, thunkAPI) => {
    const url = `${endPoints.personalDetails}?userId=${Storage.get('userId')}`;
    const data = JSON.stringify({
      caste: props.caste,
      subCaste: props.subCaste,
      gothram: props.gothrum,
      star: props.star,
      zodiacSign: props.zodiacSign,
      haveDosham: props.dosham == "Yes" ? true : false,
      whatTypeOfDosham: "string",
      familyStatus: props.family,
      familyType: props.familyType,
      fathername: props.fathername,
      fatherOccupation: props.fatherOccupation,
      mothername: props.mothername,
      motherOccupation: props.motherOccupation,
      noOfSiblings: props.noOfSiblings,
      maritalStatus: props.maritalStatus,
      anyDisabilities: props.disability == "Disabilities" ? "None" : props.disability,
      // height: props.height,
      heiht: 6.2,
      weightType: props.weightUnit,
      weight: props.weight,
      bodyType: props.bodyType,
      complexion: props.complexion,
      smokingHabits: props.smokingHabits,
      eatingHabits: props.eatingHabits,
      description: props.aboutYourself,
      drinkingHabits: props.drinkingHabits
    });


    const headers = {
      'Authorization': `Bearer ${Storage.get('token')}`,
    };


    const { response, error } = await networkCall(url, 'POST', data, headers);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
  }
)

export const professionalDetailsAPICall = createAsyncThunk("registrationDetails/professionalDetails",
  async (props, thunkAPI) => {
    const url = `${endPoints.professionalDetails}?userId=${Storage.get('userId')}`;
    const data = JSON.stringify({
      highestEducation: props.highestEducation,
      // yearOfPassout: props.yearOfPassing,
      yearOfPassout: "2020-06-20",//after backend deployment need to change
      nameOfInstitute: props.nameOfTheInstitute,
      occupation: props.occupation,
      employmentStatus: props.employmentStatus,
      employedIn: props.employedIn,
      workLocation: props.workLocation,
      state: props.workstate,
      city: props.city,
      annualIncome: props.annualIncome
    });
    const headers = {
      'Authorization': `Bearer ${Storage.get('token')}`,
    };
    const { response, error } = await networkCall(url, 'POST', data, headers);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
  })
export const uploadedFilesAPICall = createAsyncThunk("registrationDetails/uploadedFiles", async (formData, thunkAPI) => {
  const config = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${Storage.get("token")}`,
      // Note: `Content-Type` is not explicitly set because the browser will automatically set the correct boundary for `multipart/form-data`
    },
  };

  try {
    const response = await fetch(`https://pr-pellisambanalu-springboot-service.azurewebsites.net/api/v1/${Storage.get("userId")}`, config);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Upload error:", errorData);
      return thunkAPI.rejectWithValue(errorData || "Something went wrong..!");
    }

    const responseData = await response.json();
    return thunkAPI.fulfillWithValue(responseData);
  } catch (error) {
    console.error("Upload error:", error);
    return thunkAPI.rejectWithValue(error.message || "Something went wrong..!");
  }
})

export const userDescriptionAPICall = createAsyncThunk("registrationDetails/userDescription", async (props, thunkAPI) => {
  const url = `${endPoints.userDescription}?userId=${Storage.get('userId')}`;
  const data = JSON.stringify({
    description: props.description
  });
  const headers = {
    'Authorization': `Bearer ${Storage.get('token')}`,
  };
  const { response, error } = await networkCall(url, 'POST', data, headers);
  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
  }
})


const RegistrationDetails = createSlice({
  name: "registrationDetails",
  initialState: {
    formData1: {},
    personalData: {},
    personalDataResponse: {},
    ProfessionalData: {},
    textArea: "",
    currentStep: 1,
    uploadedFiles: [],
    loadder: false
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
  extraReducers: (builder) => {
    builder.addCase(BasicDetailsAPICall.fulfilled, (state, action) => {
      state.formData1 = action.payload;
      state.loadder = false
    }),
      builder.addCase(BasicDetailsAPICall.rejected, (state) => {
        state.loadder = false
      });
    builder.addCase(BasicDetailsAPICall.pending, (state) => {
      state.loadder = true
    });
    builder.addCase(professionalDetailsAPICall.fulfilled, (state, action) => {
      state.ProfessionalData = action.payload;
      state.loadder = false
    }),
      builder.addCase(professionalDetailsAPICall.rejected, (state) => {
        state.loadder = false
      });
    builder.addCase(professionalDetailsAPICall.pending, (state) => {
      state.loadder = true
    });
    builder.addCase(personalDetailsAPICall.fulfilled, (state, action) => {
      state.personalDataResponse = action.payload;
      state.loadder = false
    });
    builder.addCase(personalDetailsAPICall.rejected, (state) => {
      state.loadder = false
    });
    builder.addCase(personalDetailsAPICall.pending, (state) => {
      state.loadder = true
    });
    builder.addCase(uploadedFilesAPICall.fulfilled, (state, action) => {
      state.uploadedFiles = action.payload;
      state.loadder = false
    });
    builder.addCase(uploadedFilesAPICall.rejected, (state) => {
      state.loadder = false
    });
    builder.addCase(uploadedFilesAPICall.pending, (state) => {
      state.loadder = true
    });
    builder.addCase(userDescriptionAPICall.fulfilled, (state) => {
      state.loadder = false
    });
    builder.addCase(userDescriptionAPICall.rejected, (state) => {
      state.loadder = false
    });
    builder.addCase(userDescriptionAPICall.pending, (state) => {
      state.loadder = true
    });
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

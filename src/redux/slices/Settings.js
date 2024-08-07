import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage';


export const requestMobileOtp = createAsyncThunk("settings/requestMobileOtp", async (props, thunkAPI) => {
    const { response, error } = await networkCall(endPoints.requestMobileOtp+props, "POST", props);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})

export const verifyMobileOtp = createAsyncThunk("settings/verifyMobileOtp", async (props, thunkAPI) => {
    const url=`${endPoints.mobileOtpVerify}?userId=${Storage.get("userId")}&otp=${props.otpPhone}&newMobileNumber=${props.newPhone}`
    const { response, error } = await networkCall(url, "POST");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})

export const changePassword = createAsyncThunk("settings/changePassword", async (props, thunkAPI) => {
    const url=`${endPoints.changePassword}?userId=${Storage.get("userId")}&currentPassword=${props.currentPassword}&newPassword=${props.newPassword}`
    const { response, error } = await networkCall(url, "POST");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})

export const verifyEmailOtp = createAsyncThunk("settings/verifyEmailOtp", async (props, thunkAPI) => {
    const url=`${endPoints.verifyEmailOtp}?userId=${Storage.get("userId")}&otp=${props.otpEmail}&newEmail=${props.newEmail}`
    const { response, error } = await networkCall(url, "POST");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})
export const requestEmailOtp = createAsyncThunk("settings/requestEmailOtp", async (props, thunkAPI) => {
    const { response, error } = await networkCall(endPoints.requestEmailOtp+props, "POST", props);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})


export const deleteAccount = createAsyncThunk("settings/deleteAccount", async (props, thunkAPI) => {
    const url=`${endPoints.deleteAccount}?userId=${Storage.get("userId")}&reason=${props}`
    const { response, error } = await networkCall(url, "DELETE");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
    }
})


const SettingsSlice = createSlice({
    name: 'settings',
    initialState: {
      loading: false,
      message:""
    },
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(requestMobileOtp.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(requestMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      builder.addCase(requestMobileOtp.rejected, (state) => {
        state.loading = false;
        state.message = "Something went wrong..!";
      })
      builder.addCase(verifyMobileOtp.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(verifyMobileOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      builder.addCase(verifyMobileOtp.rejected, (state) => {  
        state.loading = false;
        state.message = "Something went wrong..!";
      })
      builder.addCase(requestEmailOtp.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(requestEmailOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      builder.addCase(requestEmailOtp.rejected, (state) => {
        state.loading = false;
        state.message = "Something went wrong..!";
      })
      builder.addCase(changePassword.pending, (state) => {
        state.loading = true; 
      })
      builder.addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      builder.addCase(changePassword.rejected, (state) => { 
        state.loading = false;
        state.message = "Something went wrong..!";
      })  
    }
  });

  export default SettingsSlice.reducer
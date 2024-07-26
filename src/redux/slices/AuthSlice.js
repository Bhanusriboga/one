import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage'

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (props, thunkAPI) => {
    const data={
      email:props.userEmail,
      password:props.userPass,
      userName:props.fullname,
      mobileNumber:props.mobile,
      gender:props.gender.toUpperCase()
    }
    const { response } = await networkCall(endPoints.signup, "POST", JSON.stringify(data));
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (props, thunkAPI) => {
    const { response } = await networkCall(endPoints.login, "POST", JSON.stringify(props));
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: "",
    data: null,
    token: Storage.get("token")||null
  },
  reducers: {
    logout: (state) => {
      Storage.clearAll();
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
      })
      builder.addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.token = action.payload.jwt
        Storage.set("token", action.payload.jwt);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.token = action.payload.jwt
        Storage.set("token", action.payload.jwt);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;

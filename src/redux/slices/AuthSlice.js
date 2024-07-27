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
    const { response,error } = await networkCall(endPoints.signup, "POST", JSON.stringify(data));
    if (response) {
      return thunkAPI.fulfillWithValue(response.data);
    }
    else {
      return thunkAPI.rejectWithValue(error||"Something went wrong..!")

    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (props, thunkAPI) => {
    const { response, error } = await networkCall(endPoints.login, "POST", JSON.stringify(props));
    if (response) {
      return thunkAPI.fulfillWithValue(response.data);
    }
    else {
      return thunkAPI.rejectWithValue(error||"Something went wrong..!")
    }
  }
)

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (_, thunkAPI) => {
    const token=Storage.get("token")
    if(token){
      const { userId } = Storage.get("userInfo");
      const header={
        Authorization: token
      }
      const { response, error } = await networkCall(endPoints.userInfo+userId, 'GET',header);
      if (response) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
      }
    }else{
      return thunkAPI.rejectWithValue('token not exist..!');
    }
  }
);

const AuthSlice = createSlice({
  name: 'auth',
  initialState: {
    loading: false,
    error: "",
    Mydata: {},
    userId: Storage.get("userId")||null,
    token: Storage.get("token")||null
  },
  reducers: {
     logout: (state) => {
      Storage.clearAll();
      state.token = null;
      state.userId = null;
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
        Storage.set("userId", action.payload.userId);
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
        state.token = action.payload.jwt;
        //for temparery we are directly storing token in local storage after signup but after implementing otp verification we need to store token in session storage
        Storage.set("token", action.payload.jwt);
        Storage.set("userId", action.payload.userId);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.Mydata = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        logout(state)
      });
  }
});

export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;

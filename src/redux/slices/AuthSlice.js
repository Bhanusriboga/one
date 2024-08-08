import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";
import Storage from "../../utils/Storage";

export const userSignup = createAsyncThunk(
  "auth/signup",
  async (props, thunkAPI) => {
    const data = {
      email: props.userEmail,
      password: props.userPass,
      userName: props.fullname,
      mobileNumber: props.mobile,
      gender: props.gender.toUpperCase(),
    };
    const { response, error } = await networkCall(
      endPoints.signup,
      "POST",
      JSON.stringify(data)
    );
    if (response) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (props, thunkAPI) => {
    const { response, error } = await networkCall(
      endPoints.login,
      "POST",
      JSON.stringify(props)
    );
    if (response) {
      return thunkAPI.fulfillWithValue(response.data);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }
  }
);
//{{Dev-Url}}/request-mobile-otp?mobile=9701941724
export const requestOtpForgetApi = createAsyncThunk('auth/requestOtpForgetApi', async (props, thunkAPI) => {
  const url = `${endPoints.requestOtpForgetApi}?mobile=${props.mobile}`;
  const { response, error } = await networkCall(url, "POST");

  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  } 
})
//{{Dev-Url}}/user-otp-verification?mobile=8919127541&otp=680530
export const otpverifyForgetApi = createAsyncThunk('auth/otpverifyForgetApi', async (props, thunkAPI) => {
  const url = `${endPoints.otpverifyForgetApi}?mobile=${props.mobile}&otp=${props.otp}`;
  const { response, error } = await networkCall(url, "POST");
  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  }
}) 
//{{Local_Url}}/forgot-password?mobileNumber=8465044553&password=Shyam@123
export const changePasswordForgotApi = createAsyncThunk('auth/changePasswordForgotApi', async (props, thunkAPI) => {
  const url = `${endPoints.changePasswordForgot}?mobileNumber=${props.mobile}&password=${props.newPassword}`;
  const { response, error } = await networkCall(url, "POST");
  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  }
})

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    const token = Storage.get("token");
    if (token) {
      const { userId } = Storage.get("userInfo");
      const header = {
        Authorization: token,
      };
      const { response, error } = await networkCall(
        endPoints.userInfo + userId,
        "GET",
        header
      );
      if (response) {
        return thunkAPI.fulfillWithValue(response.data);
      } else {
        return thunkAPI.rejectWithValue(error || "Something went wrong..!");
      }
    } else {
      return thunkAPI.rejectWithValue("token not exist..!");
    }
  }
);
export const otpverify = createAsyncThunk(
  "auth/otpverify",
  async (props, thunkAPI) => {
    const url = `${endPoints.otpverify}?mobile=${props.mobile}&otp=${props.otp}`;
    const { response, error } = await networkCall(url, "POST");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }
  }
);
export const reSendOtp = createAsyncThunk(
  "auth/reSendOtp",
  async (props, thunkAPI) => {
    const url = `${endPoints.reSendOtp}?mobile=${props.mobile}`;
    const { response, error } = await networkCall(url, "POST");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }
  }
);
// request-mobile-otp
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: "",
    Mydata: {},
    userId: Storage.get("userId") || null,
    token: Storage.get("token") || null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      Storage.clearAll();
      state.token = null;
      state.userId = null;
    },
    setToken: (state) => {
      state.token = Storage.get("token");
      state.userId = Storage.get("userId");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userSignup.pending, (state) => {
      state.loading = true;
    });
    builder
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
        if (action.error) {
          state.error = action.payload.message;
        }
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
        logout(state);
      });
    builder
      .addCase(otpverify.pending, (state) => {
        state.loading = true;
      })
      .addCase(otpverify.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        Storage.set("token", action.payload.jwt);
        Storage.set("userId", action.payload.userId);
      })
      .addCase(otpverify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(reSendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(reSendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(reSendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(requestOtpForgetApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestOtpForgetApi.fulfilled, (state, action) => {
        state.loading = false;
       
      })
      .addCase(requestOtpForgetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(otpverifyForgetApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(otpverifyForgetApi.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        Storage.set("token", action.payload.jwt);
        Storage.set("userId", action.payload.userId);
      })
      .addCase(otpverifyForgetApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
      builder
      .addCase(changePasswordForgotApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordForgotApi.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message;
      })
      .addCase(changePasswordForgotApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
   
  },
});

export const { logout, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;

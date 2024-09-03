import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";
import Storage from "../../utils/Storage";
// import { useDispatch } from 'react-redux'
export const userSignup = createAsyncThunk(
  "auth/signup",
  async (props, thunkAPI) => {
    const data = {
      email: props.userEmail,
      password: props.userPass,
      userName: props.fullname,
      mobileNumber: props.mobile,
      gender: props.gender.toUpperCase(),
      role:"USER"
    };
    const { response, error } = await networkCall(
      endPoints.signup,
      "POST",
      JSON.stringify(data)
    );
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error||"Something went wrong..!")

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
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue(error||"Something went wrong..!")
    }
  }
)

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, thunkAPI) => {
    const token=Storage.get("token")
    // const dispatch = useDispatch()
    if(token){
      const  userId  = Storage.get("userId");
      const header={
        Authorization: `Bearer ${token}`
      }
      const { response, error } = await networkCall(endPoints.userInfo+userId, 'GET',_,header);
      if (response) {
        // dispatch(updateMydata(response))
        return thunkAPI.fulfillWithValue(response);
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
export const getMyDetails=createAsyncThunk(
  "auth/getMyDetails",
  async (_, thunkAPI) => {
    const token=Storage.get("token")
    if(token){
      const  userId  = Storage.get("userId");
      const header={
        Authorization: `Bearer ${token}`
      }
      const { response, error } = await networkCall(endPoints.userInfo + userId, 'GET', _, header);
      if (response) {
        return thunkAPI.fulfillWithValue(response);
      } else {
        return thunkAPI.rejectWithValue(error || 'Something went wrong..!');
      }
    }else{
      return thunkAPI.rejectWithValue('token not exist..!');
    }
  }
)
export const requestOtpForgetApi = createAsyncThunk('auth/requestOtpForgetApi', async (props, thunkAPI) => {
  const url = `${endPoints.requestOtpForgetApi}?mobile=${props.mobile}`;
  const { response, error } = await networkCall(url, "POST");

  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  } 
})

export const otpverifyForgetApi = createAsyncThunk('auth/otpverifyForgetApi', async (props, thunkAPI) => {
  
  const url = `${endPoints.otpverifyForgetApi}?mobile=${props.mobile}&otp=${props.otp}`;
  const { response, error } = await networkCall(url, "POST");
  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  }
}) 

export const changePasswordForgotApi = createAsyncThunk('auth/changePasswordForgotApi', async (props, thunkAPI) => {
  const url = `${endPoints.changePasswordForgot}?mobileNumber=${props.mobile}&otp=${props.otp}&password=${props.newPassword}`;
  const { response, error } = await networkCall(url, "POST");
  if (response) {
    return thunkAPI.fulfillWithValue(response);
  } else {
    return thunkAPI.rejectWithValue(error || "Something went wrong..!");
  }
})

// request-mobile-otp
const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: "",
    Mydata: {},
    userId: Storage.get("userId") || null,
    token: Storage.get("token") || null,
    role: Storage.get("role") || null,
    message: null,
  },
  reducers: {
    logout: (state) => {
      Storage.clearAll();
      state.token = null;
      state.userId = null;
      state.role = null;
      state.Mydata = {};
    },
    setToken: (state) => {
      state.token = Storage.get("token");
      state.userId = Storage.get("userId");
      state.role = Storage.get("role");
    },
    updateMydata: (state) => {
      console.log(state,"testing redux state")
      state.Mydata = { ...state.Mydata,basicDetailsAvailable:true };
    }},
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
        state.Mydata = action.payload;
        state.token = action.payload?.jwt
        state.role = action.payload?.role
        Storage.set("token", action.payload?.jwt);
        Storage.set("userId", action.payload?.userId);
        Storage.set("role", action.payload?.role);
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
        state.Mydata = action.payload;
        state.role = action.payload?.role
        Storage.set("token", action.payload?.jwt);
        Storage.set("userId", action.payload?.userId);
        Storage.set("role", action.payload?.role);
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

    builder.addCase(getMyDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(getMyDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.Mydata = action.payload?.object;
    })
    .addCase(getMyDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder
    .addCase(requestOtpForgetApi.pending, (state) => {
      state.loading = true;
    })
    .addCase(requestOtpForgetApi.fulfilled, (state) => {
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
}
});

export const { logout, setToken,updateMydata } = AuthSlice.actions;
export default AuthSlice.reducer;

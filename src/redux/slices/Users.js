import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage';
// this method is used to get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    const { response } = await networkCall(endPoints.getAllUsers+Storage.get("userId"), "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
//  this function will change the status of the user
//  it will used to either ignore or shortlist or move them to initial state
//  it accept the object which contains affectedUserId, userStatus and changeByUserId
export const changeUserStatus = createAsyncThunk(
  "users/changeUserStatus",
  async (props, thunkAPI) => {
    const { response } = await networkCall(endPoints.userStatus, "POST", props);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)


// This function is used to get users by status
// userState are  Ignored, Shortlisted and Active. userId is our own id
export const getIgnoredUsers = createAsyncThunk(
  "users/getIgnoredUsers",
  async (_, thunkAPI) => {
    const userId = Storage.get("userId")
    const url = `${endPoints.userByStatus}?userId=${userId}&userStatus=Ignored`
    const { response } = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const updatebasicdetails = createAsyncThunk(
  "users/updatebasicdetails",
  async (props, thunkAPI) => {
    const userId = Storage.get("userId")
    const url = `${endPoints.editUserbasicdetails}?userId=${userId}`
    const { response } = await networkCall(url, "PUT", JSON.stringify(props));
    if (response) {
      console.logI(response,"testing response")
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const updatepersonaldetails = createAsyncThunk(
  "users/updatepersonaldetails",
  async (props, thunkAPI) => {
    const userId = Storage.get("userId")
    const url = `${endPoints.editUserpersonaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "POST", JSON.stringify(props));
    if (response) {
      console.logI(response,"testing response")
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const updateprofesionaldetails = createAsyncThunk(
  "users/updateprofesionaldetails",
  async (props, thunkAPI) => {
    const userId = Storage.get("userId")
    const url = `${endPoints.editUserprofessionaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "POST", JSON.stringify(props));
    if (response) {
      console.logI(response,"testing response")
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const getShortListedUsers = createAsyncThunk(
  "users/getShortListedUsers",
  async (_, thunkAPI) => {
    const userId = Storage.get("userId")
    const url = `${endPoints.userByStatus}?userId=${userId}&userStatus=Shortlisted`
    const { response } = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
const UserSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    data: [],
    shortlisted: [],
    ignored: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload?.object;
    })
    builder.addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
      });
    builder.addCase(getShortListedUsers.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getShortListedUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.shortlisted = action.payload.object;
    })
    builder.addCase(getShortListedUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getIgnoredUsers.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(getIgnoredUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.ignored = action.payload.object;
    })
    builder.addCase(getIgnoredUsers.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changeUserStatus.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(changeUserStatus.fulfilled, (state) => {
      state.loading = false;
    })
    builder.addCase(changeUserStatus.rejected, (state) => {
        state.loading = false;
      });
  }
});

// export const {  } = UserSlice.actions;
export default UserSlice.reducer;
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";

export const shortlistedUsersPost = createAsyncThunk(
  "user/shortlisted",
  async (props,thunkAPI) => { 
    const data={
      affectedUserId:"PR35001",
      userStatus:"Shortlisted",
      changeByUserId:"PR35000"
  }
    const {response} = await networkCall(endPoints.usersState, "POST",JSON.stringify(data));
    if(response)
    return thunkAPI.fulfillWithValue(response.data);
    else{
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
);

const UserSlice = createSlice({
  name: "users",
  initialState: {
    shortlistedUsers:null,
    loading:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shortlistedUsersPost.fulfilled, (state, action) => {
      state.shortlistedUsers=action.payload;
      state.loading=true;
    });
    builder.addCase(shortlistedUsersPost.rejected, (state, action) => {
      state.shortlistedUsers=action.payload;
    });
    builder.addCase(shortlistedUsersPost.pending, (state) => {
      state.loading=true;
    });
  },
});

// export const { } = UserSlice.actions;
export default UserSlice.reducer;

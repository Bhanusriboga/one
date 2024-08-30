import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";

export const getAllAdminUsers = createAsyncThunk(
  "adminUsers/getAllAdminUsers",
  async (_, thunkAPI) => {
    const url=`admin/${endPoints.getadminallusers}`
    const { response } = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue("Something went wrong..!");
    }
  }
);
export const getAllAdminDeleteUsers = createAsyncThunk(
  "deleteUser/getAllAdminDeleteUsers",
  async (_, thunkAPI) => {
    const url=`admin/${endPoints.getAllDeleteUsers}`
    const {response} = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);   
  } else {
      return thunkAPI.rejectWithValue("Something went wrong..!");
    }
  }
)
export const getAllVendorApproveUsers = createAsyncThunk(
  'vendorUsers/getAllVendorApproveUsers',
  async (_, thunkAPI) => {
    const url=`admin/${endPoints.getAllVendorApproveUsers}`
    const {response} = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue("Something went wrong..!");
    }
  }
)


const adminUsers = createSlice({
    name: "adminUsers",
    initialState: {
      loading: false,
      data:[]
    },
    reducers: {},
       extraReducers: (builder) => {
         builder
           .addCase(getAllAdminUsers.pending, (state) => {
             state.loading = true;
           })
           .addCase(getAllAdminUsers.fulfilled, (state, action) => {
             state.loading = false;
             state.data = action.payload?.object;
           })
           .addCase(getAllAdminUsers.rejected, (state) => {
             state.loading = false;
           });
         builder
         .addCase(getAllAdminDeleteUsers.pending, (state) => {
           state.loading = true;
         })
         .addCase(getAllAdminDeleteUsers.fulfilled, (state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase(getAllAdminDeleteUsers.rejected, (state) => {
           state.loading = false;
         });
         builder
         .addCase(getAllVendorApproveUsers.pending, (state) => {
           state.loading = true;
         })
         .addCase(getAllVendorApproveUsers.fulfilled, (state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase(getAllVendorApproveUsers.rejected, (state) => {
           state.loading = false;
         });
       }
  });
  export default adminUsers.reducer

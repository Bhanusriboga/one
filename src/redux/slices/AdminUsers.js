import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";
import Storage from "../../utils/Storage";
export const getAllAdminUsers = createAsyncThunk(
  "adminUsers/getAllAdminUsers",
  async (_, thunkAPI) => {
    const url=`admin/${endPoints.getadminallusers}?userId=${Storage.get("userId")}`
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
export const adminDeleteRequest = createAsyncThunk(
  'adminUsers/adminDeleteRequest',
  async (props, thunkAPI) => {

    const data = {
      userId: props.selectedUserId,
      reason: props.reason,
      vendorId: Storage.get('userId') 
    };
    
    const header = {
      Authorization: `Bearer ${Storage.get("token")}`
    };

    const url = `admin/${endPoints.adminDeleteUser}`;

    try {
      const { response } = await networkCall(url, "POST", JSON.stringify(data), header);
      if (response) {
        return thunkAPI.fulfillWithValue(response);
      } else {
        return thunkAPI.rejectWithValue("Something went wrong..!");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong..!");
    }
  }
);

//graph api
//https://pr-pellisambanalu-springboot-service.azurewebsites.net/api/v1/admin/users-analytics
 export const graphApi = createAsyncThunk(
   'adminUsers/graphapi',
   async (_, thunkAPI) => {
     const url=`admin/${endPoints.graphapi}`
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
         builder 
         .addCase(adminDeleteRequest.pending, (state) => {
           state.loading = true;
         })
         .addCase(adminDeleteRequest.fulfilled,(state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase(adminDeleteRequest.rejected, (state) => {
           state.loading = false;
         });
         builder 
         .addCase(graphApi.pending,(state)=>{
           state.loading=true
         })
         .addCase(graphApi.fulfilled,(state,action)=>{
           state.loading=false
           state.data=action.payload?.object
         })
         .addCase(graphApi.rejected,(state)=>{
           state.loading=false
         })
       }
  });
  export default adminUsers.reducer

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


    
    const header = {
      Authorization: `Bearer ${Storage.get("token")}`
    };

    const url = `admin/${endPoints.adminDeleteUser}?userId=${props.selectedUserId}&vendorId=${Storage.get("userId")}&reason=${props.reason}`;

    try {
      const { response } = await networkCall(url, "POST", null, header);
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
 export const usersFilter = createAsyncThunk(
  'adminUsers/usersFilter',
  async (props, thunkAPI) => {
    const data = {
      vendorId: Storage.get('userId') ,
      mobile: props.searchTerm
    }
    const url = `admin/${endPoints.userfilter}`;
    const {response} = await networkCall(url, "POST", JSON.stringify(data));
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue("Something went wrong..!");
    }


  }
 )
 export const adminDirectDeleteUser = createAsyncThunk(
  'adminUsers/adminDirectDeleteUser',
  async (props, thunkAPI) => {

    const url=`${endPoints.adminDirectDeleteUser}?userId=${props.selectedUserId}&reason=${props.reason}`
    const {response} = await networkCall(url, "DELETE");
    if (response) {
      return thunkAPI.fulfillWithValue(response)
  }else {
    return thunkAPI.rejectWithValue("Something went wrong..!")
  }
}
 )
 export const approveUsersByAdmin = createAsyncThunk(
  'adminUsers/approveUsersByAdmin',

  async(props, thunkAPI) => {
    const header = {
      Authorization: `Bearer ${Storage.get("token")}`
    };
   const url=`admin/${endPoints.approveByAdmin}?userId=${Storage.get("userId")}&mobileNumber=${props.mobileNumber}&status=${props.userStatus}`
    const {response} = await networkCall(url, "POST",null, header);
    if (response) {
      return thunkAPI.fulfillWithValue(response)
    }else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
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
         builder
         .addCase(usersFilter.pending, (state) => {
           state.loading = true;
         })
         .addCase(usersFilter.fulfilled, (state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase(usersFilter.rejected, (state) => {
           state.loading = false;
         });
         builder
         .addCase (adminDirectDeleteUser.pending, (state) => {  
           state.loading = true;
         })
         .addCase (adminDirectDeleteUser.fulfilled, (state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase (adminDirectDeleteUser.rejected, (state) => {
           state.loading = false;
         });
         builder
         .addCase (approveUsersByAdmin.pending, (state) => {
           state.loading = true;
         })
         .addCase (approveUsersByAdmin.fulfilled, (state, action) => {
           state.loading = false;
           state.data = action.payload?.object;
         })
         .addCase (approveUsersByAdmin.rejected, (state) => {
           state.loading = false;
         });
       }
  });
  export default adminUsers.reducer

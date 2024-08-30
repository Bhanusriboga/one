import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import networkCall from '../../utils/NetworkCall';
import { endPoints } from '../../config/config';
import Storage from '../../utils/Storage';
import Showtoast from '../../common-components/showToast';
// this method is used to get all users
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    const { response } = await networkCall(endPoints.userFilter+Storage.get("userId"), "POST",JSON.stringify({}));
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
    const userId=Storage.get("userId")
    const { response } = await networkCall(`${endPoints.userStatus}?userId=${userId}`, "POST", JSON.stringify(props));
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)

export const UserFilterApi=createAsyncThunk(
  "users/UserFilterApi",
  async (props, thunkAPI) => {
    const userId=Storage.get("userId");
    const { response } = await networkCall(`${endPoints.userFilter}${userId}`, "POST",JSON.stringify(props));
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
  "users/getbasicdetails",
  async (props, thunkAPI) => {
    const userId = Storage.get("userId")
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserbasicdetails}?userId=${userId}`
    const { response } = await networkCall(url, "PUT", JSON.stringify(props),header);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const getbasicdetails = createAsyncThunk(
  "users/getbasicdetails",
  async (_, thunkAPI) => {
    const userId = Storage.get("userId")
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserbasicdetails}?userId=${userId}`
    const { response } = await networkCall(url, "GET",_, header);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const getpersonaldetails = createAsyncThunk(
  "users/updatepersonaldetails",
  async (_, thunkAPI) => {
    const userId = Storage.get("userId")
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserpersonaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "GET",_,header);
    if (response) {
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
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserpersonaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "PUT", JSON.stringify(props),header);
    if (response) {
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
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserprofessionaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "PUT", JSON.stringify(props),header);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const getprofesionaldetails = createAsyncThunk(
  "users/updateprofesionaldetails",
  async (_, thunkAPI) => {
    const userId = Storage.get("userId")
    const token=Storage.get("token")
    const header={
      Authorization: `Bearer ${token}`
    }
    const url = `${endPoints.editUserprofessionaldetails}?userId=${userId}`
    const { response } = await networkCall(url, "GET",_,header);
    if (response) {
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

export const getCaste=createAsyncThunk(
  "users/getCaste",
  async (_, thunkAPI) => {
    const { response, error } = await networkCall(endPoints.getCastes, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }
  }
)

export const getSubCaste=createAsyncThunk(
  "users/getSubCaste",
  async (props, thunkAPI) => {
    const url=`${endPoints.getSubCaste}?caste=${props}`
    const { response, error } = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue(error || "Something went wrong..!");
    }})
export const getSelectedUserInfo = createAsyncThunk(
  "users/getSelectedUserInfo",
  async (props, thunkAPI) => {
    const url = `${endPoints.singleuserInfo}?userId=${props}`
    const { response } = await networkCall(url, "GET");
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const getPhotos = createAsyncThunk(
  "users/getPhotos",
  async (_, thunkAPI) => {
    const url = `${endPoints.media}/${Storage.get("userId")}`
    const header={
      Authorization: `Bearer ${Storage.get("token")}`
    }
    const { response } = await networkCall(url, "GET",_,header);
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    }
    else {
      return thunkAPI.rejectWithValue("Something went wrong..!")
    }
  }
)
export const uploadPic=createAsyncThunk(
  "users/uploadPic",
  async (formData, thunkAPI) => {
    const config = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Storage.get("token")}`,
      },
    };

    try {
      const response = await fetch(
        `https://pr-pellisambanalu-springboot-service.azurewebsites.net/api/v1/media-files/${Storage.get(
          "userId"
        )}`,
        config
      );
      if (!response.ok) {
        const errorData = await response.json();
        return thunkAPI.rejectWithValue(errorData || "Something went wrong..!");
      }

      const responseData = await response.json();
      return thunkAPI.fulfillWithValue(responseData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Something went wrong..!"
      );
    }
  }
)
export const deletePic=createAsyncThunk(
  "users/deletePic",
  async (props, thunkAPI) => {
    const url = `${endPoints.media}/${Storage.get("userId")}/${props}`
    const header={
      Authorization: `Bearer ${Storage.get("token")}`
    }
    const { response } = await networkCall(url, "DELETE",null,header);
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
    basicdetails:{},
    personaldetails:{},
    selelectedUserInfo:{},
    profesionalDetails:{},
    shortlisted: [],
    ignored: [],
    castes:[],
    subcast:[],
    subLoader:false,
    photos:[],
    isOpen:false
  },
  reducers: {
    setIsOpen:(state,action)=>{
      state.isOpen=action.payload
    },
    setSelectedUserInfoEmpty:(state)=>{
      state.selelectedUserInfo={}
    }
  },
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
    builder.addCase(UserFilterApi.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(UserFilterApi.fulfilled, (state,action) => {
      state.loading = false;
      if(action?.object){
        state.data=action?.object
      }
    })
    builder.addCase(UserFilterApi.rejected, (state) => {
        state.loading = false;
        Showtoast("Filters not applyed, Something went wrong..!")
    })
      builder.addCase(getbasicdetails.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(getbasicdetails.fulfilled, (state, action) => {
        console.log(action,"testing")
        state.loading = false;
        state.basicdetails=action.payload?.object;
      })
      builder.addCase(updatepersonaldetails.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(updatepersonaldetails.fulfilled, (state, action) => {
        console.log(action,"testing")
        state.loading = false;
        state.personaldetails=action.payload?.object;
      })
      builder.addCase(updateprofesionaldetails.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(updateprofesionaldetails.fulfilled, (state, action) => {
        state.loading = false;
        state.profesionalDetails=action.payload?.object;
      })
      builder.addCase(getCaste.pending, (state) => {
        state.subLoader = true;
      })
      .addCase(getCaste.fulfilled, (state, action) => {
        state.subLoader = false;
        state.castes = action.payload?.object;
      })
      .addCase(getCaste.rejected, (state, action) => {
        state.subLoader = false;
        state.error = action.error.message;
      });
      builder.addCase(getSubCaste.pending, (state) => {
        state.subLoader = true;
      })
      .addCase(getSubCaste.fulfilled, (state, action) => {
        state.subLoader = false;
        state.subcast = action.payload;
      })
      .addCase(getSubCaste.rejected, (state, action) => {
        state.subLoader = false;
        state.error = action.error.message;
      });
      builder.addCase(getSelectedUserInfo.rejected, (state) => {
        state.loading = false;
      });
      builder.addCase(getSelectedUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.selelectedUserInfo=action.payload?.object;
      })
      builder.addCase(getPhotos.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload?.object;
      })
      .addCase(getPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder.addCase(deletePic.pending, (state) => {
        state.loading = true;        
      })
      .addCase(deletePic.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload?.object;
      })
      .addCase(deletePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      builder.addCase(uploadPic.pending, (state) => {
        state.loading = true;        
      })
      .addCase(uploadPic.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload?.object;
      })
      .addCase(uploadPic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { setIsOpen,setSelectedUserInfoEmpty } = UserSlice.actions;
export default UserSlice.reducer;

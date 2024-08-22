import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import networkCall from "../../utils/NetworkCall";
import { endPoints } from "../../config/config";
import Storage from "../../utils/Storage";

export const getProfilePic = createAsyncThunk(
  "profilePic/getProfilePic",
  async (_, thunkAPI) => {
    const headers = {
      Authorization: `Bearer ${Storage.get("token")}`,
    };
    const url = `${endPoints.getprofilepic}?userId=${Storage.get("userId")}`;
    const { response } = await networkCall(url, "GET", _, headers);
  
    if (response) {
      return thunkAPI.fulfillWithValue(response);
    } else {
      return thunkAPI.rejectWithValue("Something went wrong..!");
    }
  }
);

export const updateProfilePic = createAsyncThunk(
  "updateProfilePic/uploadProfilePic",
  async (formData, thunkAPI) => {
    const config = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Storage.get("token")}`,
        // Note: `Content-Type` is not explicitly set because the browser will automatically set the correct boundary for `multipart/form-data`
      },
    };

    try {
      const response = await fetch(
        `https://pr-pellisambanalu-springboot-service.azurewebsites.net/api/v1/profile-picture?userId=${Storage.get(
          "userId"
        )}`,
        config
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Upload error:", errorData);
        return thunkAPI.rejectWithValue(errorData || "Something went wrong..!");
      }

      const responseData = await response.json();
      return thunkAPI.fulfillWithValue(responseData);
    } catch (error) {
      console.error("Upload error:", error);
      return thunkAPI.rejectWithValue(
        error.message || "Something went wrong..!"
      );
    }
  }
);
const profilePic = createSlice({
  name: "profilePic",
  initialState: {
    loading: false,
    profilePic: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfilePic.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profilePic = payload;
      })
      .addCase(getProfilePic.rejected, (state) => {
        state.loading = false;
      });

    builder
      .addCase(updateProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfilePic.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.profilePic = payload;
      })
      .addCase(updateProfilePic.rejected, (state) => {
        state.loading = false;
      });
  },
});
export default profilePic.reducer;

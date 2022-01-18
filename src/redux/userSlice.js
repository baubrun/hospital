import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../utils";


export const createUser = createAsyncThunk(
  "/user/create", 
async (data) => {
  try {
    const res = await axios.post(`${domain}/user`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


export const readUser = createAsyncThunk(
  "/user/read", 
  async (data) => {
  try {
    const res = await axios.post(`${domain}/user`, data);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error
    };
  }
});


export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    error: "",
    user: {},
  },
  reducers: {
    logOut: (state) => {
      state.loggedIn = false;
      state.user = {};
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
      }
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },


    [readUser.pending]: (state) => {
      state.loading = true;
    },
    [readUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, user } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.loggedIn = true;
        state.user = user;
      }
    },
    [readUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

  },
});

export const { logOut } = userSlice.actions;

export const userState = (state) => state.user;
export default userSlice.reducer;

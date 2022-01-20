import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./layoutSlice";
import baseUrl from "./util";

export const getWaitingList = createAsyncThunk(
  "/patients/getWaitingList",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { data } = await axios.get(`${baseUrl}/patients/waiting`);
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

export const patientSlice = createSlice({
  name: "patients",
  initialState: {
    waitingList: [],
  },
  reducers: {
    filterPatientList: (state, action) => {
      state.waitingList = state.waitingList.filter(
        (p) => p._id !== action.payload?.id
      );
    },
    setPatients: (state, action) => {
      state.waitingList = action.payload?.waitingList;
    },
  },
  extraReducers: {
    [getWaitingList.fulfilled]: (state, action) => {
      state.waitingList = action?.payload?.waitingList;
    },
  },
});

export const { filterPatientList, setPatients } = patientSlice.actions;
export const patientState = (state) => state.patients;
export default patientSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./layoutSlice";
import baseUrl from "./util";

export const admitPatient = createAsyncThunk(
  "/patients/admit",
  async (patient) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}patients/${patient.patient_id}/admit`,
        data
      );
      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const postPatient = createAsyncThunk(
  "/patients/postPatient",
  async (patient) => {
    try {
      const { data } = await axios.post(`${baseUrl}patients`, patient);
      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const dischargePatient = createAsyncThunk(
  "/patients/discharge",
  async (data) => {
    try {
      const { data } = await axios.post(
        `${baseUrl}patients/${data.patient_id}/discharge`,
        data
      );
      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const getPatients = createAsyncThunk(
  "/patients/getPatients",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { data } = await axios.get(`${baseUrl}/patients`);
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

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
    loading: false,
    error: null,
    patient: {},
    patients: [],
    waitingList: [],
  },
  reducers: {
    removePatient: (state, action) => {
      state.waitingList = state.waitingList.filter(
        (p) => p.patient_id !== action?.id
      );
    },
  },
  extraReducers: {
    // [postPatient.pending]: (state) => {
    //   state.loading = true;
    // },
    // [postPatient.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.waitingList = [...state.waitingList, action?.payload?.patient];
    // },
    // [postPatient.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action?.payload?.error;
    // },

    // [getPatients.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getPatients.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.patients = action?.payload?.patients;
    // },
    // [getPatients.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action?.payload?.error;
    // },

    [getWaitingList.fulfilled]: (state, action) => {
      state.waitingList = action?.payload?.waitingList;
    },

    // [getPatient.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getPatient.fulfilled]: (state, action) => {
    //   state.loading = false;

    //   state.patient = action?.payload?.patient;
    // },
    // [getPatient.rejected]: (state, action) => {
    //   state.loading = false;
    //   state.error = action?.payload?.error;
    // },
  },
});

export const { removePatient } = patientSlice.actions;
export const patientState = (state) => state.patients;
export default patientSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "./util";

export const admitPatient = createAsyncThunk(
  "/patients/admit",
  async (data) => {
    try {
      const res = await axios.post(
        `${baseUrl}patients/${data.patient_id}/admit`,
        data
      );
      return res.data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const createPatient = createAsyncThunk(
  "/patients/create",
  async (data) => {
    try {
      const res = await axios.post(`${baseUrl}patients`, data);
      return res.data;
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
      const res = await axios.post(
        `${baseUrl}patients/${data.patient_id}/discharge`,
        data
      );
      return res.data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const readPatient = createAsyncThunk("/patients/read", async (data) => {
  try {
    const res = await axios.post(`${baseUrl}patients/read`, data);
    return res.data;
  } catch (error) {
    return {
      error: error?.response?.data?.error,
    };
  }
});

export const getPatients = createAsyncThunk("getPatients", async () => {
  try {
    const res = await axios.get(`${baseUrl}patients`);
    return res.data;
  } catch (error) {
    return {
      error: error?.response?.data?.error,
    };
  }
});

export const getWaitingList = createAsyncThunk(
  "/patients/getWaitingList",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/patients/waiting`);
      return res.data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const patientSlice = createSlice({
  name: "patients",
  initialState: {
    loading: false,
    error: "",
    patient: {},
    patients: [],
    waitingPatients: [],
  },
  reducers: {
    assignPatientToRoom: (state, action) => {
      state.waitingPatients = state.waitingPatients.filter(
        (p) => p.patient_id !== action.id
      );
    },
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: {
    [createPatient.pending]: (state) => {
      state.loading = true;
    },
    [createPatient.fulfilled]: (state, action) => {
      state.loading = false;
      state.waitingPatients = [
        ...state.waitingPatients,
        action?.payload?.patient,
      ];
    },
    [createPatient.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },

    [getPatients.pending]: (state) => {
      state.loading = true;
    },
    [getPatients.fulfilled]: (state, action) => {
      state.loading = false;
      state.patients = action?.payload?.patients;
    },
    [getPatients.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },

    [getWaitingList.pending]: (state) => {
      state.loading = true;
    },
    [getWaitingList.fulfilled]: (state, action) => {
      state.loading = false;
      console.log("action?.payload :>> ", action?.payload);
      // state.waitingPatients = action?.payload?.rooms;
    },
    [getWaitingList.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },

    [readPatient.pending]: (state) => {
      state.loading = true;
    },
    [readPatient.fulfilled]: (state, action) => {
      state.loading = false;

      state.patient = action?.payload?.patient;
    },
    [readPatient.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },
  },
});

export const { clearError } = patientSlice.actions;
export const patientState = (state) => state.patients;
export default patientSlice.reducer;

import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { domain } from "../utils";

export const admitPatient = createAsyncThunk(
  "/api/patients/admit",
  async (data) => {
    try {
      const res = await axios.post(
        `${domain}/api/patients/${data.patient_id}/admit`,
        data
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error,
      };
    }
  }
);

export const createPatient = createAsyncThunk(
  "/api/patients/create",
  async (data) => {
    try {
      const res = await axios.post(`${domain}/api/patients`, data);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error,
      };
    }
  }
);

export const dischargePatient = createAsyncThunk(
  "/api/patients/discharge",
  async (data) => {
    try {
      const res = await axios.post(
        `${domain}/api/patients/${data.patient_id}/discharge`,
        data
      );
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error,
      };
    }
  }
);

export const readPatient = createAsyncThunk(
  "/api/patients/read",
  async (data) => {
    try {
      const res = await axios.post(`${domain}/api/patients/read`, data);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error,
      };
    }
  }
);

export const listPatients = createAsyncThunk("/api/patients/list", async () => {
  try {
    const res = await axios.get(`${domain}/api/patients`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});

export const listWaitingPatients = createAsyncThunk(
  "/api/patients/waiting",
  async () => {
    try {
      const res = await axios.get(`${domain}/api/patients/waiting`);
      return res.data;
    } catch (error) {
      return {
        error: error.response.data.error,
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
      const { error, patient } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.waitingPatients = [...state.waitingPatients, patient];
      }
    },
    [createPatient.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [listPatients.pending]: (state) => {
      state.loading = true;
    },
    [listPatients.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, patients } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.patients = patients;
      }
    },
    [listPatients.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [listWaitingPatients.pending]: (state) => {
      state.loading = true;
    },
    [listWaitingPatients.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, waitingPatients } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.waitingPatients = waitingPatients;
      }
    },
    [listWaitingPatients.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },

    [readPatient.pending]: (state) => {
      state.loading = true;
    },
    [readPatient.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, patient } = action.payload;
      if (error) {
        state.error = error;
      } else {
        state.patient = patient;
      }
    },
    [readPatient.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error;
    },
  },
});

export const { clearError } = patientSlice.actions;
export const patientState = (state) => state.patients;
export default patientSlice.reducer;

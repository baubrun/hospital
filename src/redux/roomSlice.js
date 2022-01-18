import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import baseUrl from "./util";

export const listRooms = createAsyncThunk("api/rooms/list", async () => {
  try {
    const res = await axios.get(`${baseUrl}/rooms`);
    return res.data;
  } catch (error) {
    return {
      error: error.response.data.error,
    };
  }
});

export const roomAdmission = createAsyncThunk(
  "api/rooms/room_id/admission",
  async (data) => {
    try {
      const res = await axios.post(
        `${baseUrl}/rooms/${data.room_number}/admission`,
        data
      );
      return res?.data;
    } catch (error) {
      return {
        error: error?.response?.data.error,
      };
    }
  }
);

export const roomDischarge = createAsyncThunk(
  "api/rooms/room_id/discharge",
  async (room_id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/rooms/${room_id}/discharge`,
        null
      );
      return res.data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    occupant_id: null,
    error: "",
    loading: false,
    rooms: [],
  },
  reducers: {},
  extraReducers: {
    [roomAdmission.pending]: (state) => {
      state.loading = true;
    },
    [roomAdmission.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, room } = action?.payload;
      if (error) {
        state.error = error;
      } else {
        const found = state?.rooms.findIndex(
          (r) => r?.room_number === room.room_number
        );
        const updatedRooms = _.cloneDeep(state?.rooms);
        updatedRooms[found] = room;
        state.rooms = updatedRooms;
      }
    },
    [roomAdmission.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },

    [roomDischarge.pending]: (state) => {
      state.loading = true;
    },
    [roomDischarge.fulfilled]: (state, action) => {
      state.loading = false;
      const { error } = action?.payload;
      if (error) {
        state.error = error;
      } else {
      }
    },
    [roomDischarge.rejected]: (state, action) => {
      state.loading = false;
      state.error = action?.payload?.error;
    },

    [listRooms.pending]: (state) => {
      state.loading = true;
    },
    [listRooms.fulfilled]: (state, action) => {
      state.loading = false;
      const { error, rooms } = action?.payload;
      if (error) {
        state.error = error;
      } else {
        state.rooms = rooms.sort((a, b) => {
          return a?.room_number - b?.room_number;
        });
      }
    },
    [listRooms.rejected]: (state, action) => {
      console.log("action :>> ", action);
      state.loading = false;
      state.error = action?.payload?.error;
    },
  },
});

export const roomState = (state) => state.rooms;
export default roomSlice.reducer;

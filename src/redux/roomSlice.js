import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import baseUrl from "./util";
import { hideLoader, showLoader } from "./layoutSlice";
import { setPatients } from "./patientSlice";

export const getRooms = createAsyncThunk(
  "api/getRooms",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { data } = await axios.get(`${baseUrl}/rooms`);
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

export const occupyRoom = createAsyncThunk(
  "api/rooms/occupy",
  async (roomData, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { data } = await axios.post(`${baseUrl}/rooms/occupy`, roomData);
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

export const vacateRoom = createAsyncThunk(
  "api/rooms/vacate",
  async (room_id) => {
    try {
      const { data } = await axios.post(`${baseUrl}/rooms/vacate`, {
        room_id,
      });
      return data;
    } catch (error) {
      return {
        error: error?.response?.data?.error,
      };
    }
  }
);

export const clearRooms = createAsyncThunk(
  "api/rooms/clear",
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(showLoader());
      const { data } = await axios.delete(`${baseUrl}/rooms/clear`);
      thunkApi.dispatch(setPatients({ waitingList: data?.patients }));
      return data;
    } catch (error) {
      thunkApi.dispatch(hideLoader());
      return thunkApi.rejectWithValue(error?.response?.data);
    } finally {
      thunkApi.dispatch(hideLoader());
    }
  }
);

export const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
  },
  reducers: {},
  extraReducers: {
    [occupyRoom.fulfilled]: (state, action) => {
      state.loading = false;
      const { room } = action?.payload;
      const found = state?.rooms.findIndex(
        (r) => r?.room_number === room.room_number
      );
      const updatedRooms = _.cloneDeep(state?.rooms);
      updatedRooms[found] = room;
      state.rooms = updatedRooms;
    },

    [clearRooms.fulfilled]: (state, action) => {
      state.rooms = action?.payload?.rooms;
    },

    [getRooms.fulfilled]: (state, action) => {
      state.rooms = action?.payload?.rooms?.sort((a, b) => {
        return a?.room_number - b?.room_number;
      });
    },
  },
});

export const roomState = (state) => state.rooms;
export default roomSlice.reducer;

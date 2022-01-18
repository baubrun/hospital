import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice"
import roomsReducer from "./roomSlice"
import patientReducer from "./patientSlice"

export default configureStore({
  reducer: {
    user: userReducer,
    rooms: roomsReducer,
    patients: patientReducer,
  },
});

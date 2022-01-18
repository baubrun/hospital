import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TitleBar from "../TitleBar/TitleBar";
import Patient from "./Patient";
import Rooms from "../../components/rooms/Rooms";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import {
  patientState,
  getWaitingList,
  removePatient,
} from "../../redux/patientSlice";
import { roomState, occupyRoom } from "../../redux/roomSlice";
import PatientList from "./PatientList";
import MaxHeap from "../../utils/heap/maxHeap";
import { showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const { rooms } = useSelector(roomState);
  const { waitingList } = useSelector(patientState);
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [viewOccupancy, setViewOccupancy] = useState(false);
  const [values, setValues] = useState({
    patient_id: null,
    roomAssigned: null,
  });

  const mh = new MaxHeap();

  const getNextPatient = () => {
    const nextPatient = mh.poll();
    setSelectedId(nextPatient?.patient_id);
    setValues((prev) => ({ ...prev, patient_id: nextPatient.patient_id }));
  };

  const fetchWaitingList = async () => {
    try {
      dispatch(getWaitingList());
    } catch (error) {
      dispatch(
        showToaster({
          message: error?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  const fetchRoomAdmission = async (data) => {};

  useEffect(() => {
    fetchWaitingList();
  }, []);

  useEffect(() => {
    setPatients(waitingList);
    mh.add(waitingList);
  }, [waitingList]);

  useEffect(() => {
    if (selectedId) {
      const found = patients.find((p) => p?.patient_id === selectedId);
      setSelectedPatient(found);
    }
  }, [selectedId]);

  const handleRoom = (evt) => {
    const { value } = evt.target;
    setValues({ ...values, roomAssigned: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const roomData = {
      room_number: values?.roomAssigned,
      occupant_id: values?.patient_id,
    };

    try {
      dispatch(occupyRoom(roomData));
      setSelectedId(null);
      dispatch(removePatient({ id: values?.patient_id }));
      setValues({ patient_id: null, roomAssigned: null });
    } catch (error) {
      dispatch(
        showToaster({
          message: error?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  return (
    <>
      <TitleBar text="waiting Room" />

      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {/* <Grid item>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={() => setViewOccupancy((prev) => !prev)}
              sx={{
                textTransform: "uppercase",
                margin: 2,
              }}
            >
              view rooms
            </Button>
          </Grid> */}

          <Grid item>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
              }}
            >
              admit patient:
            </Typography>
          </Grid>

          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 250 }}>
              <InputLabel id="select" sx={{ textTransform: "uppercase" }}>
                room #
              </InputLabel>
              <Select
                sx={{ minWidth: 250 }}
                labelId="select"
                id="select"
                value={values?.roomAssigned || ""}
                onChange={(evt) => handleRoom(evt)}
                label="Rooms"
              >
                {rooms
                  ?.filter((r) => r?.occupied === false)
                  .map((room, idx) => {
                    return (
                      <MenuItem key={idx} value={room?.room_number}>
                        {room?.room_number}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <Button
              sx={{ textTransform: "uppercase" }}
              color="primary"
              size="large"
              variant="contained"
              type="submit"
              disabled={!values?.patient_id || !values?.roomAssigned}
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid
        container
        direction="row"
        alignItems="center"
        sx={{ marginTop: 5 }}
        columnSpacing={4}
      >
        <Grid item sx={{ ml: 2 }}>
          <Typography
            color="secondary.main"
            variant="h5"
            sx={{
              textTransform: "uppercase",
              textAlign: "center",
              fontWeight: "bolder",
            }}
          >
            Patients
          </Typography>
          <PatientList patients={patients} selectedId={selectedId} />
        </Grid>

        <Grid
          container
          item
          direction="column"
          // justifyContent="center"
          // alignItems="center"
          xs={3}
        >
          <Grid item mb={2}>
            <Button
              sx={{ textTransform: "uppercase" }}
              color="primary"
              disabled={values?.patient_id}
              size="large"
              variant="contained"
              onClick={() => getNextPatient()}
            >
              Next Patient
            </Button>
          </Grid>

          <Grid item>
            <Patient patient={selectedPatient} selectedId={selectedId} />
          </Grid>
        </Grid>

        <Grid item xs={7}>
          <Rooms />
        </Grid>
      </Grid>

      {/* <Modal
        sx={{ width: "80%", margin: "auto" }}
        open={viewOccupancy}
        onClose={() => setViewOccupancy(false)}
      >
        <Rooms />
      </Modal> */}
    </>
  );
};

export default WaitingRoom;

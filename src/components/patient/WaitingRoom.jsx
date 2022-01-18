import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/styles";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TitleBar from "../TitleBar";
import Patient from "./Patient";
import Rooms from "../../components/rooms/Rooms";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import { patientState, listWaitingPatients } from "../../redux/patientSlice";
import { roomState, roomAdmission } from "../../redux/roomSlice";

import ListComponent from "../../components/ListComponent";
import MaxHeap from "../../utils/heap/maxHeap";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { rooms } = useSelector(roomState);
  const { waitingPatients } = useSelector(patientState);
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [viewOccupancy, setViewOccupancy] = useState(false);
  const [values, setValues] = useState({
    patient_id: null,
    roomAssigned: "",
  });

  const mh = new MaxHeap();

  const getNextPatient = () => {
    const nextPatient = mh.poll();
    setSelectedId(nextPatient.patient_id);
    setValues({ ...values, patient_id: nextPatient.patient_id });
  };

  // useEffect(() => {
  //   dispatch(listWaitingPatients());
  // }, []);

  useEffect(() => {
    setPatients(waitingPatients);
  }, [waitingPatients]);

  useEffect(() => {
    if (waitingPatients) {
      mh.add(waitingPatients);
    }
  });

  useEffect(() => {
    if (selectedId) {
      const found = patients.find((p) => p.patient_id === selectedId);
      setSelectedPatient(found);
    }
  }, [selectedId]);

  const handleRoom = (evt) => {
    const { value } = evt.target;
    setValues({ ...values, roomAssigned: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const data = {
      room_number: values.roomAssigned,
      occupied: true,
      occupant_id: values.patient_id,
    };
    dispatch(roomAdmission(data));
    setSelectedId(null);
    setValues({ patient_id: null, roomAssigned: "" });
    dispatch(listWaitingPatients());
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
          <Grid item>
            <Button
              color="secondary"
              size="large"
              variant="contained"
              onClick={() => setViewOccupancy(!viewOccupancy)}
              sx={{
                textTransform: "uppercase",
                margin: 2,
              }}
            >
              view Occupancies
            </Button>
          </Grid>

          <Grid item>
            <Typography
              variant="h5"
              sx={{
                textTransform: "uppercase",
              }}
            >
              assign patient to room:
            </Typography>
          </Grid>

          <Grid item>
            <FormControl variant="outlined" sx={{ minWidth: 250 }}>
              <InputLabel id="select" sx={{ textTransform: "uppercase" }}>
                room
              </InputLabel>
              <Select
                sx={{ minWidth: 250 }}
                labelId="select"
                id="select"
                value={values.roomAssigned}
                onChange={(evt) => handleRoom(evt)}
                label="Rooms"
              >
                {rooms
                  .filter((r) => r.occupied === false)
                  .map((room, idx) => {
                    return (
                      <MenuItem key={idx} value={room.room_number}>
                        {room.room_number}
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
              disabled={!values.patient_id || !values.roomAssigned}
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>

        <Paper
          sx={{
            backgroundColor: theme.palette.background.paper,
            elevation: 15,
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={2}>
              <ListComponent patients={patients} selectedId={selectedId} />
            </Grid>

            <Grid item xs={10}>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <Button
                    sx={{ textTransform: "uppercase", margin: 2 }}
                    color="primary"
                    disabled={values.patient_id}
                    size="large"
                    variant="contained"
                    onClick={() => getNextPatient()}
                  >
                    Next Patient
                  </Button>
                </Grid>

                {/* <Patient patient={selectedPatient} selectedId={selectedId} /> */}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </form>

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

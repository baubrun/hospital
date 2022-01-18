import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Patient from "./Patient";
import Rooms from "../../components/rooms/Rooms";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import {
  patientState,
  getWaitingList,
  filterPatientList,
} from "../../redux/patientSlice";
import { roomState, occupyRoom, clearRooms } from "../../redux/roomSlice";
import PatientList from "./PatientList";
import MaxHeap from "../../utils/heap/maxHeap";
import { showToaster } from "../../redux/layoutSlice";
import { STATUS_ERROR } from "../../shared/constants/status";

const defaultValues = {
  patient_id: null,
  roomAssigned: null,
};

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { rooms } = useSelector(roomState);
  const { waitingList } = useSelector(patientState);
  const [patients, setPatients] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [values, setValues] = useState(defaultValues);
  const [vacancies, setVacancies] = useState(true);

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

  useEffect(() => {
    fetchWaitingList();
  }, []);

  const mh = new MaxHeap();

  const handleSelectedPatient = (id) => {
    if (id) {
      const found = patients.find((p) => p?._id === id);
      if (found) setSelectedPatient(found);
    }
  };

  const isVacancy = () => {
    const r = rooms.filter((r) => r?.occupant_id);
    const result = r?.length < 10;
    setVacancies(result);
  };

  const isOccupied = () => {
    const r = rooms.filter((r) => r?.occupant_id);
    return r?.length > 0;
  };

  const getNextPatient = () => {
    const nextPatient = mh.poll();
    setSelectedId(nextPatient?._id);
    handleSelectedPatient(nextPatient?._id);
    setValues((prev) => ({ ...prev, patient_id: nextPatient?._id }));
  };

  useEffect(() => {
    setPatients(waitingList);
  }, [waitingList]);

  useEffect(() => {
    if (waitingList) {
      mh.add(waitingList);
    }
  });

  const handleRoom = (evt) => {
    const { value } = evt.target;
    setValues({ ...values, roomAssigned: value });
  };

  const fetchClearRooms = () => {
    try {
      dispatch(clearRooms());
    } catch (error) {
      dispatch(
        showToaster({
          message: error?.message,
          status: STATUS_ERROR,
        })
      );
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const roomData = {
      room_number: values?.roomAssigned,
      occupant_id: values?.patient_id,
    };

    try {
      dispatch(occupyRoom(roomData));
      dispatch(filterPatientList({ id: roomData.occupant_id }));
      setSelectedId(null);
      setSelectedPatient({});
      setValues(defaultValues);
      isVacancy();
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
      <form onSubmit={handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          mt={5}
          columnSpacing={3}
        >
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
                room #
              </InputLabel>
              <Select
                sx={{ minWidth: 250 }}
                labelId="select"
                id="select"
                value={values?.roomAssigned || ""}
                onChange={(evt) => handleRoom(evt)}
                label="Rooms"
                disabled={!selectedPatient?._id}
              >
                {rooms
                  ?.filter((r) => !r?.occupant_id)
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
              color="secondary"
              size="large"
              variant="contained"
              type="submit"
              disabled={
                !values?.patient_id || !values?.roomAssigned || !vacancies
              }
            >
              assign
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
            {`patients (${patients?.length})`}
          </Typography>
          <PatientList waitingList={waitingList} selectedId={selectedId} />
        </Grid>

        <Grid container item direction="column" xs={3}>
          <Grid item mb={2}>
            <Button
              sx={{ textTransform: "uppercase", marginLeft: "30%" }}
              color="primary"
              disabled={Boolean(values?.patient_id) || !vacancies}
              size="large"
              variant="contained"
              onClick={() => getNextPatient()}
            >
              Next Patient
            </Button>
          </Grid>

          {selectedPatient?._id && (
            <Grid item>
              <Patient
                selectedPatient={selectedPatient}
                selectedId={selectedId}
              />
            </Grid>
          )}
        </Grid>

        <Grid item xs={7}>
          <Rooms />
        </Grid>
      </Grid>

      {isOccupied() && (
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <Button
              sx={{
                textTransform: "uppercase",
                backgroundColor: theme.palette.secondary.light,
              }}
              size="large"
              variant="contained"
              onClick={() => fetchClearRooms()}
            >
              CLEAR ROOMS
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default WaitingRoom;

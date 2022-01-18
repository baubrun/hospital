import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import TitleBar from "../TitleBar/TitleBar";

import {
  readPatient,
  patientState,
  dischargePatient,
} from "../../redux/patientSlice";
import { roomDischarge } from "../../redux/roomSlice";

import moment from "moment";

import MessageDialog from "../MessageDialog";

const defaultState = {
  care_level: "",
  full_name: "",
  first_name: "",
  last_name: "",
  medicalHistory: [],
  patient_id: null,
  room_number: "",
  message: "",
};

const SearchPatient = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { patient } = useSelector(patientState);
  const [values, setValues] = useState(defaultState);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [dischargeDate, setDischargeDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const textLabel = {
    color: theme.palette.secondary.main,
    fontSize: 20,
    fontWeight: "bolder",
    textAlign: "center",
    textTransform: "uppercase",
  };

  const textStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: 300,
    margin: theme.spacing(2),
    padding: "32px 0px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "uppercase",
  };

  useEffect(() => {
    if (patient) {
      setValues(patient);
      setAdmissionDate(patient.admission);
      if (patient.discharge) {
        setDischargeDate(patient.discharge);
      }
    }
  }, [patient]);

  const handleConfirm = () => {
    dispatch(roomDischarge(values.room_number));
    dispatch(
      dischargePatient({
        dischargeDate: moment().format("L"),
        occupant_id: values.patient_id,
      })
    );
    setValues(defaultState);
    setAdmissionDate(null);
    setDischargeDate(null);
    setOpenDialog(false);
  };

  const handleSearch = (evt) => {
    evt.preventDefault();
    if (!values.full_name) return;
    const [last_name, first_name] = values.full_name.split(",");
    dispatch(
      readPatient({
        last_name: last_name.trim(),
        first_name: first_name.trim(),
      })
    );
  };

  const handleChange = (evt) => {
    const { value } = evt.target;
    setValues({ ...values, full_name: value });
  };

  const handleDischarge = (evt) => {
    evt.preventDefault();
    dispatch(roomDischarge(values.room_number));
    dispatch(
      dischargePatient({
        dischargeDate: moment().format("L"),
        occupant_id: values.patient_id,
      })
    );
  };

  if (values)
    return (
      <>
        <Box
          sx={{
            backgroundColor: "rgba(197, 17, 98,0.3)",
            height: "100vh",
          }}
        >
          <TitleBar text="search patient" />
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item>
              <Paper
                sx={{
                  padding: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                  backgroundColor: "rgb(178, 86, 194, 0.7)",
                  margin: theme.spacing(4),
                }}
                component="form"
                onSubmit={handleSearch}
              >
                <Icon>
                  <SearchIcon sx={{ color: "#fff", fontSize: 24 }} />
                </Icon>
                <Divider
                  sx={{
                    height: 28,
                    margin: 4,
                    color: "#fff",
                  }}
                  orientation="vertical"
                />
                <InputBase
                  sx={{
                    marginLeft: 1,
                    flex: 1,
                    color: "#fff",
                    padding: 1,
                    fontSize: "24px",
                  }}
                  placeholder="Last Name, First Name"
                  value={values.full_name || ""}
                  onChange={(evt) => handleChange(evt)}
                  endAdornment={
                    <IconButton
                      sx={{
                        color: theme.palette.secondary.main,
                      }}
                      type="submit"
                    >
                      <SendIcon />
                    </IconButton>
                  }
                />
              </Paper>
            </Grid>
          </Grid>
          {admissionDate && (
            <Paper elevation={11} sx={{ margin: 4 }}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={textLabel}>First Name</Typography>
                  <Typography sx={textStyle}>{values.first_name}</Typography>
                </Grid>

                <Grid item>
                  <Typography sx={textLabel}>Last Name</Typography>

                  <Typography sx={textStyle}>{values.last_name}</Typography>
                </Grid>

                {values.room_number && (
                  <Grid item>
                    <Typography sx={textLabel}>Room Number</Typography>
                    <Typography sx={textStyle}>{values.room_number}</Typography>
                  </Grid>
                )}
              </Grid>

              <Grid
                container
                direction="row"
                justify="space-evenly"
                alignItems="center"
              >
                <Grid item>
                  <Typography sx={textLabel}>Admission Date</Typography>
                  <Typography sx={textStyle}>
                    {moment(admissionDate).format("L")}
                  </Typography>
                </Grid>

                {dischargeDate && (
                  <Grid item>
                    <Typography sx={textLabel}>Discharge Date</Typography>
                    <Typography sx={textStyle}>
                      {moment(dischargeDate).format("L")}
                    </Typography>
                  </Grid>
                )}

                {values.room_number && (
                  <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="center"
                  >
                    <Grid items rowSpacing={2}>
                      <Button
                        sx={{
                          fontWeight: "bold",
                          padding: theme.spacing(2),
                          fontSize: 16,
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={() => setOpenDialog(true)}
                      >
                        DISCHARGE
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Paper>
          )}
        </Box>

        <MessageDialog
          cancelBtn={true}
          confirm={handleConfirm}
          openDialog={openDialog}
          message="Discharge this patient?"
          setOpenDialog={setOpenDialog}
          title="Discharge"
        />
      </>
    );
};

export default SearchPatient;

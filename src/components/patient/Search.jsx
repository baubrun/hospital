import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import TitleBar from "../TitleBar";

import { makeStyles } from "@material-ui/core/styles";

import {
  readPatient,
  patientState,
  dischargePatient,
} from "../../redux/patientSlice";
import { roomDischarge } from "../../redux/roomSlice";

import moment from "moment";

import MessageDialog from "../MessageDialog"

const useStyles = makeStyles((theme) => ({
  date: {
    fontWeight: "bold",
    padding: "32px",
    textAlign: "center",
  },
  discharge: {
    fontWeight: "bold",
    padding: theme.spacing(2),
    fontSize: 16,
  },
  divider: {
    height: 28,
    margin: 4,
    color: "#fff",
  },
  gridRow: {
    margin: theme.spacing(2),
  },
  icon: {
    color: "#fff",
    fontSize: 24,
  },
  iconButton: {
    padding: 10,
    color: "#fff",
  },
  patientInfo: {
    elevation: 11,
    margin: theme.spacing(4),
  },
  search: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
    backgroundColor: "rgb(178, 86, 194, 0.7)",
    margin: theme.spacing(4),
  },
  root: {
    backgroundColor: "rgba(197, 17, 98,0.3)",
    height: "100vh",
  },
  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#fff",
    padding: theme.spacing(1),
    fontSize: "24px",
  },
  send: {
    color: theme.palette.secondary.main,
  },
  text: {
    fontSize: "16px",
    fontWeight: "bold",
    minWidth: 300,
    margin: theme.spacing(2),
    padding: "32px 0px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: 5,
    textAlign: "center",
    textTransform: "uppercase",
  },
  textLabel: {
    color: theme.palette.secondary.main,
    fontSize: 20,
    fontWeight: "bolder",
    textAlign: "center",
    textTransform: "uppercase",
  },
}));

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
  const classes = useStyles();
  const dispatch = useDispatch();
  const { patient } = useSelector(patientState);
  const [values, setValues] = useState(defaultState);
  const [admissionDate, setAdmissionDate] = useState(null);
  const [dischargeDate, setDischargeDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
    setValues(defaultState)
    setAdmissionDate(null)
    setDischargeDate(null)
    setOpenDialog(false)
  }


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
      <Box className={classes.root}>
        <TitleBar text="search patient" />
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item>
            <Paper
              className={classes.search}
              component="form"
              onSubmit={handleSearch}
            >
              <Icon className={classes.icon}>
                <SearchIcon className={classes.icon} />
              </Icon>
              <Divider className={classes.divider} orientation="vertical" />
              <InputBase
                className={classes.searchInput}
                placeholder="Last Name, First Name"
                value={values.full_name || ""}
                onChange={(evt) => handleChange(evt)}
                endAdornment={
                  <IconButton className={classes.send} type="submit">
                    <SendIcon />
                  </IconButton>
                }
              />
            </Paper>
          </Grid>
        </Grid>
        {admissionDate && (
          <Paper
            className={classes.patientInfo}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <Box className={classes.textLabel}>First Name</Box>
                <Box className={classes.text}>{values.first_name}</Box>
              </Grid>

              <Grid item>
                <Box className={classes.textLabel}>Last Name</Box>

                <Box className={classes.text}>{values.last_name}</Box>
              </Grid>

              {values.room_number && (
                <Grid item>
                  <Box className={classes.textLabel}>Room Number</Box>
                  <Box className={classes.text}>{values.room_number}</Box>
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
                <Box className={classes.textLabel}>Admission Date</Box>
                <Box className={classes.text}>
                  {moment(admissionDate).format("L")}
                </Box>
              </Grid>

              {dischargeDate && (
                <Grid item>
                  <Box className={classes.textLabel}>Discharge Date</Box>
                  <Box className={classes.text}>
                    {moment(dischargeDate).format("L")}
                  </Box>
                </Grid>
              )}

              {values.room_number && (
                <Grid
                  container
                  direction="row"
                  justify="space-evenly"
                  alignItems="center"
                >
                  <Grid items className={classes.gridRow}>
                    <Button
                      className={classes.discharge}
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

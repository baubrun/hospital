import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { patientState, } from "../redux/patientSlice";


const useStyles = makeStyles((theme) => ({
  list: {
    border: `2px solid ${theme.palette.secondary.main}`,
    width: 240,
    overflow: "auto",
  },
  empty: {
    margin: theme.spacing(3),
    textTransform: "uppercase",
  },
}));

const ListComponent = (props) => {
  const classes = useStyles();
  const [patients, setPatients] = useState([]);
  const { waitingPatients } = useSelector(patientState);


  useEffect(() => {
    setPatients(waitingPatients);
  }, [props.selectedId, waitingPatients]);

  if (patients.length < 1) {
    return (
      <Box className={classes.empty}>
        <Typography variant="h5">No patients</Typography>
      </Box>
    );
  }

  return (
    <List className={classes.list}>
      {patients.map((i, idx) => (
        <ListItem button key={idx} selected={i.patient_id === props.selectedId}>
          <ListItemText primary={`${i.first_name} ${i.last_name}`} />
        </ListItem>
      ))}
    </List>
  );
};

export default ListComponent;

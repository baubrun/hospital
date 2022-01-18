import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  paper: {
    elevation: 15,
  },
  roomSelect: {
    minWidth: 250,
  },
  gridRow: {
    margin: "48px 0px",
  },
  card: {
    width: "60%",
    margin: "auto",
  },
}));

const defaultState = {
  first_name: "",
  last_name: "",
  care_level: null,
  waitingRoom: false,
};

const Patient = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState(defaultState);

  useEffect(() => {
    setValues({
      ...props.patient,
    });
  }, [props.patient]);

  useEffect(() => {
    if (!props.selectedId) {
      setValues(defaultState);
    }
  }, [props.selectedId]);

  return (
    <Card raised className={classes.card}>
      <CardContent>
        <Grid
          className={classes.gridRow}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography
              variant="h5"
              color="primary"
            >
              Patient
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{values.first_name}</Typography>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">{values.last_name}</Typography>
          </Grid>
        </Grid>

        <Grid
          className={classes.gridRow}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Typography
              variant="h5"
              color="primary"
            >
              Care Level
            </Typography>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="h5">{values.care_level}</Typography>
          </Grid>
        </Grid>

    
      </CardContent>
    </Card>
  );
};

export default Patient;

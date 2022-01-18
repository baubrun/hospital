import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const defaultState = {
  first_name: "",
  last_name: "",
  care_level: null,
  waitingRoom: false,
};

const Patient = (props) => {
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
    <Card
      raised
      sx={{
        width: "60%",
        margin: "auto",
      }}
    >
      <CardContent>
        <Grid
          sx={{ marginY: 6 }}
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item xs={2}>
            <Typography variant="h5" color="primary">
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
          sx={{ marginY: 6 }}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item xs={3}>
            <Typography variant="h5" color="primary">
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

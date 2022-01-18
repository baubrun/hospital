import React, { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Patient = (props) => {
  const { selectedPatient, selectedId } = props;
  const [patient, setPatient] = useState({});

  useEffect(() => {
    setPatient(selectedPatient);
  }, [selectedPatient]);

  useEffect(() => {
    if (!selectedId) setPatient({});
  }, [selectedId]);

  return (
    <Card raised elevation={10}>
      <CardContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{}}
        >
          <Grid item>
            <Typography
              variant="h6"
              color="primary"
              sx={{ textTransform: "uppercase", marginY: 2 }}
            >
              Patient
            </Typography>
          </Grid>

          <Grid item>
            <Typography variant="h5">{`${patient?.first_name || ""} ${
              patient?.last_name || ""
            }`}</Typography>
          </Grid>

          <Grid item>
            <Typography
              variant="h6"
              color="primary"
              sx={{ textTransform: "uppercase", marginY: 2 }}
            >
              Care Level
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5">{patient?.care_level}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Patient;

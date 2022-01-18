import React from "react";
import { Button } from "@material-ui/core";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import { ButtonStyles } from "../../../css/theme";
import Paper from "@material-ui/core/Paper";

import {medicalConditions} from "../../../utils"


const labelPlacement = "end";


const useStyles = makeStyles((theme) => ({
  paper:{
    padding: theme.spacing(4)
  }
}));



const MedicalHistory = (props) => {
  const classes = useStyles()
  return (
    <>

      <Grid container direction="column" justify="center" alignItems="center">
          <Paper className={classes.paper}>
            {medicalConditions.map((condition, idx) => {
              return (
                <Grid item key={idx}>
                <FormControl component="fieldset" key={idx}>
                  <FormGroup aria-label="position" row>
                    <FormControlLabel
                      value={condition}
                      control={
                        <Checkbox
                          color="primary"
                          onChange={(evt) => props.handleCheckbox(evt)}
                          name={condition}
                        />
                      }
                      label={condition}
                      labelPlacement={labelPlacement}
                    />
                  </FormGroup>
                </FormControl>
                </Grid>
              );
            })}

            <Button
              color="secondary"
              variant="contained"
              onClick={props.prevStep}
              style={ButtonStyles.button}
            >
              Back
            </Button>

            <Button
              color="primary"
              variant="contained"
              onClick={() => props.nextStep()}
              style={ButtonStyles.button}
            >
              Continue
            </Button>
            </Paper>
        </Grid>
    </>
  );
};

export default MedicalHistory;

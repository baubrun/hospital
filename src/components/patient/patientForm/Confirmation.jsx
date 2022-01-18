import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonStyles } from "../../../css/theme";

const useStyles = makeStyles((theme) => ({
  paper: {
    elevation: 15,
    padding: theme.spacing(3),
  },
  input: {
    minWidth: 250,
  },
}));

const Confirmation = (props) => {
  const classes = useStyles();

  const {
    values: { firstName, lastName, email, careLevel },
  } = props;

  return (
    <Paper className={classes.paper}>
      <List>
        <ListItem>
          <ListItemText primary="First Name" secondary={firstName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Last Name" secondary={lastName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          <TextField
            name="careLevel"
            onChange={(evt) => props.handleChange(evt)}
            placeholder="Care Level"
            required
            type="number"
            value={careLevel}
            InputProps={{
              inputProps: {
                max: 5,
                min: 1,
                className: classes.input,
              },
            }}
          />
        </ListItem>
      </List>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => props.prevStep()}
        style={ButtonStyles.button}
      >
        Back
      </Button>

      <Button
        color="primary"
        variant="contained"
        style={ButtonStyles.button}
        type="submit"
      >
        Confirm & Continue
      </Button>
    </Paper>
  );
};

export default Confirmation;

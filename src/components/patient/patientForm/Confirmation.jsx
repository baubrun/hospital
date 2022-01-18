import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";

const Confirmation = (props) => {
  const {
    values: { firstName, lastName, email, careLevel },
  } = props;

  return (
    <Paper elevation={15}>
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
              },
            }}
            sx={{ width: 240 }}
          />
        </ListItem>
      </List>
      <Button
        color="secondary"
        variant="contained"
        onClick={() => props.prevStep()}
        sx={{ padding: 1 }}
      >
        Back
      </Button>

      <Button
        color="primary"
        variant="contained"
        sx={{ padding: 1 }}
        type="submit"
      >
        Confirm & Continue
      </Button>
    </Paper>
  );
};

export default Confirmation;

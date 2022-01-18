import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContentText from '@material-ui/core/DialogContentText'

const MessageDialog = (props) => {
 
  return (
    <Dialog open={props.openDialog} onClose={() => props.setOpenDialog(false)}>
    <DialogTitle>{props.title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {props.message}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      {props.cancelBtn &&
      <Button onClick={() => props.setOpenDialog(false)} color="primary">
        Cancel
      </Button>
      }
      <Button onClick={() => props.confirm()} color="secondary" autoFocus="autoFocus">
        OK
      </Button>
    </DialogActions>
  </Dialog>
);
};

export default MessageDialog;

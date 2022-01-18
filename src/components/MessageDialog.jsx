import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

const MessageDialog = (props) => {
  return (
    <Dialog open={props.openDialog} onClose={() => props.setOpenDialog(false)}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.cancelBtn && (
          <Button onClick={() => props.setOpenDialog(false)} color="primary">
            Cancel
          </Button>
        )}
        <Button
          onClick={() => props.confirm()}
          color="secondary"
          autoFocus="autoFocus"
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;

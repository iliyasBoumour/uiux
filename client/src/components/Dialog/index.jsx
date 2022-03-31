import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const index = ({ text, handler, handleClose }) => {
  return (
    <Dialog
      open={true}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{text}</DialogTitle>
      <DialogActions>
        <Button variant="warning" onClick={handleClose}>
          Disagree
        </Button>
        <Button variant="secondary" onClick={handler}>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default index;

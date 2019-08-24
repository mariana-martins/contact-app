import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

export default function DeleteDialog({ name, onConfirm }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e) => {
    setOpen(true);
    e.stopPropagation();
  };

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        ❎
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete {name}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            You are going to delete {name} from your contact list. Are you sure you want to do it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Yes, delete it!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

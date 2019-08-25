import React from 'react';
import { Button, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

const useStyles = makeStyles({
  button:{
    '&:hover': {
      backgroundColor: indigo[100],
    },
  }
});

export default function DeleteDialog({ name, onConfirm }) {
  const classes = useStyles();
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
      <IconButton onClick={handleClickOpen} className={classes.button}>
        <DeleteForeverIcon />
      </IconButton>
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

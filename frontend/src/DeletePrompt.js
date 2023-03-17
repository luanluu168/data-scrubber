import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeletePrompt({deletePrompt, setDeletePrompt, deleteRow, value}) {
  const handleClickOpen = () => {
    setDeletePrompt(true);
  };

  const handleClose = () => {
    setDeletePrompt(false);
  };

  const handleDelRow = () => {
    deleteRow(value);
    setDeletePrompt(false);
  }

  return (
    <div>
        <DeleteIcon fontSize="inherit" onClick={handleClickOpen} size="small" sx={{ color: 'gray' }}/>
        <Dialog
            open={deletePrompt}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle><DeleteIcon/></DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Would you like to delete this row?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={handleDelRow}>Yes</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UpdateUsers from './UpdateUsers';

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UpdateUserModal({message, setMessage, setRows, curElementId}) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <ModeEditOutlineIcon onClick={handleOpen} size="small" sx={{ color: 'gray' }}/>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update An User
          </Typography>
          <UpdateUsers setOpenModal={setOpenModal} message={message} setMessage={setMessage} curElementId={curElementId}/>
        </Box>
      </Modal>
    </div>
  );
}
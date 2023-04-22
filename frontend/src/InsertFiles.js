import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function InsertFiles({setOpenModal, message, setMessage}) {
  function addUsers() {
    
  }

  return (
    <Button
    variant="contained"
    component="label"
    sx={{ textTransform: 'capitalize' }} 
    endIcon={<CloudUploadIcon/>}
    >
    Upload File
    <input
        type="file"
        hidden
    />
    </Button>
  );
}
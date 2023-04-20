import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

export default function InsertFiles({setOpenModal, message, setMessage}) {
  function addUsers() {
    
  }

  return (
    <Button
    variant="contained"
    component="label"
    >
    Upload File
    <input
        type="file"
        hidden
    />
    </Button>
  );
}
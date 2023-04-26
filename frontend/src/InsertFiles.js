import * as React from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function InsertFiles() {
  async function sendFile(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const {data} = await axios.post('/api/sendFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(data)
    } catch (error) {
      console.error(error);
    }
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
        onChange={(event)=> { 
          sendFile(event.target.files[0])
        }}
    />
    </Button>
  );
}
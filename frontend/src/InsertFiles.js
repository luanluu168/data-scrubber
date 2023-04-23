import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function InsertFiles() {
  const [file, setFile] = useState("");

  async function sendFile() {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const {data} = await axios.post('/api/sendFile', {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data: formData
      })
      console.log(data);
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
          setFile(event.target.files[0]) 
          sendFile()
        }}
    />
    </Button>
  );
}
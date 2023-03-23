import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from 'axios';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export default function DownloadCSV() {
    async function download() {
        await axios({
            url: '/api/getCSV',
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'result.csv');
            document.body.appendChild(link);
            link.click();
        });
    }

    return (
        <Stack spacing={2} direction="row">
            <Button 
                variant="contained" 
                endIcon={<CloudDownloadIcon />}
                sx={{  m: '0.6rem', textTransform: 'capitalize' }}
                onClick={() => {
                    download();
                }}
                >
                Download CSV 
            </Button>
        </Stack>
    );
}
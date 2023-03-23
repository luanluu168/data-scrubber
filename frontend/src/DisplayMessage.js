import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import BasicTable from './BasicTable';
import InsertUserModal from './InsertUserModal';
import { useState } from 'react';
import DownloadCSV from './DownloadCSV';

function DisplayMessage({message, setMessage}) {
  const [rows, setRows] = useState(0);

  function navBar() {
    return (
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Data Scrubber
          </Typography>
          <DownloadCSV />
          <InsertUserModal message={message} setMessage={setMessage} setRows={setRows}/>
        </Toolbar>
      </AppBar>
    );
  }

  function body() {
    return (
      <Container disableGutters maxWidth="md" component="main" sx={{ pt: 8, pb: 6 }}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Open Avenue Internship - Data Scrubber Application for Protected Health Information
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
          Project Leader: Rishabh Gupta
        </Typography>
        
        <BasicTable message={message} setMessage={setMessage} rows={rows} setRows={setRows}/>
        <Typography>
  
        </Typography>
      </Container>
    );
  }

  function footer() {
    return (
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
    );
  }

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        { 'Copyright © Luan Luu ' + new Date().getFullYear() + '.' }
      </Typography>
    );
  }

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      { navBar() }
      
      { body() }

      { footer() }
    </React.Fragment>
  );
}

export default DisplayMessage;
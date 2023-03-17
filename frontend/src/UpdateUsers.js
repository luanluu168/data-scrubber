import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateUsers({setOpenModal, message, setMessage, curElementId}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isDobError, setIsDobError] = useState(false);
  
  useEffect(() => {
    function getUser() {
        const target = message.find(e => e[0] === curElementId);
        setFirstName(target[1]);
        setLastName(target[2]);
        setDob(formatDate(target[3]));
        setEmail(target[4]);
    }
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    month = (month.length === 1) ? '0' + month : month;
    day = (day.length === 1) ? '0' + day : day;

    return [year, month, day].join('-');
  }

  function calculateAge() {
    const YEAR_LEN = 4;
    const curYear = dob.slice(0, YEAR_LEN);
    const userAge = new Date().getFullYear() - parseInt(curYear);
    return userAge;
  }

  async function updateUser() {
    try {
      if(!inputIsValid()) {
        return;
      }

      const {data} = await axios.post('/api/updateUser', {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        age: calculateAge(),
        uniqueId: curElementId
      });

      if(data !== 'null') {
        setOpenModal(false);
        function flat(a) {
          return a.reduce((l, r) => l.concat(Array.isArray(r) ? flat(r) : r), []); 
        }
        const newMessage = message.map(m => m[0] === curElementId ? flat(data) : m);
        setMessage(newMessage);
      } else {
        setOpenModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function inputIsValid() {
    validateInput();
    return (!isFirstNameError && !isLastNameError && !isEmailError && !isDobError);
  }

  function validateInput() {
    firstName.length === 0 ? setIsFirstNameError(true) : setIsFirstNameError(false);
    lastName.length === 0 ? setIsLastNameError(true) : setIsLastNameError(false);
    email.length === 0 ? setIsEmailError(true) : setIsEmailError(false);
    dob.length === 0 ? setIsDobError(true) : setIsDobError(false);
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <div>
          <TextField
            required
            id="first-name"
            label="First Name"
            error= {isFirstNameError}
            value={firstName}
            onChange={(event) => {setFirstName(event.target.value)}}
          />
        </div>
        <div>
          <TextField
            required
            id="last-name"
            label="Last Name"
            error= {isLastNameError}
            value={lastName}
            onChange={(event) => {setLastName(event.target.value)}}
          />
        </div>
        <div>
          <TextField
            required
            id="dob"
            type="date"
            label="Date of Birth"
            error= {isDobError}
            value={dob}
            onChange={(event) => {setDob(event.target.value)}}
          />
        </div>
        <div>
          <TextField
            required
            id="email"
            type="email"
            label="Email"
            error= {isEmailError}
            pattern="^.+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$" size="30"
            placeholder="default@example.com"
            value={email}
            onChange={(event) => {setEmail(event.target.value)}}
          />
        </div>
        <Stack spacing={2} direction="row">
          <Button 
            variant="contained" 
            sx={{ m: '0.6rem' }}
            onClick={() => {
              updateUser();
            }}
          >
            Update
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
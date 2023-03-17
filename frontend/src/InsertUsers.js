import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { FormControl } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useState } from 'react';
import axios from 'axios';

export default function InsertUsers({setOpenModal, message, setMessage}) {
  const DEFAULT_DOB = '1992-02-02';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState(DEFAULT_DOB);
  const [email, setEmail] = useState('');
  const [isFirstNameError, setIsFirstNameError] = useState(false);
  const [isLastNameError, setIsLastNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isDobError, setIsDobError] = useState(false);

  function calculateAge() {
    const YEAR_LEN = 4;
    const curYear = dob.slice(0, YEAR_LEN);
    const userAge = new Date().getFullYear() - parseInt(curYear);
    return userAge;
  }

  async function addUsers() {
    try {
      if(!inputIsValid()) {
        return;
      }

      const {data} = await axios.post('/api/addUsers', {
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        email: email,
        age: calculateAge()
      });

      if(data !== 'null') {
        setOpenModal(false);
        function flat(a) {
          return a.reduce((l, r) => l.concat(Array.isArray(r) ? flat(r) : r), []); 
        }
        const newMessage = [...message, flat(data)];
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
            endIcon={<PersonAddAlt1Icon />}
            sx={{ m: '0.6rem' }}
            onClick={() => {
              addUsers();
            }}
          >
            Add Users
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
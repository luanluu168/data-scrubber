import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import UpdateUserModal from './UpdateUserModal';
import DeletePrompt from './DeletePrompt';

export default function BasicTable({message, setMessage, rows, setRows}) {
    const [deletePrompt, setDeletePrompt] = React.useState(false);
    const TABLE_MIN_WIDTH = 450;

    function getCols(element) {
        return element.map((e, i) => {
            if(i === 0) {
                return (<TableCell key={i} component="th" scope="row">{e}</TableCell>)
            } else if (i === 3) {
                return (<TableCell key={i} component="th" scope="row">{e.slice(5, 17)}</TableCell>)
            }

            return (<TableCell key={i} component="th" align="center">{e}</TableCell>)
        });
    }

    async function deleteRow(value) {
        if(!deletePrompt) {
            return;
        }

        const {data} = await axios.post('/api/deleteUser', {
            unique_id: value
        });
        const newMessage = message.filter(e => e[0] !== value);
        setMessage(newMessage);
        return data;
    }

    function createTableBody(rows) {
        return (
            <TableBody>
                {
                    rows.map(({element, i}) => (
                        <TableRow
                            key={ element[0] }
                            sx={{ border: 1 }}
                        >
                            { getCols(element) }

                            <TableCell key={i} component="th" scope="row">
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <IconButton aria-label="delete" size="small" >
                                        <DeletePrompt deletePrompt={deletePrompt} setDeletePrompt={setDeletePrompt} deleteRow={deleteRow} value={element[0]}/>
                                    </IconButton>
                                    <IconButton aria-label="update" size="small">
                                        <UpdateUserModal message={message} setMessage={setMessage} curElementId={element[0]}/>
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        );
    }

    useEffect(() => {
        const getRows = () => {
            let cr = [];
            message.forEach(element => {
                cr.push({element});
            });
            setRows(cr); 
        }
        getRows();
    }, [message, setRows]);

  return (
    rows && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: TABLE_MIN_WIDTH }} aria-label="simple table">
        <TableHead sx={{ border: 1.5 }}>
            <TableRow sx={{ bgcolor: 'text.disabled' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Id</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }} width={120}>First Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }} width={120}>Last Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }} width={120}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Edit</TableCell>
            </TableRow>
        </TableHead>
        {createTableBody(rows)}
      </Table>
    </TableContainer>
  );
}
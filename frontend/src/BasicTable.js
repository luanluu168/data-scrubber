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
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

export default function BasicTable({message, rows, setRows}) {
    const TABLE_MIN_WIDTH = 450;

    function getCols(element) {
        return element.map((e, i) => {
            if(i === 0) {
                return (<TableCell key={i} component="th" scope="row">{e}</TableCell>)
            } else if (i === 3) {
                return (<TableCell key={i} component="th" scope="row">{e.slice(5, 17)}</TableCell>)
            } else if (i === 6) {
                return (<TableCell key={i} component="th" scope="row">
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <IconButton aria-label="delete" size="small">
                                    <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </Stack>
                        </TableCell>);
            }

            return (<TableCell key={i} component="th" align="center">{e}</TableCell>)
        });
    }

    function createTableBody(rows) {
        return (
            <TableBody>
                {
                    rows.map(({element}) => (
                        <TableRow
                            key={ element[0] }
                            sx={{ border: 1 }}
                        >
                            { getCols(element) }
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
    }, [message]);

  return (
    rows && 
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: TABLE_MIN_WIDTH }} aria-label="simple table">
        <TableHead sx={{ border: 1.5 }}>
            <TableRow sx={{ bgcolor: 'text.disabled' }}>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Id</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Delete</TableCell>
            </TableRow>
        </TableHead>
        {createTableBody(rows)}
      </Table>
    </TableContainer>
  );
}
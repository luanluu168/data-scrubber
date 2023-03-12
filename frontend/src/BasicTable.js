import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

export default function BasicTable({message}) {
    const [rows, setRows] = useState(0);
    const TABLE_MIN_WIDTH = 450;

    function getCols(element) {
        return element.map((e, i) => {
            if(i === 0) {
                return (<TableCell key={i} component="th" scope="row">{e}</TableCell>)
            } else if (i === 3) {
                return (<TableCell key={i} component="th" scope="row">{e.slice(5, 17)}</TableCell>)
            }

            return (<TableCell key={i} align="right">{e}</TableCell>)
        });
    }

    function createTableBody(rows) {
        return (<TableBody>
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
                </TableBody>)
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
        <TableHead sx={{ border: 1 }}>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Age</TableCell>
          </TableRow>
        </TableHead>
            {createTableBody(rows)}
      </Table>
    </TableContainer>
  );
}
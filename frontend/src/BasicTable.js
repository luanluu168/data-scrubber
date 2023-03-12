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
            <TableCell align="right">First Name</TableCell>
            <TableCell align="right">Last Name</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Age</TableCell>
          </TableRow>
        </TableHead>
            {createTableBody(rows)}
      </Table>
    </TableContainer>
  );
}
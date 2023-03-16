import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';

export default function BasicTable({message, rows, setRows}) {
    const TABLE_MIN_WIDTH = 450;

    function getCols(element) {
        return element.map((e, i) => {
            if(i === 0) {
                return (<TableCell key={i} component="th" scope="row">{e}</TableCell>)
            } else if (i === 3) {
                return (<TableCell key={i} component="th" scope="row">{e.slice(5, 17)}</TableCell>)
            }

            return (<TableCell key={i} align="center">{e}</TableCell>)
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

    function createTableHeader() {
        <TableHead sx={{ border: 1.5 }}>
          <TableRow sx={{ bgcolor: 'text.disabled' }}>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Id</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>First Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Date</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Email</TableCell>
            <TableCell align="center" sx={{ fontWeight: 'bold' }}>Age</TableCell>
          </TableRow>
        </TableHead>
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
        {createTableHeader()}
        {createTableBody(rows)}
      </Table>
    </TableContainer>
  );
}
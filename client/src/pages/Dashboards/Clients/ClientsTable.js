import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
  Avatar,
} from '@mui/material';

const ClientsTable = ({ users}) => {
  return (
    <Container maxWidth="lg">
      <Paper>
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="left">UserID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell align="left">Username</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Role</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="left">
                      <Typography variant="body1">{user._id}</Typography>
                    </TableCell>
                    <TableCell>
                      <Avatar
                        variant="circular"
                        src={user.avatar}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">{user.username}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">{user.email}</Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography variant="body1">{user.role}</Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      </Paper>
    </Container>
  );
};

export default ClientsTable;

import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Button,
  TablePagination,
} from '@mui/material';

const AdminTable = ({
  handleDelete,
  handleUpdate,
  handleView,
  handleSuspend,
  filteredUsers,
}) => {
  const [page, setPage] = useState(0); // State to manage current page
  const [rowsPerPage, setRowsPerPage] = useState(5); // State to manage rows per page

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when changing rows per page
  };

  // Calculate the users to be displayed based on pagination
  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      {/* Table Container with Pagination */}
      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '100%',
          overflowY: 'auto',
        }}
      >
        <Table stickyHeader sx={{ minWidth:"92vw" }}>
          <TableHead>
            <TableRow>
              <TableCell align="left">UserID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell align="left">Username</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* Display message if no users match the filter */}
          {filteredUsers.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1">User Not Found</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user._id}>
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
                  <TableCell align="left">
                    <Typography variant="body1">
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </Typography>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleView(user._id)}
                      sx={{ marginRight: 1 }}
                    >
                      View
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleUpdate(user._id)}
                      sx={{ marginRight: 1 }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={() => handleSuspend(user._id)}
                      sx={{ marginRight: 1 }}
                    >
                      Suspend
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {/* Pagination Controls */}
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
};

export default AdminTable;

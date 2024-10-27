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
  IconButton,
  TablePagination,
  Box,
  Badge,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';

const AdminTable = ({
  handleDelete,
  handleUpdate,
  handleView,
  handleSuspend,
  filteredUsers,
  handleReactivate,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const isUserSelected = (userId) => selectedUsers.includes(userId);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 0,
          p: 1,
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="View User">
            <IconButton
              color="primary"
              onClick={() => selectedUsers.forEach((id) => handleView(id))}
              disabled={selectedUsers.length === 0}
            >
              <ViewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Update User">
            <IconButton
              color="secondary"
              onClick={() => selectedUsers.forEach((id) => handleUpdate(id))}
              disabled={selectedUsers.length === 0}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Suspend User">
            <IconButton
              color="secondary"
              onClick={() => selectedUsers.forEach((id) => handleSuspend(id))}
              disabled={selectedUsers.length === 0}
            >
              <BlockIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reactivate User">
            <IconButton
              color="primary"
              onClick={() =>
                selectedUsers.forEach((id) => handleReactivate(id))
              }
              disabled={selectedUsers.length === 0}
            >
              <PersonAddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete User">
            <IconButton
              color="error"
              onClick={() => selectedUsers.forEach((id) => handleDelete(id))}
              disabled={selectedUsers.length === 0}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          maxHeight: '100%',
          overflowY: 'auto',
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Table stickyHeader sx={{ minWidth: '92vw', textAlign: 'center' }}>
          <TableHead sx={{ bgcolor: '#1976d2', color: '#ffffff' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Select
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                UserID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Avatar</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Username
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Role
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Verification
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          {filteredUsers.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1" color="textSecondary">
                    User Not Found
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  key={user._id}
                  onClick={() => toggleUserSelection(user._id)}
                  sx={{
                    cursor: 'pointer',

                    bgcolor: isUserSelected(user._id) ? 'darkGreen' : 'inherit',
                    '&:hover': { bgcolor: 'darkGreen' },
                  }}
                >
                  <TableCell align="center" >
                    <input
                      type="checkbox"
                      
                      checked={isUserSelected(user._id)}
                      onChange={() => toggleUserSelection(user._id)}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{color:isUserSelected(user._id) ? '#fff' : 'inherit',}}  variant="body1">{user._id}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Avatar
                      variant="circular"
                      src={user?.profile?.avatar}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{color:isUserSelected(user._id) ? '#fff' : 'inherit',}} variant="body1">{user.username}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">{user.email}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{color:isUserSelected(user._id) ? '#fff' : 'inherit',}} variant="body1">{user.role}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{color:isUserSelected(user._id) ? '#fff' : 'inherit',}} variant="body1">
                      {user.isVerified ? 'Verified' : 'Pending'}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography sx={{color:isUserSelected(user._id) ? '#fff' : 'inherit',}} variant="body1">
                      {user.status === 'active' ? (
                        <Badge
                          sx={{
                            '& .MuiBadge-dot': { backgroundColor: 'green' },
                          }}
                          variant="dot"
                        />
                      ) : (
                        <Badge
                          sx={{ '& .MuiBadge-dot': { backgroundColor: 'red' } }}
                          variant="dot"
                        />
                      )}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <Divider sx={{ my: 2 }} />

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        sx={{ borderRadius: '8px' }}
      />
    </>
  );
};

export default AdminTable;

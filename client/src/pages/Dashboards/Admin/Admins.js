import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActionArea,
  Box,
  Paper,
  InputBase,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
} from '@mui/material';
import AdminTable from './AdminTable';

const Users = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      const adminUsers = response.data.filter((user) => user.role === 'admin'); // Filter admin users
      setUsers(adminUsers); // Set the filtered admin users in state
    } catch (error) {
      console.error('Error fetching users:', error);
      // Optionally, set an error state here to notify users
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Container sx={{ my: 1 }}>
        <Typography variant="h4">Data Fetching...</Typography>
      </Container>

      {users ? <AdminTable users={users} /> : 'Error Loading'}
    </>
  );
};

export default Users;

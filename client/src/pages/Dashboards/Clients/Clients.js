import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,

} from '@mui/material';
import ClientsTable from './ClientsTable';

const Clients = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      const Clients = response.data.filter((user) => user.role === 'user'); // Filter admin users
      setUsers(Clients); // Set the filtered admin users in state
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

      {users ? <ClientsTable users={users} /> : 'Error Loading'}
    </>
  );
};

export default Clients;

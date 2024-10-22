import { Box, Typography, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const Main = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [data, setData] = useState([]); // State to hold chart data

  // Function to fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user');
      setUsers(response.data); // Set the fetched users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to filter users by role and prepare data for the chart
  const calculateRoleCounts = () => {
    const adminCount = users.filter((user) => user.role === 'admin').length;
    const artistCount = users.filter((user) => user.role === 'artist').length;
    const clientsCount = users.filter((user) => user.role === 'user').length;
    const organizationsCount = users.filter((user) => user.role === 'organization').length;

    // Prepare data for the chart
    const chartData = [
      { role: 'Admin', count: adminCount },
      { role: 'Artist', count: artistCount },
      { role: 'Client', count: clientsCount },
      { role: 'Organization', count: organizationsCount },
    ];

    setData(chartData); // Update state with the chart data
  };

  // useEffect to calculate counts when users are fetched or updated
  useEffect(() => {
    calculateRoleCounts();
  }, [users]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Role Counts
      </Typography>

      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        {/* Render the Bar Chart */}
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="role" fontSize={14} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="count"
              fill="#4CAF50"
              animationDuration={1500} // Duration of animation in ms
              animationEasing="ease-out" // Type of animation easing
              animationBegin={0} // Delay before the animation starts
              isAnimationActive={true} // Enable animation
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Main;

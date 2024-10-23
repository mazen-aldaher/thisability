import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

const CreateUser = ({
  handleCreate,
  newUser,
  handleNewUserInputChange,
  errors,
  generatePassword,
}) => {
  return (
    <Box
      sx={{
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
      }}
    >
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={newUser.username}
        onChange={handleNewUserInputChange}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        value={newUser.email}
        onChange={handleNewUserInputChange}
        error={!!errors.email}
        helperText={errors.email}
      />
      <Select
        fullWidth
        margin="normal"
        name="role"
        value={newUser.role}
        onChange={handleNewUserInputChange}
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </Select>
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        value={newUser.password}
        onChange={handleNewUserInputChange}
        error={!!errors.password}
        helperText={errors.password}
        InputProps={{
          endAdornment: (
            <Button onClick={generatePassword} color="primary">
              GPass
            </Button>
          ),
        }}
      />
      <Button
        onClick={handleCreate}
        color="primary"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Create User
      </Button>
    </Box>
  );
};

export default CreateUser;

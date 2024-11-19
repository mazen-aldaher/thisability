import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const InputField = ({
  label,
  type = 'text',
  value,
  onChange,
  showPasswordToggle = false,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <TextField
      margin="normal"
      required
      fullWidth
      label={label}
      type={showPasswordToggle && !showPassword ? 'password' : type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="outlined"
      sx={{ '& .MuiOutlinedInput-root': { borderRadius: 25 } }}
      InputProps={
        showPasswordToggle
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  );
};

export default InputField;

import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const MainInfo = ({
  formData,
  isEditing,
  handleInputChange,
  handleEditClick,
  handleSaveSection,
}) => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            disabled={!isEditing.mainInfo}
            onChange={(e) => handleInputChange(e, 'firstName')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            disabled={!isEditing.mainInfo}
            onChange={(e) => handleInputChange(e, 'lastName')}
          />
        </Grid>
      </Grid>
      <Button
        variant="contained"
        startIcon={isEditing.mainInfo ? <SaveIcon /> : <EditIcon />}
        onClick={() =>
          isEditing.mainInfo
            ? handleSaveSection('mainInfo')
            : handleEditClick('mainInfo')
        }
        sx={{ mt: 3 }}
      >
        {isEditing.mainInfo ? 'Save' : 'Edit'}
      </Button>
    </div>
  );
};

export default MainInfo;

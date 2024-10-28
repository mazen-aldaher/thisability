import React from 'react';
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const ArtistInfo = ({ formData, isEditing, handleInputChange, handleEditClick, handleSaveSection }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Artist Info
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          label="Art Style"
          value={formData.artStyle}
          disabled={!isEditing}
          onChange={(e) => handleInputChange(e, 'artStyle')}
        />
        <TextField
          fullWidth
          label="Portfolio URL"
          value={formData.portfolioUrl}
          disabled={!isEditing}
          onChange={(e) => handleInputChange(e, 'portfolioUrl')}
          sx={{ mt: 2 }}
        />
        <Button
          variant="contained"
          startIcon={isEditing ? <SaveIcon /> : <EditIcon />}
          onClick={() => (isEditing ? handleSaveSection('artistInfo') : handleEditClick('artistInfo'))}
          sx={{ mt: 3 }}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default ArtistInfo;

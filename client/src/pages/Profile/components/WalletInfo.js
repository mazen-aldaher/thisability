import React from 'react';
import { TextField, Button, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const WalletInfo = ({ formData, isEditing, handleInputChange, handleEditClick, handleSaveSection }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Wallet Info
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TextField
          fullWidth
          label="Wallet Address"
          value={formData.walletAddress}
          disabled={!isEditing.wallet}
          onChange={(e) => handleInputChange(e, 'walletAddress')}
        />
        <Button
          variant="contained"
          startIcon={isEditing.wallet ? <SaveIcon /> : <EditIcon />}
          onClick={() => (isEditing.wallet ? handleSaveSection('walletInfo') : handleEditClick('walletInfo'))}
          sx={{ mt: 3 }}
        >
          {isEditing.wallet ? 'Save' : 'Edit'}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
};

export default WalletInfo;

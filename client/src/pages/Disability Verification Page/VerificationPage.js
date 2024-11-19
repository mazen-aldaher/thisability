import React from 'react';
import { Box, Divider } from '@mui/material';
import DisabilityVerificationForm from './components/DisabilityVerificationForm';
import FaceVerification from './components/FaceVerification';
const VerificationPage = () => {
  return (
    <Box>
      <DisabilityVerificationForm />

      <Divider />
      <FaceVerification />
    </Box>
  );
};

export default VerificationPage;
  
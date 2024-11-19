import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from '@mui/material';
import FloatObj from '../../../components/FloatObj';
import ill1 from '../../../assets/ill/ill-1.png';
import ill2 from '../../../assets/ill/ill-2.png';
import ill3 from '../../../assets/ill/ill-3.png';
import ill4 from '../../../assets/ill/ill-4.png';
import ill5 from '../../../assets/ill/ill-5.png';
import ill6 from '../../../assets/ill/ill-6.png';
import ill7 from '../../../assets/ill/ill-7.png';
import fli1 from '../../../assets/ill/art-ist/flip-1.png';
import fli2 from '../../../assets/ill/art-ist/flip-2.png';
import fli3 from '../../../assets/ill/art-ist/flip-3.png';
import fli5 from '../../../assets/ill/art-ist/flip-5.png';
import CTABTN from '../../../components/Button/CTABTN';
import { useNavigate } from 'react-router-dom';

const BeforeHero = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  // Function to open the popup
  const handleOpen = () => {
    setOpen(true);
  };

  // Function to close the popup
  const handleClose = () => {
    setOpen(false);
  };
  const handleArtist = () => {
    navigate('/register/new-artist');
  };
  const handleAssociation = () => {
    navigate('/register/new-assocciation');
  };
  return (
    <Box>
      <Box sx={{}}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xl: 'space-between', md: 'space-between' },
            alignItems: 'center',
            alignContent: 'flex-start',
            width: '100%',
            margin: 'auto',
            height: '110vh',
          }}
        >
          <Box sx={{ display: { md: 'flex', xs: 'none' } }}>
            <Box sx={{ paddingRight: { xl: '2%' }, mt: 5 }}>
              <FloatObj front={ill1} back={fli1} canFlip={true} />
            </Box>
            <Box>
              <Box sx={{ pb: 5 }}>
                <FloatObj front={ill2} back={ill2} canFlip={true} />
              </Box>
              <Box sx={{ pt: 5 }}>
                <FloatObj front={ill5} back={fli5} canFlip={true} />
              </Box>
            </Box>
            <Box sx={{ marginLeft: { xl: '1%' }, marginTop: '5' }}>
              <FloatObj front={ill3} back={ill3} canFlip={true} />
            </Box>
            <Box>
              <Box sx={{ marginLeft: { xl: '10%' }, marginTop: '-10%' }}>
                <FloatObj front={ill7} back={fli2} canFlip={true} />
              </Box>
              <Box sx={{ marginLeft: { xl: '10%' }, pt: 5 }}>
                <FloatObj front={ill6} back={ill6} canFlip={true} />
              </Box>
            </Box>
            <Box sx={{ marginTop: 5, ml: 5 }}>
              <FloatObj front={ill4} back={fli3} canFlip={true} />
            </Box>
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              width: '100vw',
              height: '500px',
              zIndex: 1,
              position: 'relative',
              alignContent: 'flex-start',
              display: 'flex',
              flexDirection: 'column',
              p: 8,
              textAlign: { md: 'center', xs: 'left' },
              color: theme.palette.colortext.main,
              top: { xl: '-30%', lg: '-35%', md: '-40%', xs: 0 },
              pb: 10,
              mb: '-15%',
            }}
          >
            <Box>
              <Typography variant="h2">
                Know me for my Ability, not my Disability
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                textAlign: { md: 'center', sm: 'left', xs: 'left' },
                paddingTop: 2,
                justifyContent: { md: 'center' },
                gap: { xl: 5, xs: 2 },
                flexDirection: { xs: 'row' },
                flexWrap: 'wrap',
              }}
            >
              <CTABTN title="Shop Know" link="/products" />
              <CTABTN
                title="Join Us"
                link="/"
                color={'darkRed'}
                onClick={handleOpen}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '20px',
            padding: '20px',
            backgroundColor: 'transparent',
            backdropFilter: 'blur(8px)', // Adds a background blur effect
            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#fff',
            fontSize: { xs: '1.8rem', md: '2rem' }, // Responsive font size
            mb: 2,
            textTransform: 'uppercase',
          }}
        >
          Register as:
        </DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pb: 2,
            px: { xs: 2, md: 4 }, // Responsive padding
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' }, // Stack buttons vertically on mobile
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                width: { xs: '100%', md: 'auto' }, // Full width on mobile
                padding: '10px 20px',
                fontSize: '1rem',
                borderRadius: '8px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
              onClick={handleArtist}
            >
              Artist
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: { xs: '100%', md: 'auto' }, // Full width on mobile
                padding: '10px 20px',
                fontSize: '1rem',
                borderRadius: '8px',
                transition: 'background-color 0.3s',
                '&:hover': {
                  backgroundColor: theme.palette.secondary.dark,
                },
              }}
              onClick={handleAssociation}
            >
              Association
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BeforeHero;

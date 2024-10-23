import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

const DashContainer = ({
  title,
  children,
  maxWidth,
  searchQuery,
  handleSearchChange,
  SBox,
  handleAdd,
}) => {
  return (
    <Container maxWidth={`${maxWidth}`} sx={{ m: 1 }}>
      <Paper elevation={7} sx={{ borderRadius: '20px', p: 1 }}>
        <Box
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex' }}>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            {handleAdd ? (
              <Button onClick={handleAdd}>Add New Admin +</Button>
            ) : (
              ''
            )}
          </Box>
          {SBox ? (
            <>
              {/* Search Bar */}
              <Box>
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: 300,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search Users"
                    inputProps={{ 'aria-label': 'search users' }}
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <IconButton type="button" sx={{ p: '10px' }}>
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>
            </>
          ) : (
            ''
          )}
        </Box>
        <Divider />
        <Box>{children}</Box>
      </Paper>
    </Container>
  );
};

export default DashContainer;

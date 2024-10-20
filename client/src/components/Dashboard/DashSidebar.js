import React, { useCallback } from 'react';
import {
  Drawer,
  IconButton,
  Toolbar,
  Divider,
  List,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LogoIcon from '@mui/icons-material/AccountTree'; // Replace with your actual logo icon
import SygnetIcon from '@mui/icons-material/AcUnit'; // Replace with your actual sygnet icon
import { AppSidebarNav } from './AppSidebarNav';
import navigation from '../../_nav'; // Sidebar nav config

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
  marginTop: 0,
}));

const Logo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontWeight: 700,
}));

const AppSidebar = ({
  handleDrawerToggle,
  handleUnfoldToggle,
  sidebarShow,
  unfoldable,
  drawerWidth,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = useCallback(() => {
    if (isMobile) {
      handleDrawerToggle();
    }
  }, [isMobile, handleDrawerToggle]);

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={sidebarShow}
      onClose={handleClose}
      sx={{
        width: drawerWidth,
        marginRight: '20px',
        flexShrink: 1,
        '& .MuiDrawer-paper': {
          width: isMobile ? '100%' : drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Box sx={{ pt: isMobile ? '' : 10 }}>
        <DrawerHeader
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary.main,
                  fontFamily: "cursive",
                }}
              >
                THISABILITY
              </Typography>
              <Typography
                variant="h7"
                sx={{
                  color: theme.palette.secondary.main,
                  fontFamily: 'cursive',
                }}
              >
                |Admin Console
              </Typography>
            </Box>
            {isMobile && (
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            )}
          </>
        </DrawerHeader>
      </Box>

      <Divider />

      <List
        sx={{ flexGrow: 1, overflow: 'auto', pt: isMobile ? '20px' : '20px' }}
      >
        <AppSidebarNav items={navigation} unfoldable={unfoldable} />
      </List>

      <Divider />

      <Toolbar sx={{ justifyContent: 'center' }}>
        <IconButton onClick={handleUnfoldToggle} size="large">
          {unfoldable ? <MenuIcon /> : <SygnetIcon />}
        </IconButton>
      </Toolbar>
    </Drawer>
  );
};

export default React.memo(AppSidebar);

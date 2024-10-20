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
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  const drawerWidth = unfoldable ? 80 : 280;

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
        flexShrink: 1,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <DrawerHeader>
        <Logo component="a" href="/">
          <LogoIcon fontSize="large" sx={{ mr: 1 }} />
          {!unfoldable && (
            <Typography variant="h6" noWrap component="div">
              Thisability
            </Typography>
          )}
        </Logo>
        {isMobile && (
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        )}
      </DrawerHeader>

      <Divider />

      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
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

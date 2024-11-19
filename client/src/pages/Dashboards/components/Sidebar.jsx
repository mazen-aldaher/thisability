/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Typography, useMediaQuery } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { AppSidebarNav } from '../../../components/Dashboard/AppSidebarNav';
import navigation from '../../../DashMenu/_artistNav';

const drawerWidth = 265;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({
  handleDrawerOpen,
  handleDrawerClose,
  open,
}) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const location = useLocation(); // Get the current path
  const [submenuOpen, setSubmenuOpen] = React.useState(false); // Submenu state

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  // Toggle submenu
  const handleSubmenuClick = () => {
    setSubmenuOpen(!submenuOpen);
  };
  const isActive = (path) => location.pathname === path;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main, // Set background color here
            borderRight: '1px solid rgba(255, 255, 255, 0.35)',
          },
        }}
      >
        <DrawerHeader
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          {isSmallScreen ? (
            <Box sx={{pl:1.5}} >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              <Typography
                variant="h5"
                sx={{ color: '#fff', fontFamily: 'cursive' }}
              >
                Thisability
              </Typography>
              <Box sx={{ pl: '2px', color: '#fff' }}> | Dashboard</Box>
            </>
          )}{' '}
        </DrawerHeader>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.35)' }} />
        <List>
          <Box>
            <AppSidebarNav
              items={navigation}
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
            />
          </Box>
        </List>
      </Drawer>
    </Box>
  );
}

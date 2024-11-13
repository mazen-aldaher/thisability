import React, { useContext, useEffect, useState, useMemo } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  SwipeableDrawer,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useTranslation } from 'react-i18next';
import ThemeToggleBar from '../ThemeToggleBar';
import logo from '../../assets/Logo.png';
import { AuthContext } from '../../context/AuthContext';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import AvatarComponent from '../AvatarComponent';

const navItems = [
  { title: 'About', link: '/about-us' },
  { title: 'Store', link: '/products' },
  { title: 'Community', link: '/our-community' },
  { title: 'Support', link: '/support' },
  { title: 'FAQ', link: '/faq' },
];

const Header = ({ onThemeChange, onLanguageChange }) => {
  const { user, logout } = useContext(AuthContext);
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    setScrolled(currentScroll > 10);
    setShowBackToTop(currentScroll > 300);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/');
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage);
    if (onLanguageChange) onLanguageChange(selectedLanguage);
  };

  const renderNavButtons = useMemo(
    () =>
      navItems.map((item) => (
        <Box sx={{ display: 'flex', ml: 1 }}>
          <Button
            key={item.link}
            color="inherit"
            onClick={() => navigate(item.link)}
            sx={{
              color:
                location.pathname === item.link
                  ? theme.palette.warning.main
                  : 'inherit',
              textAlign: 'left',
            }}
          >
            <Typography variant="navtext">{t(item.title)}</Typography>
          </Button>
        </Box>
      )),
    [navItems, location.pathname, theme.palette.warning.main, t, navigate]
  );

  const renderUserMenu = () => (
    <>
      <MenuItem onClick={() => navigate('/my-profile')}>
        <AccountCircleIcon sx={{ marginRight: '8px' }} />
        Profile
      </MenuItem>
      <MenuItem onClick={() => navigate('/order-tracking')}>
        <TrackChangesIcon sx={{ marginRight: '8px' }} />
        Track Order
      </MenuItem>
      <MenuItem onClick={() => navigate('/order-history')}>
        <NotificationsIcon sx={{ marginRight: '8px' }} />
        Orders
      </MenuItem>
      {user.role === 'admin' && (
        <MenuItem onClick={() => navigate('/dashboard/admin/main')}>
          <DashboardIcon sx={{ marginRight: '8px' }} />
          Admin Dashboard
        </MenuItem>
      )}
      {user.role === 'artist' && (
        <MenuItem onClick={() => navigate('/seller-orders')}>
          <DashboardIcon sx={{ marginRight: '8px' }} />
          Artist Dashboard
        </MenuItem>
      )}
      {user.role === 'organization' && (
        <MenuItem onClick={() => navigate('/dashboard/organization')}>
          <DashboardIcon sx={{ marginRight: '8px' }} />
          Organization Dashboard
        </MenuItem>
      )}
      <MenuItem onClick={handleLogout}>
        <LogoutIcon sx={{ marginRight: '8px' }} />
        Logout
      </MenuItem>
    </>
  );

  return (
    <>
      <Container maxWidth="xl" sx={{ display: 'flex', my: 1 }}>
        <Box
          sx={{
            ml: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: { xs: 1, sm: 2 },
          }}
        >
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            sx={{
              color: 'inherit',
              bgcolor: 'background.paper',
              width: { xs: '100%', sm: 'auto', md: '110px' },
              height: '40px',
            }}
          >
            {['en', 'es', 'fr', 'ar'].map((lang) => (
              <MenuItem key={lang} value={lang}>
                <Typography variant="body2">{t(lang)}</Typography>
              </MenuItem>
            ))}
          </Select>

          <ThemeToggleBar onThemeChange={onThemeChange} />

          <Box sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
            {user ? (
              <>
                <IconButton onClick={handleAvatarClick}>
                  <AvatarComponent />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  {renderUserMenu()}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                <Button
                  color="inherit"
                  fullWidth
                  onClick={() => navigate('/login')}
                >
                  {t('Sign In')}
                </Button>
                <Button
                  variant="outlined"
                  color="inherit"
                  fullWidth
                  onClick={() => navigate('/register')}
                >
                  {t('Register')}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <AppBar
        sx={{
          position: 'sticky',
          top: 0,
          left: 0,
          right: 0,
          transition: 'background-color 0.3s ease, color 0.3s ease',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          backgroundColor: theme.palette.primary,
          color: scrolled ? '#fff' : 'inherit',
        }}
      >
        <Box sx={{ px: { xl: 10 } }}>
          <Toolbar>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <NavLink to="/">
                <Box
                  component="img"
                  src={logo}
                  alt="Thisability Logo"
                  sx={{ height: '60px' }}
                />
              </NavLink>
            </Box>

            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: '20px',
              }}
            >
              {renderNavButtons}
              {user ? (
                <>
                  <IconButton onClick={handleAvatarClick}>
                    <Avatar
                      src={user?.profile?.avatar}
                      alt="User Avatar"
                      sx={{ height: '40px', width: '40px' }}
                    />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    {renderUserMenu()}
                  </Menu>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button color="inherit" onClick={() => navigate('/login')}>
                    {t('Sign In')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => navigate('/register')}
                  >
                    {t('Register')}
                  </Button>
                </Box>
              )}
            </Box>

            <Fab
              color="primary"
              onClick={handleDrawerToggle}
              sx={{
                display: { md: 'none' },
                position: 'fixed',
                right: '16px',
                bottom: '16px',
              }}
            >
              <MenuIcon />
            </Fab>
          </Toolbar>
        </Box>
      </AppBar>

      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          '& .MuiDrawer-paper': {
            position: 'absolute',
            bottom: 0,
            width: '50%',
            height: '35vh',
            borderEndEndRadius: '20px',
            borderStartEndRadius: '20px',
            border: 'none',
            padding: 0,
            pt: 2,
          },
        }}
      >
        <List>{renderNavButtons}</List>
      </SwipeableDrawer>

      {showBackToTop && (
        <IconButton
          onClick={scrollToTop}
          sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 1000 }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      )}
    </>
  );
};

export default Header;

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Collapse,
  Box,
  Drawer,
  useTheme,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

export const AppSidebarNav = ({ items, toggleDrawer, drawerOpen }) => {
  const [openItems, setOpenItems] = useState({});
  const theme = useTheme();

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleToggle = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && (
          <ListItemIcon
            sx={{
              color: theme.palette.primary.light,
              minWidth: '40px', // More spacing for icons
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={name}
          sx={{
            fontSize: isMobile ? '0.875rem' : '1rem',
            color: theme.palette.secondary.main,
          }}
        />
        {badge && (
          <Badge
            color={badge.color}
            badgeContent={badge.text}
            sx={{
              mx: 1,
              '& .MuiBadge-badge': {
                backgroundColor: theme.palette.primary.dark, // Badge background color
                color: '#fff',
                fontWeight: 600,
              },
            }}
          >
            {badge.text}
          </Badge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component || ListItem;
    return (
      <Component
        key={index}
        button
        component={rest.to ? NavLink : 'div'}
        to={rest.to || undefined}
        {...rest}
        sx={{
          paddingLeft: '16px', // Indent items
          '&:hover': {
            backgroundColor: theme.palette.primary.dark, // Highlight on hover
          },
        }}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item, index) => {
    const { name, icon, items } = item;
    const isOpen = openItems[index] || false;

    return (
      <div key={index}>
        <ListItem
          button
          onClick={() => handleToggle(index)}
          sx={{
            backgroundColor: theme.palette.background.default,
            paddingLeft: '16px',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {navLink(name, icon)}
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.map((subItem, subIndex) =>
              subItem.items
                ? navGroup(subItem, `${index}-${subIndex}`)
                : navItem(subItem, subIndex)
            )}
          </List>
        </Collapse>
      </div>
    );
  };

  const sidebarContent = (
    <List
      sx={{
        backgroundColor: theme.palette.background.paper, // Dark background
        paddingTop: 0,
      }}
    >
      {items.map((item, index) =>
        item.items ? navGroup(item, index) : navItem(item, index)
      )}
    </List>
  );

  return (
    <>
      {isMobile ? (
        <>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
            sx={{
              '& .MuiDrawer-paper': {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.primary,
              },
            }}
          >
            <Box sx={{ width: 250 }} role="presentation" onClick={() => toggleDrawer(false)}>
              {sidebarContent}
            </Box>
          </Drawer>
        </>
      ) : (
        <Box
          sx={{
            width: 250,
            overflowY: 'auto',
            backgroundColor: theme.palette.background.default, // Sidebar background
          }}
        >
          {sidebarContent}
        </Box>
      )}
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

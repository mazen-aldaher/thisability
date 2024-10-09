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

  const isMobile = useMediaQuery('(max-width:600px)'); // Responsive breakpoint

  const handleToggle = (index) => {
    setOpenItems((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText
          primary={name}
          sx={{
            fontSize: isMobile ? '0.875rem' : '1rem', // Adjust font size based on screen size
            color: theme.palette.secondary.main,
          }}
        />
        {badge && (
          <Badge color={badge.color} badgeContent={badge.text} sx={{ mx: 1 }}>
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
        <ListItem button onClick={() => handleToggle(index)}>
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
    <List>
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
          >
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={() => toggleDrawer(false)}
            >
              {sidebarContent}
            </Box>
          </Drawer>
        </>
      ) : (
        <Box sx={{ width: 250, overflowY: 'auto' }}>{sidebarContent}</Box>
      )}
    </>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};

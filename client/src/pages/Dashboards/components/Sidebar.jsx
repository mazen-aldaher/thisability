import React from 'react';
import { Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <List>
        <ListItem button>
          <ListItemText primary="الرئيسية" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="المعاملات" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="الفواتير" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="رابط دفع جديد" />
        </ListItem>
        {/* Add more items as per the image */}
      </List>
    </Drawer>
  );
};

export default Sidebar;

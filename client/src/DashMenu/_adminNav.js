import React from 'react';
import { ListItem } from '@mui/material';
import {
  Speed,
  Notes,
  Description,
  Login,
  Calculate,
  Extension,
  Mouse,
} from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import TimerIcon from '@mui/icons-material/Timer';
import CategoryIcon from '@mui/icons-material/Category';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BadgeIcon from '@mui/icons-material/Badge';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
const _nav = [
  {
    component: ListItem,
    name: 'Screen Overview',
    to: '/dashboard/admin/main',
    icon: <DashboardIcon />,
  },
  {
    component: ListItem,
    name: 'Customer Support',
    to: '/dashboard/admin/support',
    icon: <SupportAgentIcon />,
  },

  {
    component: ListItem,
    name: 'Users',
    to: '/dashboard/admin/users',
    icon: <GroupIcon className="nav-icon" />,

    items: [
      {
        component: ListItem,
        name: 'Admins',
        to: '/dashboard/admin/users/admins',
        icon: <AdminPanelSettingsIcon />,
      },
      {
        component: ListItem,
        name: 'Artists',
        to: '/dashboard/admin/users/artists',
        icon: <BadgeIcon />,
      },
      {
        component: ListItem,
        name: 'Clients',
        to: '/dashboard/admin/users/clients',
        icon: <VerifiedUserIcon />,
      },
      {
        component: ListItem,
        name: 'Organizations',
        to: '/dashboard/admin/users/organizations',
        icon: <CorporateFareIcon />,
      },
    ],
  },
  {
    component: ListItem,
    name: 'Products',
    to: '/dashboard/admin/products',
    icon: <StorefrontIcon className="nav-icon" />,
    items: [
      {
        component: ListItem,
        name: 'Create',
        to: '/dashboard/admin/products/create',
        icon: <AddCircleIcon />,
      },
      {
        component: ListItem,
        name: 'Orders',
        to: '/dashboard/admin/products/orders',
        icon: <BallotIcon />,
      },
      {
        component: ListItem,
        name: 'Bidding',
        to: '/dashboard/admin/products/bidding',
        icon: <TimerIcon />,
      },
      {
        component: ListItem,
        name: 'Categories',
        to: '/dashboard/admin/products/categories',
        icon: <CategoryIcon />,
      },
      {
        component: ListItem,
        name: 'OT-Purchase',
        to: '/dashboard/admin/products/one-time-purchase',
        icon: <InventoryIcon />,
      },
    ],
  },
  {
    component: ListItem,
    name: 'Blog',
    to: '/dashboard/admin/blog/posts',
    icon: <Notes className="nav-icon" />,
    items: [
      {
        component: ListItem,
        name: 'Create Post',
        to: '/dashboard/admin/blog/posts/new',
        icon: <AddCircleIcon />,
      },
      {
        component: ListItem,
        name: 'Categories',
        to: '/dashboard/admin/blog/posts/categories',
        icon: <CategoryIcon />,
      },
    ],
  },

  {
    component: ListItem,
    name: 'Profile',
    to: '/dashboard/admin/profile',
    icon: <ManageAccountsIcon />,
  },
  {
    component: ListItem,
    name: 'Settings',
    to: '/dashboard/admin/settings',
    icon: <SettingsIcon />,
  },

  {
    component: ListItem,
    name: 'Docs',
    to: '/dashboard/admin/docs',
    icon: <Description />,
  },
];
export default _nav;

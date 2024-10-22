import React from 'react';
import { ListItem } from '@mui/material';
import {
  Speed,
  WaterDrop,
  Notes,
  PieChart,
  Star,
  Notifications,
  Description,
  Error,
  ErrorOutline,
  AppRegistration,
  Login,
  Calculate,
  Edit,
  Extension,
  Mouse,
} from '@mui/icons-material';
const _nav = [
  {
    component: ListItem,
    name: 'Screen Overview',
    to: '/dashboard/main',
    icon: <Speed />,
  },
  {
    component: ListItem,
    name: 'Bids',
    to: '/user-dashboard/active-bids',
    icon: <WaterDrop className="nav-icon" />,
  },
  {
    component: ListItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <Edit className="nav-icon" />,
  },
  {
    component: ListItem,
    name: 'Base',
    to: '/base',
    icon: <Extension className="nav-icon" />,

    items: [
      {
        component: ListItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: ListItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: ListItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: ListItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: ListItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: ListItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: ListItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: ListItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: ListItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: ListItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: ListItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: ListItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: ListItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: ListItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: ListItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
    ],
  },
  {
    component: ListItem,
    name: 'Buttons',
    to: '/buttons',
    icon: <Mouse className="nav-icon" />,
    items: [
      {
        component: ListItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: ListItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: ListItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: ListItem,
    name: 'Forms',
    icon: <Notes className="nav-icon" />,
    items: [
      {
        component: ListItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: ListItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: ListItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: ListItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: ListItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: ListItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: ListItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: ListItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: ListItem,
    name: 'Charts',
    to: '/charts',
    icon: <PieChart />,
  },
  {
    component: 'div',
    name: 'Icons',
    icon: <Star />,
    items: [
      {
        component: ListItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: ListItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: ListItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: 'div',
    name: 'Notifications',
    icon: <Notifications />,
    items: [
      {
        component: ListItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: ListItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: ListItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: ListItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: ListItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <Calculate />,
  },
 
  {
    component: 'div',
    name: 'Pages',
    icon: <Star />,
    items: [
      {
        component: ListItem,
        name: 'Login',
        to: '/login',
        icon: <Login />,
      },
      {
        component: ListItem,
        name: 'Register',
        to: '/register',
        icon: <AppRegistration />,
      },
      {
        component: ListItem,
        name: 'Error 404',
        to: '/404',
        icon: <ErrorOutline />,
      },
      {
        component: ListItem,
        name: 'Error 500',
        to: '/500',
        icon: <Error />,
      },
    ],
  },
  {
    component: ListItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <Description />,
  },
];
export default _nav;

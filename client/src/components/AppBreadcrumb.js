import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import routes from '../routes';

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location) => {
    const breadcrumbs = [];
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`;
      const routeName = getRouteName(currentPathname, routes);
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length,
        });
      return currentPathname;
    });
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);

  return (
    <Breadcrumbs aria-label="breadcrumb" className="my-0">
      <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
        Home
      </Link>
      {breadcrumbs.map((breadcrumb, index) => {
        return breadcrumb.active ? (
          <Typography key={index} color="text.primary">
            {breadcrumb.name}
          </Typography>
        ) : (
          <Link
            to={breadcrumb.pathname}
            style={{ textDecoration: 'none', color: 'inherit' }}
            key={index}
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default React.memo(AppBreadcrumb);

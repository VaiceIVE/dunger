import { Fragment } from 'react';
import { Navigate, Outlet, ScrollRestoration } from 'react-router-dom';
import { useAuth } from '@dunger/auth-fetch';

export const UserLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to={'/no-auth'} replace />;

  return (
    <Fragment>
      <ScrollRestoration />
      <Outlet />
    </Fragment>
  );
};

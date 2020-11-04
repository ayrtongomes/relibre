import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Auth
import { useAuth } from 'services/auth';

export const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location, ...props }) => {
        if (rest.redirect) {
          return <Redirect to={{ pathname: '/home' }} />;
        }
        return user && user.token ? (
          location.pathname === '/' ? (
            <Redirect to="/home" />
          ) : (
            children
          )
        ) : (
          <Redirect
            to={{ pathname: '/home', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

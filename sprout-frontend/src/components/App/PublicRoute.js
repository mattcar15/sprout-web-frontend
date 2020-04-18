import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
  component: Component, user, pathChange, ...rest
}) => (
  <Route
    {...rest}
    render={props => (!(user && user._id) ? (
      <Component {...props} />
    ) : (
      <Redirect to="/" />
    ))}
  />
);

export default PublicRoute;

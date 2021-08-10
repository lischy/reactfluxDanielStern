/* eslint-disable react/jsx-props-no-spreading */
import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { Route } from "react-router-dom";

const ProtectedRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      onRedirecting: () => <div>Loading ...</div>
    })}
    {...args}
  />
);

export default ProtectedRoute;

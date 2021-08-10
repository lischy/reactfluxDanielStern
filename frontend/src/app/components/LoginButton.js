import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>Login</Button>;
};

export default LoginButton;

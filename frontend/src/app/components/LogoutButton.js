import { useAuth0 } from "@auth0/auth0-react";
import Button from "@material-ui/core/Button";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return <Button color="secondary" variant="contained" onClick={() => logout()}>Logout</Button>;
};

export default LogoutButton;

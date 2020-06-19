import React from "react";
import { Button } from "reactstrap"
import { useAuth0 } from "../react-auth0-spa";

import logo from "../logos/2.png";

const Home = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', height: '90vh', flexDirection: 'column' }}>
      <img src={logo} alt="river"/>
      <Button
        id="qsLoginBtn"
        color="info"
        className="btn-margin"
        onClick={() => loginWithRedirect({})}
      >
        Log in
      </Button>
    </div>
  )
};

export default Home;

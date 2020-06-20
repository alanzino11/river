import React from "react";
import { Button } from "reactstrap";
import { useAuth0 } from "../react-auth0-spa";

import logo from "../logos/2.png";

const Home = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div className="home-pg">
      <div className="content">
        <img id="home-logo"src={logo} alt="River"></img>
        
        <Button
          id="qsLoginBtn"
          color="info"
          className="btn-margin"
          size="lg"
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import VideoChat from './VideoChat';
import firebase from './firebase';

// styles
import "./App.css";

const App = () => {
  const { loading, isAuthenticated } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
        {isAuthenticated ? <NavBar/> : null}
        <Switch>
          <Route path="/" exact component={Home}/>
          <PrivateRoute path="/chat" exact component={VideoChat} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </Router>
  )
}

export default App;
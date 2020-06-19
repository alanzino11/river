import React, {useState, useEffect} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container, Button } from "reactstrap";
import Modal from 'react-modal'

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import VideoChat from './VideoChat';
import InterestForm from './components/InterestForm'

// styles
import "./App.css";

const App = () => {
  const { loading, isAuthenticated } = useAuth0();
  const [modalIsOpen, setModalOpen] = useState(true)

  if (loading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
        {isAuthenticated ? <NavBar/> : null}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <InterestForm closeModal={() => setModalOpen(false)}/>
        </Modal>
        <Switch>
          <Route path="/" exact component={Home}/>
          <PrivateRoute path="/chat" exact component={VideoChat} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </Router>
  )
}

export default App;
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

const newState = []

const App = () => {
  const { user, loading, isAuthenticated } = useAuth0();
  const [modalIsOpen, setModalOpen] = useState(true)
  const [interestFormFilledOut, setInterestFormFilledOut] = useState(false) // need confirmation from firebase that the user has already answered questions

useEffect(() => {
    verifyUserRegistered();
})

const verifyUserRegistered = () => {
  if (user) {
    if (user.set == true) {
      setInterestFormFilledOut(true);
    }
  }
}

  if (loading) {
    return (
      <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', height: '90vh'}}>
        <Loading />
      </div>
    )
  }

  return (
    <Router history={history}>
        {isAuthenticated ? <NavBar/> : null}
        { isAuthenticated && !interestFormFilledOut ? 
          (<Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalOpen(false)}
            contentLabel="Example Modal"
            ariaHideApp={false}
          >
            <InterestForm closeModal={() => setModalOpen(false)}/>
          </Modal>) : null
        }
        <Switch>
          <Route path="/" exact component={Home}/>
          <PrivateRoute path="/chat" exact component={VideoChat} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </Router>
  )
}

export default App;
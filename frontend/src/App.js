import React, {useState, useEffect} from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container, Button } from "reactstrap";
import Modal from 'react-modal'
import firebase from './firebase';
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
  const { user, loading, isAuthenticated } = useAuth0();
  const [modalIsOpen, setModalOpen] = useState(true)
  const [interestFormFilledOut, setInterestFormFilledOut] = useState(false) // need confirmation from firebase that the user has already answered questions
  const [userVerified, setUserVerified] = useState(false)

useEffect(() => {
  if (user) {
    verifyUserRegistered(user);
  }
  if (interestFormFilledOut) {
    setUserVerified(true);
  }
}, [user, interestFormFilledOut])

const verifyUserRegistered = (obj) => {
  firebase.database().ref("users/"+obj.nickname)
  .on('value', (snapshot) => {
    let userObj = snapshot.val();
    console.log('IN INTEREST FORM, user is', userObj)
    if (userObj.set) {
      setInterestFormFilledOut(true);
      console.log("Interest Form", interestFormFilledOut)
    }
  });
}

  if (loading) {
    return (
      <div style={{justifyContent: 'center', display: 'flex', alignItems: 'center', height: '90vh'}}>
        <Loading />
      </div>
    )
  }

  console.log(isAuthenticated)

  return (
    <Router history={history}>
        {isAuthenticated ? <NavBar/> : null}
        { isAuthenticated && userVerified && !interestFormFilledOut? 
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
          {!isAuthenticated ? <Route path="/" exact component={Home}/> : null}
          <PrivateRoute path="/chat" exact component={VideoChat} />
          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
    </Router>
  )
}

export default App;
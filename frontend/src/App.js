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
  const [modalIsOpen, setModalOpen] = useState(true);
  const [userVerified, setUserVerified] = useState(false);
  const [userVerifiedLoaded, setUserVerifiedLoaded] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [userExistsLoaded, setUserExistsLoaded] = useState(false);

useEffect(() => {
  if (user) {
    verifyUserExists(user);
  }
}, [user])

useEffect(() => {
  if (userExists) {
    verifyUserRegistered(user);
  } else if (user) {
    handleUserLogin(user);
  }
}, [userExistsLoaded])

useEffect(() => {
  console.log("User Verification Complete");
}, [userVerifiedLoaded])

const handleUserLogin = (obj) => {
  firebase.database()
  .ref("users/" + obj.nickname)
  .set({
    first: obj.given_name,
    last: obj.family_name,
    email: obj.email,
    status: "",
    type: "",
    interests: {
      status: "",
      type: "",
      topics: "",
    },
    set: false
  });
}

const verifyUserExists = (obj) => {
  firebase.database()
  .ref("users/"+obj.nickname)
  .on('value', (snapshot) => {
    let userObj = snapshot.val()
    if (userObj) {
      setUserExists(true);
    }
    setUserExistsLoaded(true);
  });
}

const verifyUserRegistered = (obj) => {
  firebase.database()
  .ref("users/"+obj.nickname)
  .on('value', (snapshot) => {
    let userObj = snapshot.val()
    if (userObj.set) {
      console.log(obj);
      setUserVerified(true);
    }
    setUserVerifiedLoaded(true);
  });
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
        { isAuthenticated && !userVerified && userVerifiedLoaded ? 
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
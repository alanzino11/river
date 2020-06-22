import React, {useState, useEffect} from 'react';

import firebase from './firebase';
import { useAuth0 } from "./react-auth0-spa";
import "./style.css";

/* The Lobby Component's Job is to render the props from its parent, the VideoChat component
it will have username and room name and handle the form upon submission 
by using the functions passed in from VideoChat*/

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  const { user } = useAuth0();
  const [interests, setInterests] = useState([])
  const annaFirebaseArray = ['tech','science','fashion','sports']

  const handleRoomSubmit = (room) =>{
    handleRoomNameChange(room);
    handleUsernameChange(user.nickname);
    handleSubmit();
  }

  useEffect(() => {
    const verifyUserRegistered = () => {
      firebase.database().ref("users/"+ user.nickname)
      .on('value', (snapshot) => {
        let userObj = snapshot.val();
        splitArray(userObj.interests.topics)
      });
    }

    verifyUserRegistered()
  }, [])

  const splitArray = (str) => {
    let fields = str.split(',');
    setInterests(fields)
  }

  const myTiles = interests.map(thisTile => (
  <div><button class="column" id='myInterest' key={thisTile} onClick={handleRoomSubmit(thisTile)}><div id='inner'>{thisTile}</div></button></div>
  ));

  return (
    <div>
      <h3>Room Interests</h3>
      <div class='wrap'><div className="interest-tiles">{myTiles}</div></div>
    </div>
  );
};

export default Lobby;
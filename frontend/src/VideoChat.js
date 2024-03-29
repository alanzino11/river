import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import firebase from './firebase';
const VideoChat = () => {

  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  //set our variables, and their respective setState functions
  const handleUsernameChange = useCallback(event => {
    setUsername(event);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event);
  }, []);

  //functions to set the state of vars
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault(); //handle user not entering data
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);


      firebase.database()
        .ref("events")
        .push({
            user: username,
          roomID: roomName
      });
    },
    [roomName, username]
  ); //makes call to fetch api with token, structure data, second parameter of callback requires username and roomName to be set

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    ); //if token is set show room, pass props
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    ); //else show our login
  }
  return render;
};

export default VideoChat;
import React, { useState, useCallback } from 'react';
import { useAuth0 } from "./react-auth0-spa";
import Lobby from './Lobby';
import Room from './Room';
import firebase from './firebase';
import { Router, Redirect, Route, Switch } from "react-router-dom";

const VideoChat = () => {
  const { user } = useAuth0();
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  //set our variables, and their respective setState functions
  const handleUsernameChange = (value) => {
    setUsername(value);
  }

  const handleRoomNameChange = (value) => {
    setRoomName(value);
  }
  //functions to set the state of vars
  const handleSubmit = (room,name) => {
    handleUsernameChange(name);
    handleRoomNameChange(room);
    getTwilio();
  }
  
  const getTwilio = useCallback(
    async event => {
      //event.preventDefault(); //handle user not entering data
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
    },
    [roomName, username]
  ); //makes call to fetch api with token, structure data, second parameter of callback requires username and roomName to be set

  const handleLogout = useCallback(event => {
    setToken(null);
    return(<Redirect to="/" />)
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
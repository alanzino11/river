import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import firebase from './firebase'

var newState = [];

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  //set our variables, and their respective setState functions
  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
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
    },
    [roomName, username]
  ); //makes call to fetch api with token, structure data, second parameter of callback requires username and roomName to be set

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

//firebase code read
  const itemsRef = firebase.database().ref('roomIDs');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    console.log(items)
    for (let item in items) {
      newState.push({
      roomid: item,
      users: items[item].users,
      });
    }
    console.log(newState);
  });

  const write = firebase.database()
      .ref("roomIDs/0002")
      .set({
        users: 'hello world 2!'
      });
    console.log("DATA SAVED");

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
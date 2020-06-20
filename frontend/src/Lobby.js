import React, {Component} from "react";

/* The Lobby Component's Job is to render the props from its parent, the VideoChat component
it will have username and room name and handle the form upon submission 
by using the functions passed in from VideoChat*/

import firebase from './Firebase.js';




const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {

  const newState = [];

  const itemsRef = firebase.database().ref('roomIDs');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    for (let item in items) {    
      newState.push({
      roomid: item,
      users: items[item].users,
      });
    }
    console.log(newState[0].roomid);
    console.log(newState);
  });

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />

    <select>
  	  <option value="" selected>Select Your Stream</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>

      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
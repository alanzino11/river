import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';
/*
useState is a function that takes a single argument, the initial state, 
then returns array containing the current state and a function to update that state. 
destructure that array to give us two distinct variables like state and setState. 
track the username, room name and token within our component.

imported useState from react and set up states for the username, room name and token:
*/

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);
/*
The handle functions: Every time the handle functions are called they are redefined
useCallback is a react hook that allows us to hold static data, if the data is the same
between function calls then they won't get redefined
takes two arguments, the function to be memoized and an array of the function's dependencies (not used)
*/

const handleSubmit = useCallback(async event => {
    event.preventDefault();
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
  }, [username, roomName]);

/* The function above: When the user submits the form we send the username and room name 
to the server to get access token to enter room

use the fetch API to send the data as JSON to the endpoint, receive and parse the response, 
then use setToken to store the token in our state. We'll also wrap this function with useCallback too, 
but in this case the function will depend on the username and roomName, so we add those as the dependencies to useCallback
*/

const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

/* For the final function in this component we'll add a logout functionality. This will eject the user from a room and 
return them to the lobby. To do so we will set the token to null.
*/
  

let render;
  if (token) {
    render = (
       <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
         username={username}
         roomName={roomName}
         handleUsernameChange={handleUsernameChange}
         handleRoomNameChange={handleRoomNameChange}
         handleSubmit={handleSubmit}
      />
    );
  }
  return render;


/* Above:
    -render the form with Lobby Component if token is not set
    -if token is set, then show username, roomname and token information */
};

export default VideoChat;
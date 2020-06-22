
import React, {useState, useEffect} from 'react';
import firebase from './firebase';
import { useAuth0 } from "./react-auth0-spa";
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
  const [interests, setInterests] = useState([]);
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
    <div>
      <button class="column" id={thisTile} key={thisTile} onClick={() => {
        handleRoomNameChange(thisTile);
        handleUsernameChange(user.nickname);
      }
      }>
        <div id='inner'>{thisTile} </div>
    </button>
    </div>
    ));


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Enter a room</h2>
      
      <h3>Room Interests</h3>
      {myTiles}
      
    </form>
    <div>
    
    
    </div>
    </div>
  );
};

export default Lobby;
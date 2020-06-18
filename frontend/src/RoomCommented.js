import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';
/* below: useEffect works much like the componentDid / WillMount lifecycle methods
it is a function that takes a method and runs it once the component is rendered
when our component loads we want to connect to the video service, if someone joins or leaves
we also need functions to handle */


useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };  //like setState with spread operator
    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      ); //keep all particiapants who aren't the participant who left
    };
    Video.connect(token, {
      name: roomName
    }).then(room => {
      setRoom(room);
      room.on('participantConnected', participantConnected);
      room.on('participantDisconnected', participantDisconnected);
      room.participants.forEach(participantConnected);
    }); //twilio method, pass in our token and set name as roomName
  //using the promise .then, run functions to handle connections and dissconections
  //using participantConnected loop through any existing participants adding them to the participants array
 
  return () => {
    setRoom(currentRoom => {
      if (currentRoom && currentRoom.localParticipant.state === 'connected') {
        currentRoom.localParticipant.tracks.forEach(function(trackPublication) {
          trackPublication.track.stop();
        });
        currentRoom.disconnect();
        return null;
      } else {
        return currentRoom;
      }
    });
  };
  //above: this is called above as the promise of twilio's Video.connect
  //if local participant is connected then this function stops all local participant's tracks and disconnects all from room
  //when ran upon first mount it will fault to else statement, when useEffect is called again it will run if line and do the clean up
}, [roomName, token]);
/*above: we pass the array of dependencies for our useEffect (ComponentDidMount)
If the variables have changed, we want to clean up first, then run the effect again. If they haven't changed there's no need to run the effect again.
if the roomName or token to change we'd expect to connect to a different room (disconnect)
*/


const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null); //synomous to state and setState
  const [participants, setParticipants] = useState([]);
  /* above: First connect to the Twilio Video service using the token and room name. Upon connection
  we will get a room object that we eill store, we will also store the list of paparticipants
  which may change over time. Use useState to store, initial values set to null
  */


 const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));
/*  Above and below: map over the participants array to show the identity of each participant */
  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {room ? (
          <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};


export default Room;
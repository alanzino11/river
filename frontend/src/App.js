import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import firebase from './Firebase.js';




const App = () => {
  //firebase code read
  const itemsRef = firebase.database().ref('roomIDs');
  itemsRef.on('value', (snapshot) => {
    let items = snapshot.val();
    let newState = [];
    for (let item in items) {
      newState.push({
        roomid: item,
        users: items[item].users,
      });
    }
    console.log(newState);
  });

  ///

  
  return (
    <div className="app">
      <header>
        <h1>Video Chat</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      
    </div>
  );
};

export default App;
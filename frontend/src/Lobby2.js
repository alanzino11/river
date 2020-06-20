import React, {Component} from "react";

/* The Lobby Component's Job is to render the props from its parent, the VideoChat component
it will have username and room name and handle the form upon submission 
by using the functions passed in from VideoChat*/

import firebase from './Firebase.js';


var rooms = [];

export default class Lobby2 extends Component{

  state = {
      newState : [],
      items : null,
  }

  componentDidMount(){
  const itemsRef = firebase.database().ref('roomIDs');
  itemsRef.on('value', (snapshot) => {
   this.state.items = snapshot.val();
   this.setItems();
  });
   
  }

  setItems = () => {
    for (let item in this.state.items) {    
      this.state.newState.push({
          roomid: item,
          users: this.state.items[item].users,
          });
      
  }
  console.log(this.state.newState[0].roomid);
  console.log(this.state.newState);
  }

  render(){
  return (
    <form onSubmit={this.props.handleSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={this.props.username}
          onChange={this.props.handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={this.props.roomName}
          onChange={this.props.handleRoomNameChange}
          required
        />

    <select>
  	  <option value="" selected>Select Your Stream</option>
      <option value="saab">saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select>

      </div>
      <button type="submit">Submit</button>
    </form>
  );
  }
};

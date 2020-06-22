import React, { Component } from "react";


export default class Tile extends Component{ 

render(){
    return(
    <div>
      <button class="column" id={this.props.thisTile} key={this.props.thisTile} onClick={this.props.handleRoomNameChange(this.props.thisTile)}>
        <div id='inner'>{this.props.thisTile} </div>
    </button>
    </div>
);

}
}
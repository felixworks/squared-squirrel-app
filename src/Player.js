import React from "react";
import squirrelImage from "./images/185673.svg";

function Player(props) {
  return (
    <img
      className="player-squirrel-image"
      src={squirrelImage}
      alt="Line drawing of squirrel"
    />
  );
}

export default Player;

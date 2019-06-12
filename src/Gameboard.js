import React from "react";
import GameTile from "./GameTile";

function Gameboard(props) {
  // generate gameboard
  let gameTileArray = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      gameTileArray.push(<GameTile xValue={x} yValue={y} />);
    }
  }
  return <section className="grid-container">{gameTileArray}</section>;
}

export default Gameboard;

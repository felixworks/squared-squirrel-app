import React from "react";

function GameTile(props) {
  // randomly select some tiles to have enemies
  let tileType = "grid-item";
  if (
    props.xValue === Math.floor(Math.random() * 10) &&
    props.yValue === Math.floor(Math.random() * 10)
  ) {
    tileType = "grid-item enemy-tile";
  }
  return (
    <div className={tileType}>
      Square <br /> x={props.xValue} y={props.yValue} <br />
      {props.children}
    </div>
  );
}

export default GameTile;

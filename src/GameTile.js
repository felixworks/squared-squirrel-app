import React from "react";

function GameTile(props) {
  let tileType = "grid-item ";
  if (props.hasEnemy) {
    tileType = tileType + "enemy-tile";
  }
  if (props.hasWinningTile) {
    tileType = tileType + "winning-tile";
  }

  return (
    <div className={tileType}>
      Square <br /> x={props.xValue} y={props.yValue} <br />
      {props.children}
    </div>
  );
}

export default GameTile;
